"use client";

import Script from "next/script";
import { useRef } from "react";

export default function MapPage() {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

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
          const { coordinates, type } = feature.geometry;

          const paths: naver.maps.LatLng[][] = [];

          if (type === "Polygon") {
            paths.push(
              coordinates[0].map(([lng, lat]: number[]) => new naver.maps.LatLng(lat, lng)),
            );
          } else if (type === "MultiPolygon") {
            coordinates.forEach((polygon: number[][][]) => {
              paths.push(polygon[0].map(([lng, lat]: number[]) => new naver.maps.LatLng(lat, lng)));
            });
          }

          new naver.maps.Polygon({
            map,
            paths,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.3,
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
        ref={mapContainerRef}
        id="map"
        style={{ width: "100%", height: "100vh" }}
      />
    </>
  );
}
