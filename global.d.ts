/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  namespace naver.maps {
    interface MarkerClusteringOptions {
      map: naver.maps.Map;
      markers?: naver.maps.Marker[];
      disableClickZoom?: boolean;
      gridSize?: number;
      minClusterSize?: number;
      maxZoom?: number;
      icons?: any[];
      indexGenerator?: any;
      stylingFunction?: (clusterMarker: naver.maps.Marker, count: number) => void;
    }

    class MarkerClustering {
      constructor(options: MarkerClusteringOptions);
      addMarkers(markers: naver.maps.Marker[]): void;
      clear(): void;
      getMarkers(): naver.maps.Marker[];
      redraw(): void;
    }
  }
  interface Window {
    MarkerClustering: new (options: {
      map: naver.maps.Map;
      markers: naver.maps.Marker[];
      minClusterSize?: number;
      maxZoom?: number;
      gridSize?: number;
      icons?: naver.maps.MarkerOptions["icon"][];
      stylingFunction?: (clusterMarker: naver.maps.Marker, count: number) => void;
    }) => unknown;
  }
}

export {};
