"use client";

import HeartFillSvg from "@/assets/images/HeartFill.svg";
import ShareSvg from "@/assets/images/Share.svg";
import { CategoryButton } from "@/components/atoms/Button/CategoryButton";
import { Footer } from "@/components/layout/Footer";
import Topbar from "@/components/layout/Topbar";
import { Shorts, Video } from "@/types/entities";
import { useEffect, useRef, useState } from "react";
import styles from "./main.module.scss";
import { ShortsCard } from "./ShortsCard";
import { VideoCarouselSection } from "./VideoCarouselSection";
// import { useRouter } from "next/navigation";
import { useModalStore } from "@/stores/modalStore";

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
  const { openModal } = useModalStore();
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [isTopbarVisible, setIsTopbarVisible] = useState(true);
  const categoryRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);
  const isAnimatingRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  // TODO: 추후 사용자의 실제 위치 정보로 대체
  const userLocation = "서대문구 대현동";

  const handleShareClick = (shortsId: number) => {
    const shareUrl = `${window.location.origin}/shorts/${shortsId}`;
    openModal({
      type: "share",
      title: "와글 공유하기",
      link: shareUrl,
    });
  };

  useEffect(() => {
    // 스크롤 스냅 관련 상수
    const CATEGORY_SNAP_TOP_OFFSET = 20; // 카테고리가 상단에서 떨어진 목표 거리 (2rem = 20px)
    const SCROLL_STOP_DELAY_MS = 100; // 스크롤 멈춤 감지 지연 시간 (ms)
    const SNAP_DETECTION_RANGE_TOP = -100; // 스냅 감지 범위 상단 (px)
    const SNAP_DETECTION_RANGE_BOTTOM = 200; // 스냅 감지 범위 하단 (px)
    const TOPBAR_HIDE_THRESHOLD = 150; // Topbar 숨김 기준 (px)

    // 애니메이션 duration 설정
    const MIN_ANIMATION_DURATION_MS = 400;
    const MAX_ANIMATION_DURATION_MS = 1000;
    const DISTANCE_FACTOR_MULTIPLIER = 3;
    const VELOCITY_FACTOR_MULTIPLIER = 50;

    const smoothSnapScroll = (targetY: number, currentY: number, velocity: number) => {
      // 이미 애니메이션 중이면 취소
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      isAnimatingRef.current = true;
      const distance = targetY - currentY;
      const startTime = performance.now();

      // 거리와 속도를 고려한 자연스러운 duration
      const distanceFactor = Math.abs(distance) * DISTANCE_FACTOR_MULTIPLIER;
      const velocityFactor = Math.abs(velocity) * VELOCITY_FACTOR_MULTIPLIER;
      const duration = Math.min(
        Math.max(MIN_ANIMATION_DURATION_MS, distanceFactor + velocityFactor),
        MAX_ANIMATION_DURATION_MS,
      );

      // 더 부드러운 감속 곡선
      const easeOutCubic = (t: number): number => {
        return 1 - Math.pow(1 - t, 3);
      };

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeOutCubic(progress);

        window.scrollTo(0, currentY + distance * easeProgress);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animateScroll);
        } else {
          isAnimatingRef.current = false;
          animationFrameRef.current = null;
        }
      };

      animationFrameRef.current = requestAnimationFrame(animateScroll);
    };

    const handleScroll = () => {
      if (categoryRef.current) {
        const currentScrollY = window.scrollY;
        const velocity = currentScrollY - lastScrollY.current;

        // Topbar 상태는 항상 업데이트 (애니메이션 중에도)
        const categoryTop = categoryRef.current.getBoundingClientRect().top;
        const shouldHide = categoryTop <= TOPBAR_HIDE_THRESHOLD;
        setIsTopbarVisible(!shouldHide);

        // 애니메이션 진행 중이면 나머지 로직 무시
        // (애니메이션이 발생시킨 스크롤이므로)
        if (isAnimatingRef.current) {
          lastScrollY.current = currentScrollY;
          return;
        }

        scrollVelocity.current = velocity;
        lastScrollY.current = currentScrollY;

        // 스크롤 중임을 표시
        isScrollingRef.current = true;

        // 이전 타임아웃 취소
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // 스크롤이 멈춘 후 실행될 타임아웃 설정
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;

          // 스냅 포인트 계산
          const currentCategoryTop = categoryRef.current?.getBoundingClientRect().top || 0;
          const currentScrollPosition = window.scrollY;

          // 카테고리가 화면 내에 있을 때 스냅 적용 (위아래 모두)
          if (
            currentCategoryTop >= SNAP_DETECTION_RANGE_TOP &&
            currentCategoryTop < SNAP_DETECTION_RANGE_BOTTOM
          ) {
            const targetScroll =
              currentScrollPosition + (currentCategoryTop - CATEGORY_SNAP_TOP_OFFSET);

            // 현재 위치에서 목표 지점까지 속도를 감속시키면서 부드럽게 이동
            smoothSnapScroll(targetScroll, currentScrollPosition, scrollVelocity.current);
          }
        }, SCROLL_STOP_DELAY_MS);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // ===== 임시 더미 데이터 (API 연동 시 삭제 예정) =====
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
      thumbnailUrl:
        "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
      title: "뒷산 동굴안엔 무엇이 살까",
      nickname: "Lovelee",
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
  // ===== 더미 데이터 끝 =====

  const filteredShorts =
    selectedCategory === "전체"
      ? shortsData
      : shortsData.filter((shorts) => shorts.category === selectedCategory);

  return (
    <div className={styles.pageContainer}>
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
        <div className={styles.carouselContainer}>
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
        </div>

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
                <div
                  className={styles.actionItem}
                  onClick={() => handleShareClick(filteredShorts[0].id)}
                  style={{ cursor: "pointer" }}
                >
                  <ShareSvg className={`${styles.actionIcon} ${styles.shareIcon}`} />
                  <span className={styles.actionText}>37</span>
                </div>
              </div>
            </>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}
