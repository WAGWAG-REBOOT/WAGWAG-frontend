"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

import ArrowButton from "@/components/atoms/Button/ArrowButton";
import { CategoryButton } from "@/components/atoms/Button/CategoryButton";
import SearchInput from "@/components/atoms/Input/SearchInput";
import Dropdown, { DropdownOption } from "@/components/atoms/Dropdown";
import { formatTimeAgo } from "@/utils/helpers";

import styles from "./page.module.scss";

interface VideoData {
  id: string;
  title: string;
  description: string;
  views: number;
  likes: number;
  isPrivate: boolean;
  thumbnail: string;
  uploadDate: Date;
}

type SortType = "latest" | "popular" | "oldest";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [koreanWords, setKoreanWords] = useState<string[]>([]);
  const [sortType, setSortType] = useState<SortType>("latest");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // 한국어 단어 데이터 로드
  useEffect(() => {
    const loadKoreanWords = async () => {
      try {
        const response = await fetch("/data/korean-words.json");
        const data = await response.json();

        const allWords: string[] = [];
        // TODO: any 타입 대신 적절한 타입 사용
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.values(data).forEach((category: any) => {
          if (category.words && Array.isArray(category.words)) {
            allWords.push(...category.words);
          }
        });

        setKoreanWords(allWords);
      } catch (error) {
        console.error("한국어 단어 데이터를 불러오는데 실패했습니다:", error);
      }
    };

    loadKoreanWords();
  }, []);

  // 메뉴 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 임시 데이터 - 실제로는 API에서 가져올 데이터
  const [videos, setVideos] = useState<VideoData[]>([
    {
      id: "1",
      title: "오늘 제가 올린 영상 안 보시면 후회합니다",
      description:
        "회사에 가서는 달라 근데 그건 까라면 까야지 아 그렇구나 내 기준에서 진짜 아닌 것 같다 그러면 말을 하지 근데 나는 아닌것같다고 하면 그렇구나 하고 말아",
      views: 120000,
      likes: 127,
      isPrivate: false,
      thumbnail: "/nature.jpg",
      uploadDate: new Date(2025, 10, 27, 14, 30),
    },
    {
      id: "2",
      title: "대현동 맛집 바로 여기입니당",
      description:
        "대현동 맛집 지금 잘 하고 있는지 참내 금요일에 그것도 듣고 면접 하고 하면 되겠지 뭐",
      views: 30000,
      likes: 18,
      isPrivate: true,
      thumbnail: "/nature.jpg",
      uploadDate: new Date(2025, 10, 26, 10, 15),
    },
    {
      id: "3",
      title: "일주일 전 영상 테스트",
      description: "테스트용 영상입니다",
      views: 5000,
      likes: 45,
      isPrivate: false,
      thumbnail: "/nature.jpg",
      uploadDate: new Date(2025, 10, 20, 18, 0),
    },
    {
      id: "4",
      title: "2024년 영상 필터 테스트",
      description: "작년 영상",
      views: 85000,
      likes: 92,
      isPrivate: false,
      thumbnail: "/nature.jpg",
      uploadDate: new Date(2024, 5, 15, 12, 0),
    },
    {
      id: "5",
      title: "인기 영상 조회수 테스트",
      description: "인기순 정렬 테스트",
      views: 500000,
      likes: 320,
      isPrivate: false,
      thumbnail: "/nature.jpg",
      uploadDate: new Date(2024, 11, 1, 9, 0),
    },
    {
      id: "6",
      title: "2023년도 영상",
      description: "오래된 영상",
      views: 12000,
      likes: 78,
      isPrivate: true,
      thumbnail: "/nature.jpg",
      uploadDate: new Date(2023, 2, 10, 15, 30),
    },
  ]);

  // 추천어 클릭 처리
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
  };

  const handleBack = () => {
    window.history.back();
  };

  const handlePrivacyToggle = (videoId: string) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === videoId ? { ...video, isPrivate: !video.isPrivate } : video,
      ),
    );
  };

  const handleMenuToggle = (videoId: string) => {
    setOpenMenuId(openMenuId === videoId ? null : videoId);
  };

  const handleEdit = (videoId: string) => {
    console.log("Edit video:", videoId);
    setOpenMenuId(null);
  };

  const handleDelete = (videoId: string) => {
    console.log("Delete video:", videoId);
    setOpenMenuId(null);
  };

  // 연도 옵션 생성
  const USER_JOIN_YEAR = 2023;
  const currentYear = new Date().getFullYear();
  const yearOptions: DropdownOption<number>[] = [];
  for (let year = currentYear; year >= USER_JOIN_YEAR; year--) {
    yearOptions.push({ value: year, label: `${year}년` });
  }

  // 필터링 및 정렬
  const filteredAndSortedVideos = (() => {
    // 1. 검색 필터
    let result = videos.filter((video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    // 2. 연도 필터
    if (selectedYear) {
      result = result.filter((video) => video.uploadDate.getFullYear() === selectedYear);
    }

    // 3. 정렬
    result = [...result].sort((a, b) => {
      switch (sortType) {
        case "latest":
          return b.uploadDate.getTime() - a.uploadDate.getTime();
        case "oldest":
          return a.uploadDate.getTime() - b.uploadDate.getTime();
        case "popular":
          return b.views - a.views;
        default:
          return 0;
      }
    });

    return result;
  })();

  const formatCount = (count: number) => {
    if (count >= 10000) {
      return `${Math.floor(count / 10000)}만`;
    }
    return `${count.toLocaleString()}`;
  };

  return (
    <div className={styles.pageContent}>
      {/* 헤더 */}
      <div className={styles.header}>
        <ArrowButton
          direction="left"
          onClick={handleBack}
        ></ArrowButton>
        <h1 className={styles.pageTitle}>내가 업로드한 영상</h1>
      </div>

      {/* 정렬 & 필터 바 */}
      <div className={styles.sortFilterBar}>
        <div className={styles.sortButtons}>
          <CategoryButton
            isSelected={sortType === "latest"}
            onClick={() => setSortType("latest")}
          >
            최신순
          </CategoryButton>
          <CategoryButton
            isSelected={sortType === "popular"}
            onClick={() => setSortType("popular")}
          >
            인기순
          </CategoryButton>
          <CategoryButton
            isSelected={sortType === "oldest"}
            onClick={() => setSortType("oldest")}
          >
            오래된 순
          </CategoryButton>
        </div>

        <div className={styles.filterControls}>
          <SearchInput
            placeholder="내가 올린 영상 내에서 검색.."
            inputSize="small"
            shape="line"
            iconPosition="left"
            iconColor="white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            suggestions={koreanWords}
            onSuggestionClick={handleSuggestionClick}
          />
          <Dropdown
            options={yearOptions}
            selectedValue={selectedYear}
            onSelect={(value) => setSelectedYear(value)}
            placeholder="연도 선택"
            className={styles.yearDropdown}
          />
        </div>
      </div>

      {/* 비디오 목록 */}
      <div className={styles.videoList}>
        {filteredAndSortedVideos.map((video) => (
          <div
            key={video.id}
            className={styles.videoItem}
          >
            <div className={styles.thumbnailContainer}>
              <div className={styles.thumbnail}>
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  width={120}
                  height={213}
                  className={styles.thumbnailImage}
                />
              </div>
            </div>
            <div className={styles.videoInfo}>
              <h3 className={styles.videoTitle}>{video.title}</h3>
              <div className={styles.videoStats}>
                <span>조회수 {formatCount(video.views)}회</span>
                <span className={styles.separator}>•</span>
                <span>{formatTimeAgo(video.uploadDate)}</span>
              </div>
            </div>
            <div className={styles.videoActions}>
              <div
                className={`${styles.privacyIcon} ${video.isPrivate ? styles.locked : ""}`}
                onClick={() => handlePrivacyToggle(video.id)}
              >
                <Image
                  src="/LockGray.svg"
                  alt={video.isPrivate ? "비공개" : "공개"}
                  width={16}
                  height={16}
                />
              </div>
              <div
                className={styles.menuContainer}
                ref={openMenuId === video.id ? menuRef : null}
              >
                <button
                  className={styles.menuButton}
                  onClick={() => handleMenuToggle(video.id)}
                >
                  <Image
                    src="/Edit.svg"
                    alt="더보기"
                    width={16}
                    height={16}
                  />
                </button>

                {openMenuId === video.id && (
                  <div className={styles.menuDropdown}>
                    <div
                      className={styles.menuOption}
                      onClick={() => handleEdit(video.id)}
                    >
                      수정
                    </div>
                    <div
                      className={styles.menuOption}
                      onClick={() => handleDelete(video.id)}
                    >
                      삭제
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
