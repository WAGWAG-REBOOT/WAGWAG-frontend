"use client";

import Script from "next/script";
import { useRef } from "react";

export default function MapPage() {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const polygonRef = useRef<naver.maps.Polygon | null>(null);

  const initializeMap = () => {
    const map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.57565, 126.97688), // 예: 사직동 중심
      zoom: 15,
    });

    mapRef.current = map;

    fetch("/emd.geojson")
      .then((res) => res.json())
      .then((geojson) => {
        geojson.features.forEach((feature: any) => {
          const { type, coordinates } = feature.geometry;

          let paths: naver.maps.LatLng[][] = [];

          if (type === "Polygon") {
            paths.push(
              coordinates[0].map(([lng, lat]: number[]) => new naver.maps.LatLng(lat, lng)),
            );
          } else if (type === "MultiPolygon") {
            coordinates.forEach((polygon: number[][][]) => {
              paths.push(polygon[0].map(([lng, lat]: number[]) => new naver.maps.LatLng(lat, lng)));
            });
          } else {
            return;
          }

          const dummyPolygon = new naver.maps.Polygon({
            paths,
            map,
            strokeOpacity: 0,
            fillOpacity: 0,
            clickable: true,
            fillColor: "transparent",
          });

          // 클릭 시 실제 폴리곤 생성
          naver.maps.Event.addListener(dummyPolygon, "click", () => {
            // 기존 폴리곤이 있다면 제거
            if (polygonRef.current) {
              polygonRef.current.setMap(null);
            }

            const polygon = new naver.maps.Polygon({
              map,
              paths,
              strokeColor: "#57F98E",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#57F98E",
              fillOpacity: 0.4,
            });

            polygonRef.current = polygon;
          });
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
      <div
        id="map"
        style={{ width: "100%", height: "100vh" }}
      />
    </>
  );
}
