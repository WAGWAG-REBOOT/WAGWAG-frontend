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
}

export {};
