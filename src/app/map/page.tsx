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

export default function MapPage() {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const polygonRef = useRef<naver.maps.Polygon | null>(null);
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const markerClusterRef = useRef<InstanceType<typeof naver.maps.MarkerClustering> | null>(null);
  const polygonDataRef = useRef<PolygonData[]>([]);

  const [selectedAddr, setSelectedAddr] = useState<{ region: string; dongName: string } | null>(
    null,
  );
  const [mode, setMode] = useState<"popular" | "all">("popular");
  const modeRef = useRef(mode);

  const markerHTMLCache = useRef<Map<string, string>>(new Map());
  const createdPolygonsRef = useRef<naver.maps.Polygon[]>([]);
  const zoomTimerRef = useRef<number | null>(null);

  const POLYGON_ACTIVE_ZOOM = 15;

  useEffect(() => {
    if (polygonRef.current) {
      const paths = polygonRef.current.getPaths();
      const color = mode === "popular" ? "#57F98E" : "#C7C7C7";
      polygonRef.current.setMap(null);
      const updated = new naver.maps.Polygon({
        map: mapRef.current!,
        paths,
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.4,
        clickable: false,
      });
      polygonRef.current = updated;
    }
    modeRef.current = mode;
  }, [mode]);

  const initializeMap = () => {
    const map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.57565, 126.97688),
      zoom: 15,
    });
    mapRef.current = map;

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
          } else if (type === "MultiPolygon") {
            coordinates.forEach((polygon) => {
              paths.push(polygon[0].map(([lng, lat]) => new naver.maps.LatLng(lat, lng)));
            });
          } else return;

          // 중심점 계산
          const centroid = (() => {
            const ring = paths[0];
            const lat = ring.reduce((s, p) => s + p.lat(), 0) / ring.length;
            const lng = ring.reduce((s, p) => s + p.lng(), 0) / ring.length;
            return new naver.maps.LatLng(lat, lng);
          })();

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

          const marker = new naver.maps.Marker({
            position: centroid,
            map,
            icon: {
              content: html,
              anchor: new naver.maps.Point(25, 25),
            },
            clickable: true,
          });

          // 마커 클릭 시 패널 표시
          naver.maps.Event.addListener(marker, "click", () => {
            setSelectedAddr({ region, dongName });
            highlightPolygon(paths);
          });

          markers.push(marker);
          polygonDataRef.current.push({ region, dongName, paths });
        });

        markersRef.current = markers;

        // 마커 클러스터러
        markerClusterRef.current = new naver.maps.MarkerClustering({
          minClusterSize: 3,
          maxZoom: 14,
          map,
          markers,
          disableClickZoom: true,
          gridSize: 120,
        });

        // 초기 줌 레벨에 따른 폴리곤 상태 설정
        handleZoomChange(map.getZoom());

        naver.maps.Event.addListener(map, "zoom_changed", () => {
          if (zoomTimerRef.current) clearTimeout(zoomTimerRef.current);
          zoomTimerRef.current = window.setTimeout(() => {
            handleZoomChange(map.getZoom());
          }, 120);
        });
      });
  };

  const highlightPolygon = (paths: naver.maps.LatLng[][]) => {
    if (polygonRef.current) polygonRef.current.setMap(null);
    const color = modeRef.current === "popular" ? "#57F98E" : "#C7C7C7";
    const poly = new naver.maps.Polygon({
      map: mapRef.current!,
      paths,
      strokeColor: color,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: color,
      fillOpacity: 0.4,
      clickable: false,
    });
    polygonRef.current = poly;
  };

  // 줌 변화에 따라 폴리곤 클릭 활성화/비활성화
  const handleZoomChange = (zoom: number) => {
    const map = mapRef.current!;
    if (!map) return;

    // 줌이 높을 때만 클릭 가능한 폴리곤 표시
    if (zoom >= POLYGON_ACTIVE_ZOOM) {
      if (createdPolygonsRef.current.length === 0) {
        const polys = polygonDataRef.current.map((p) => {
          const poly = new naver.maps.Polygon({
            map,
            paths: p.paths,
            strokeOpacity: 0,
            fillOpacity: 0,
            clickable: true,
          });

          naver.maps.Event.addListener(poly, "click", () => {
            highlightPolygon(p.paths);
            setSelectedAddr({ region: p.region, dongName: p.dongName });
          });

          return poly;
        });
        createdPolygonsRef.current = polys;
      }
    } else {
      createdPolygonsRef.current.forEach((p) => p.setMap(null));
      createdPolygonsRef.current = [];
      if (polygonRef.current) {
        polygonRef.current.setMap(null);
        polygonRef.current = null;
      }
    }
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&submodules=geocoder,markerclustering`}
        onReady={initializeMap}
      />
      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
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
