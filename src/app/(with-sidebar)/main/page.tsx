"use client";

import { useState, useRef, useEffect } from "react";
import Topbar from "@/components/layout/Topbar";
import { CategoryButton } from "@/components/atoms/Button/CategoryButton";
import { VideoCarouselSection } from "./VideoCarouselSection";
import { ShortsCard } from "./ShortsCard";
import { Footer } from "@/components/layout/Footer";
import { Video, Shorts } from "@/types/entities";
import HeartFillSvg from "@/assets/images/HeartFill.svg";
import ShareSvg from "@/assets/images/Share.svg";
import styles from "./main.module.scss";
// import { useRouter } from "next/navigation";

const categories = [
  "전체",
  "운동",
  "뷰티",
  "일상생활",
  "게임",
  "음식",
  "산책",
  "노래",
  "타 지역 인기 와글",
];

export default function Page() {
  // const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [isTopbarVisible, setIsTopbarVisible] = useState(true);
  const categoryRef = useRef<HTMLDivElement>(null);

  // TODO: 추후 사용자의 실제 위치 정보로 대체
  const userLocation = "서대문구 대현동";

  useEffect(() => {
    const handleScroll = () => {
      if (categoryRef.current) {
        const categoryTop = categoryRef.current.getBoundingClientRect().top;
        const shouldHide = categoryTop <= 150;
        setIsTopbarVisible(!shouldHide);
        console.log("categoryTop:", categoryTop, "shouldHide:", shouldHide); // 디버깅
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // TODO: 추후 API에서 받아올 데이터
  const popularVideoCards: Video[] = [
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

  const realtimeVideoCards: Video[] = [
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

  // TODO: 추후 API에서 받아올 카테고리별 숏츠 데이터
  const shortsData: Shorts[] = [
    {
      id: 1,
      thumbnailUrl: "/nature.jpg",
      title: "아침 러닝 코스 추천",
      nickname: "러너",
      views: 1500,
      category: "운동",
    },
    {
      id: 2,
      thumbnailUrl: "/nature.jpg",
      title: "홈트레이닝 루틴",
      nickname: "헬스킹",
      views: 2300,
      category: "운동",
    },
    {
      id: 3,
      thumbnailUrl: "/nature.jpg",
      title: "메이크업 팁 공유",
      nickname: "뷰티퀸",
      views: 3400,
      category: "뷰티",
    },
    {
      id: 4,
      thumbnailUrl: "/nature.jpg",
      title: "오늘의 일상 브이로그",
      nickname: "일상이",
      views: 1800,
      category: "일상생활",
    },
    {
      id: 5,
      thumbnailUrl: "/nature.jpg",
      title: "롤 하이라이트 모음",
      nickname: "게이머",
      views: 4500,
      category: "게임",
    },
    {
      id: 6,
      thumbnailUrl: "/nature.jpg",
      title: "맛집 먹방 투어",
      nickname: "먹부림",
      views: 5600,
      category: "음식",
    },
    {
      id: 7,
      thumbnailUrl: "/nature.jpg",
      title: "강아지 산책 일상",
      nickname: "멍멍집사",
      views: 2700,
      category: "산책",
    },
    {
      id: 8,
      thumbnailUrl: "/nature.jpg",
      title: "버스킹 현장",
      nickname: "싱어송라이터",
      views: 3900,
      category: "노래",
    },
    {
      id: 9,
      thumbnailUrl: "/nature.jpg",
      title: "강남 핫플레이스 탐방",
      nickname: "서울러",
      views: 6200,
      category: "타 지역 인기 와글",
    },
    {
      id: 10,
      thumbnailUrl: "/nature.jpg",
      title: "부산 해운대 일상",
      nickname: "부산댁",
      views: 5800,
      category: "타 지역 인기 와글",
    },
  ];

  const filteredShorts =
    selectedCategory === "전체"
      ? shortsData
      : shortsData.filter((shorts) => shorts.category === selectedCategory);

  return (
    <>
      <div className={`${styles.topbarWrapper} ${!isTopbarVisible ? styles.hidden : ""}`}>
        <Topbar
          location="서대문구 대현동"
          data={{
            videoCount: 43,
            rank: 2,
            hotKeyword: "버스킹",
            topPosts: [
              "이대 앞 휘낭시에 여기가 대박임",
              "오늘자 홍제천 벚꽃길 분위기",
              "요즘 유기견이 많이 보인다ㅠㅠ",
              "이대입구 신상 빵집 오픈함",
              "치킨 먹고 산책 루트 공유한다",
            ],
          }}
        />
      </div>
      <div className={styles.mainContainer}>
        <VideoCarouselSection
          title="인기 와글"
          videoCards={popularVideoCards}
          locationText={userLocation}
        />

        <VideoCarouselSection
          title="실시간 와글"
          videoCards={realtimeVideoCards}
          locationText={userLocation}
        />

        <div
          className={styles.categoryContainer}
          ref={categoryRef}
        >
          {categories.map((category) => (
            <CategoryButton
              key={category}
              isSelected={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </CategoryButton>
          ))}
        </div>

        <div className={styles.shortsSection}>
          {filteredShorts.length > 0 && (
            <>
              <ShortsCard
                key={filteredShorts[0].id}
                thumbnailUrl={filteredShorts[0].thumbnailUrl}
                title={filteredShorts[0].title}
                nickname={filteredShorts[0].nickname}
                views={filteredShorts[0].views}
              />
              <div className={styles.shortsActions}>
                <div className={styles.actionItem}>
                  <HeartFillSvg className={styles.actionIcon} />
                  <span className={styles.actionText}>1.8K</span>
                </div>
                <div className={styles.actionItem}>
                  <ShareSvg className={`${styles.actionIcon} ${styles.shareIcon}`} />
                  <span className={styles.actionText}>37</span>
                </div>
              </div>
            </>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}
