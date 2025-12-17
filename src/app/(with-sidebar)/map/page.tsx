"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";

import { PositionButton } from "@/components/atoms";
import MapHeader from "@/components/molecules/MapHeader";
import UploadStatus from "@/components/organisms/UploadStatus";

import type { FeatureCollection, Polygon as GeoPolygon, MultiPolygon } from "geojson";

type PolygonData = {
  region: string;
  dongName: string;
  paths: naver.maps.LatLng[][];
};

export default function Page() {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const polygonRef = useRef<naver.maps.Polygon | null>(null);
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const createdPolygonsRef = useRef<naver.maps.Polygon[]>([]);
  const polygonDataRef = useRef<PolygonData[]>([]);
  const zoomTimerRef = useRef<number | null>(null);
  const markerHTMLCache = useRef<Map<string, string>>(new Map());

  const [selectedAddr, setSelectedAddr] = useState<{
    region: string;
    dongName: string;
  } | null>(null);

  const [mode, setMode] = useState<"popular" | "all">("popular");
  const modeRef = useRef(mode);

  const CLUSTER_MAX_ZOOM = 14;
  const POLYGON_ACTIVE_ZOOM = 15;

  /** mode 변경 시 polygon 색상 갱신 */
  useEffect(() => {
    modeRef.current = mode;

    if (!polygonRef.current) return;

    const paths = polygonRef.current.getPaths();
    polygonRef.current.setMap(null);

    const color = mode === "popular" ? "#57F98E" : "#C7C7C7";

    polygonRef.current = new naver.maps.Polygon({
      map: mapRef.current!,
      paths,
      strokeColor: color,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: color,
      fillOpacity: 0.4,
      clickable: false,
    });
  }, [mode]);

  const highlightPolygon = (paths: naver.maps.LatLng[][]) => {
    if (polygonRef.current) polygonRef.current.setMap(null);

    const color = modeRef.current === "popular" ? "#57F98E" : "#C7C7C7";

    polygonRef.current = new naver.maps.Polygon({
      map: mapRef.current!,
      paths,
      strokeColor: color,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: color,
      fillOpacity: 0.4,
      clickable: false,
    });
  };

  /** zoom 단계에 폴리곤 제어 */
  const handleZoomChange = (zoom: number) => {
    const map = mapRef.current;
    if (!map) return;

    createdPolygonsRef.current.forEach((poly) => {
      poly.setMap(zoom >= POLYGON_ACTIVE_ZOOM ? map : null);
    });
  };

  const initializeMap = () => {
    const map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.5665, 126.978),
      zoom: 15,
      // minZoom: 14,
      // maxZoom: 17,
      maxBounds: new naver.maps.LatLngBounds(
        new naver.maps.LatLng(37.413294, 126.734086),
        new naver.maps.LatLng(37.715133, 127.269311),
      ),
    });

    mapRef.current = map;

    /** 지도 클릭 시 선택 해제 */
    naver.maps.Event.addListener(map, "click", () => {
      setSelectedAddr(null);
      if (polygonRef.current) {
        polygonRef.current.setMap(null);
        polygonRef.current = null;
      }
    });

    fetch("/emd.geojson")
      .then((res) => res.json())
      .then((geojson: FeatureCollection<GeoPolygon | MultiPolygon>) => {
        const markers: naver.maps.Marker[] = [];

        geojson.features.forEach((feature) => {
          const { type, coordinates } = feature.geometry;
          const { adm_nm } = feature.properties as { adm_nm: string };

          const parts = adm_nm.split(" ");
          const region = parts[1] ?? "";
          const dongName = parts[2] ?? "";

          const paths: naver.maps.LatLng[][] = [];

          if (type === "Polygon") {
            paths.push(coordinates[0].map(([lng, lat]) => new naver.maps.LatLng(lat, lng)));
          } else {
            coordinates.forEach((polygon) => {
              paths.push(polygon[0].map(([lng, lat]) => new naver.maps.LatLng(lat, lng)));
            });
          }

          polygonDataRef.current.push({ region, dongName, paths });

          /** centroid 계산 */
          const ring = paths[0];
          const centroid = new naver.maps.LatLng(
            ring.reduce((s, p) => s + p.lat(), 0) / ring.length,
            ring.reduce((s, p) => s + p.lng(), 0) / ring.length,
          );

          /** HTML 캐싱 */
          let html = markerHTMLCache.current.get(dongName);
          if (!html) {
            html = ReactDOMServer.renderToString(
              <PositionButton
                count={0}
                label={dongName}
              />,
            );
            markerHTMLCache.current.set(dongName, html);
          }

          /** map 없이 marker 생성 */
          const marker = new naver.maps.Marker({
            position: centroid,
            icon: {
              content: html,
              anchor: new naver.maps.Point(25, 25),
            },
            clickable: true,
          });

          naver.maps.Event.addListener(marker, "click", () => {
            highlightPolygon(paths);
            setSelectedAddr({ region, dongName });
          });

          markers.push(marker);
        });

        markersRef.current = markers;

        /** Marker Clustering 생성 */
        const clusterIcons = [
          {
            content: `
              <div class="cluster-marker"></div>
            `,
            size: new naver.maps.Size(40, 40),
            anchor: new naver.maps.Point(20, 20),
          },
        ];

        new window.MarkerClustering({
          map,
          markers,
          minClusterSize: 3, // 2개 이상일 때 클러스터 생성
          maxZoom: CLUSTER_MAX_ZOOM,
          gridSize: 120,
          icons: clusterIcons,

          // 숫자 표시
          stylingFunction: (clusterMarker: naver.maps.Marker, count: number) => {
            const el = clusterMarker.getElement();
            if (!el) return;

            const size = count < 10 ? 64 : count < 50 ? 72 : 80;

            const fontSize = count < 10 ? 14 : count < 50 ? 15 : 16;

            el.innerHTML = `
              <div style="
                width:${size}px;
                height:${size}px;
                border-radius:50%;
                background:#57F98E;
                display:flex;
                align-items:center;
                justify-content:center;
                font-weight:600;
                font-size:${fontSize}px;
                color:#000;
              ">
                ${count}
              </div>
            `;
          },
        });

        handleZoomChange(map.getZoom());

        /** zoom 이벤트 (polygon 전용) */
        naver.maps.Event.addListener(map, "zoom_changed", () => {
          if (zoomTimerRef.current) clearTimeout(zoomTimerRef.current);
          zoomTimerRef.current = window.setTimeout(() => {
            handleZoomChange(map.getZoom());
          }, 250);
        });
      });
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
        onReady={initializeMap}
      />
      <Script
        strategy="afterInteractive"
        src="/markerClustering.js"
      />

      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <div
          id="map"
          style={{ width: "100%", height: "100%" }}
        />
        <MapHeader
          mode={mode}
          setMode={setMode}
        />
        {selectedAddr && <UploadStatus selectedAddr={selectedAddr} />}
      </div>
    </>
  );
}
