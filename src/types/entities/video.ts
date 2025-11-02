/**
 * Video 엔티티 타입 - 일반 가로형 비디오
 */
export type Video = {
  id: number;
  thumbnailUrl: string;
  nickname: string;
  views: number;
  likes: number;
  title: string;
  createdAt?: string;
  category?: string;
};

/**
 * Shorts 엔티티 타입 - 세로형 숏츠 비디오
 */
export type Shorts = {
  id: number;
  thumbnailUrl: string;
  title: string;
  nickname: string;
  views: number;
  category: string;
  createdAt?: string;
};
