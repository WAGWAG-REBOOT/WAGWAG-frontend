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
  const polygonDataRef = useRef<PolygonData[]>([]);
  const createdPolygonsRef = useRef<naver.maps.Polygon[]>([]);
  const zoomTimerRef = useRef<number | null>(null);
  const markerHTMLCache = useRef<Map<string, string>>(new Map());

  const [selectedAddr, setSelectedAddr] = useState<{ region: string; dongName: string } | null>(
    null,
  );
  const [mode, setMode] = useState<"popular" | "all">("popular");
  const modeRef = useRef(mode);

  const POLYGON_ACTIVE_ZOOM = 15;

  useEffect(() => {
    if (polygonRef.current) {
      const paths = polygonRef.current.getPaths();
      const color = mode === "popular" ? "#57F98E" : "#C7C7C7";
      polygonRef.current.setMap(null);
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
    }
    modeRef.current = mode;
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

  const handleZoomChange = (zoom: number) => {
    const map = mapRef.current!;
    if (!map) return;

    // 마커 표시/숨김
    markersRef.current.forEach((marker) => {
      marker.setMap(zoom >= 14 ? map : null);
    });

    // 폴리곤 표시/숨김
    createdPolygonsRef.current.forEach((poly) => {
      poly.setMap(zoom >= POLYGON_ACTIVE_ZOOM ? map : null);
    });
  };

  const initializeMap = () => {
    const map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.5665, 126.978),
      zoom: 15,
      minZoom: 14,
      maxZoom: 17,
      maxBounds: new window.naver.maps.LatLngBounds( // 범위를 서울로 제한
        new window.naver.maps.LatLng(37.413294, 126.734086),
        new window.naver.maps.LatLng(37.715133, 127.269311),
      ),
    });
    mapRef.current = map;

    // 지도 클릭 시 highlight 제거
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
          }

          polygonDataRef.current.push({ region, dongName, paths });

          // 중심점 계산
          const centroid = (() => {
            const ring = paths[0];
            const lat = ring.reduce((s, p) => s + p.lat(), 0) / ring.length;
            const lng = ring.reduce((s, p) => s + p.lng(), 0) / ring.length;
            return new naver.maps.LatLng(lat, lng);
          })();

          // HTML 캐시
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

          naver.maps.Event.addListener(marker, "click", () => {
            highlightPolygon(paths);
            setSelectedAddr({ region, dongName });
          });

          markers.push(marker);
        });

        markersRef.current = markers;

        handleZoomChange(map.getZoom());

        // 디바운스 250ms
        window.naver.maps.Event.addListener(map, "zoom_changed", () => {
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
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&submodules=geocoder`}
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
