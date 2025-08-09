"use client";

import Script from "next/script";
import { useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";

import { PositionButton } from "@/components/atoms";
import { UploadStatus } from "@/components/molecules";

import type { Feature, FeatureCollection, Polygon as GeoPolygon, MultiPolygon } from "geojson";

export default function MapPage() {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const polygonRef = useRef<naver.maps.Polygon | null>(null);
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const [selectedAddr, setSelectedAddr] = useState<{ region: string; dongName: string } | null>(
    null,
  );

  const initializeMap = () => {
    const map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.57565, 126.97688), // 예: 사직동 중심
      zoom: 15,
    });

    mapRef.current = map;

    fetch("/emd.geojson")
      .then((res) => res.json())
      .then((geojson: FeatureCollection<GeoPolygon | MultiPolygon>) => {
        geojson.features.forEach((feature: Feature<GeoPolygon | MultiPolygon>) => {
          const { type, coordinates } = feature.geometry;
          const { adm_nm } = feature.properties as { adm_nm: string };

          const parts = adm_nm.split(" ");
          const region = parts[1] ?? "";
          const dongName = parts[2] ?? "";

          const paths: naver.maps.LatLng[][] = [];

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

          // 중심 좌표 계산
          const center = dummyPolygon.getBounds().getCenter();

          const buttonHTML = ReactDOMServer.renderToString(
            <PositionButton
              count={0}
              label={dongName}
            />,
          );

          // 마커 생성 (HTML 콘텐츠 사용)
          const marker = new naver.maps.Marker({
            position: center,
            map,
            icon: {
              content: buttonHTML,
              anchor: new naver.maps.Point(25, 25),
            },
            clickable: true,
          });

          markersRef.current.push(marker);

          // 마커 클릭 시 해당 지역 차트 패널 보여주기
          naver.maps.Event.addListener(marker, "click", () => {
            setSelectedAddr({ region, dongName });
          });

          // hover 시 폴리곤 표시
          naver.maps.Event.addListener(dummyPolygon, "mouseover", () => {
            if (polygonRef.current) {
              polygonRef.current.setMap(null);
            }

            const hoverPolygon = new naver.maps.Polygon({
              map,
              paths,
              strokeColor: "#57F98E",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#57F98E",
              fillOpacity: 0.4,
              clickable: false,
            });

            polygonRef.current = hoverPolygon;
          });

          // 마커가 아닌 지도 클릭 시 패널 삭제
          naver.maps.Event.addListener(map, "click", () => {
            setSelectedAddr(null);
          });
        });

        // 줌 단계 변경 시 마커 표시/숨김
        naver.maps.Event.addListener(map, "zoom_changed", () => {
          const zoom = map.getZoom();
          markersRef.current.forEach((marker) => {
            if (zoom >= 15) {
              marker.setMap(map);
            } else {
              marker.setMap(null);
            }
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
      <div style={{ display: "flex", width: "100%", height: "100vh" }}>
        <div
          id="map"
          style={{ flex: 1 }}
        />
        {selectedAddr && (
          <UploadStatus
            region={selectedAddr.region}
            rank={2}
            dongName={selectedAddr.dongName}
          />
        )}
      </div>
    </>
  );
}
