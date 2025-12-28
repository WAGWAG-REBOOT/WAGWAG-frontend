"use client";

import { MypageInfoArea } from "@/components/organisms/mypage";

import { Footer } from "@/components/layout/Footer";
import { Video } from "@/types/entities";
import { useRouter } from "next/navigation";
import { VideoCarouselSection } from "../main/VideoCarouselSection";
import styles from "./mypage.module.scss";

const userProfile = {
  userName: "심승보",
  email: "seungbo@wagwag.com",
  location: "서울",
  joinDate: "2025-01-01",
} as const;

const userStat = {
  contribution: 30,
  uploads: 10,
  likes: 10000,
  views: 1000000,
} as const;

// TODO: 추후 API에서 받아올 데이터
const uploadedVideoCards: Video[] = [
  {
    id: 1,
    thumbnailUrl: "/nature.jpg",
    nickname: "왁왁이",
    views: 1234,
    likes: 56,
    title: "뒷산 풍경사진 스팟 공유합니다",
  },
  {
    id: 2,
    thumbnailUrl: "/nature.jpg",
    nickname: "멍멍이",
    views: 2345,
    likes: 78,
    title: "공원 산책 코스 추천",
  },
  {
    id: 3,
    thumbnailUrl: "/nature.jpg",
    nickname: "냥냥이",
    views: 3456,
    likes: 90,
    title: "카페 테라스 애견 동반 가능",
  },
  {
    id: 4,
    thumbnailUrl: "/nature.jpg",
    nickname: "왈왈이",
    views: 4567,
    likes: 123,
    title: "주말 나들이 명소",
  },
  {
    id: 5,
    thumbnailUrl: "/nature.jpg",
    nickname: "댕댕이",
    views: 5678,
    likes: 145,
    title: "숨은 맛집 발견했어요",
  },
  {
    id: 6,
    thumbnailUrl: "/nature.jpg",
    nickname: "뭉뭉이",
    views: 6789,
    likes: 167,
    title: "야경 명소 공유합니다",
  },
  {
    id: 7,
    thumbnailUrl: "/nature.jpg",
    nickname: "콩콩이",
    views: 7890,
    likes: 189,
    title: "주차 가능한 카페 추천",
  },
  {
    id: 8,
    thumbnailUrl: "/nature.jpg",
    nickname: "토토이",
    views: 8901,
    likes: 201,
    title: "반려견 동반 가능한 레스토랑",
  },
  {
    id: 9,
    thumbnailUrl: "/nature.jpg",
    nickname: "구름이",
    views: 9012,
    likes: 223,
    title: "이번 주말 꽃구경 명소",
  },
];

const likedVideoCards: Video[] = [
  {
    id: 10,
    thumbnailUrl: "/nature.jpg",
    nickname: "별이",
    views: 987,
    likes: 45,
    title: "지금 막 찍은 카페 신메뉴",
  },
  {
    id: 11,
    thumbnailUrl: "/nature.jpg",
    nickname: "하늘이",
    views: 876,
    likes: 67,
    title: "오늘 날씨 완전 좋음",
  },
  {
    id: 12,
    thumbnailUrl: "/nature.jpg",
    nickname: "바다이",
    views: 765,
    likes: 89,
    title: "방금 본 강아지 너무 귀여워",
  },
  {
    id: 13,
    thumbnailUrl: "/nature.jpg",
    nickname: "달이",
    views: 654,
    likes: 101,
    title: "저녁 노을 실시간",
  },
  {
    id: 14,
    thumbnailUrl: "/nature.jpg",
    nickname: "해이",
    views: 543,
    likes: 123,
    title: "지금 막 오픈한 빵집",
  },
  {
    id: 15,
    thumbnailUrl: "/nature.jpg",
    nickname: "구름",
    views: 432,
    likes: 145,
    title: "실시간 버스킹 공연 중",
  },
  {
    id: 16,
    thumbnailUrl: "/nature.jpg",
    nickname: "빛나",
    views: 321,
    likes: 167,
    title: "오늘 점심 메뉴 추천",
  },
  {
    id: 17,
    thumbnailUrl: "/nature.jpg",
    nickname: "반짝",
    views: 210,
    likes: 189,
    title: "주차 가능한 식당 찾음",
  },
  {
    id: 18,
    thumbnailUrl: "/nature.jpg",
    nickname: "초롱",
    views: 109,
    likes: 201,
    title: "실시간 교통 상황 공유",
  },
];

export default function Page() {
  const router = useRouter();
  const handleUploadedVideoAllClick = () => {
    router.push("/mypage/upload");
  };

  const handleLikedVideoAllClick = () => {
    router.push("/mypage/like");
  };

  return (
    <div className={styles.mypageContainer}>
      <div className={styles.userInfoContainer}>
        <MypageInfoArea
          userProfile={userProfile}
          userStat={userStat}
        />
      </div>

      <div className={styles.carouselContainer}>
        <VideoCarouselSection
          title="업로드한 와글"
          videoCards={uploadedVideoCards}
          variant="myPage"
          onViewAllClick={handleUploadedVideoAllClick}
        />

        <VideoCarouselSection
          title="좋아요한 와글"
          videoCards={likedVideoCards}
          variant="myPage"
          onViewAllClick={handleLikedVideoAllClick}
        />
      </div>

      <Footer />
    </div>
  );
}
