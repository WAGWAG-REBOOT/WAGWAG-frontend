"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ArrowButton from "@/components/atoms/Button/ArrowButton";
import SearchInput from "@/components/atoms/Input/SearchInput";
import Sidebar from "@/components/layout/Sidebar";
import styles from "./page.module.scss";

interface VideoData {
  id: string;
  title: string;
  description: string;
  views: number;
  likes: number;
  isPrivate: boolean;
  thumbnail: string;
  uploadDate: string;
}

export default function MyUploadPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [koreanWords, setKoreanWords] = useState<string[]>([]);

  // 한국어 단어 데이터 로드
  useEffect(() => {
    const loadKoreanWords = async () => {
      try {
        const response = await fetch("/data/korean-words.json");
        const data = await response.json();

        // 모든 카테고리의 단어를 하나의 배열로 합치기
        const allWords: string[] = [];
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

  // 추천어 클릭 처리
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
  };

  // 임시 데이터 - 실제로는 API에서 가져올 데이터
  const [videos] = useState<VideoData[]>([
    {
      id: "1",
      title: "오늘 제가 올린 영상 안 보시면 후회합니다",
      description:
        "회사에 가서는 달라 근데 그건 까라면 까야지 아 그렇구나 내 기준에서 진짜 아닌 것 같다 그러면 말을 하지 근데 나는 아닌것같다고 하면 그렇구나 하고 말아",
      views: 120000,
      likes: 127,
      isPrivate: true,
      thumbnail: "/nature.jpg",
      uploadDate: "오늘",
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
      uploadDate: "오늘",
    },
    {
      id: "3",
      title: "오늘 제가 올린 영상 안 보시면 후회합니다",
      description:
        "회사에 가서는 달라 근데 그건 까라면 까야지 아 그렇구나 내 기준에서 진짜 아닌 것 같다 그러면 말을 하지 근데 나는 아닌것같다고 하면 그렇구나 하고 말아",
      views: 120000,
      likes: 127,
      isPrivate: true,
      thumbnail: "/nature.jpg",
      uploadDate: "어제",
    },
  ]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // 실제 검색 로직 구현
    console.log("검색어:", query);
  };

  const handleBack = () => {
    // 뒤로가기 로직
    window.history.back();
  };

  const groupedVideos = videos.reduce(
    (acc, video) => {
      if (!acc[video.uploadDate]) {
        acc[video.uploadDate] = [];
      }
      acc[video.uploadDate].push(video);
      return acc;
    },
    {} as Record<string, VideoData[]>,
  );

  const formatCount = (count: number) => {
    if (count >= 10000) {
      return `${Math.floor(count / 10000)}만회`;
    }
    return `${count}회`;
  };

  return (
    <div className={styles.pageContent}>
      {/* 헤더 */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <ArrowButton
            direction="left"
            onClick={handleBack}
          >
            뒤로
          </ArrowButton>
          <h1 className={styles.pageTitle}>내가 업로드한 영상</h1>
        </div>
        <div className={styles.searchContainer}>
          <SearchInput
            placeholder="내가 올린 영상 내에서 검색.."
            inputSize="large"
            shape="line"
            iconPosition="left"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            suggestions={koreanWords}
            onSuggestionClick={handleSuggestionClick}
          />
        </div>
      </div>

      {/* 비디오 목록 */}
      <div className={styles.videoList}>
        {Object.entries(groupedVideos).map(([date, dateVideos]) => (
          <div
            key={date}
            className={styles.dateSection}
          >
            <h2 className={styles.dateHeader}>{date}</h2>
            {dateVideos.map((video) => (
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
                      height={90}
                      className={styles.thumbnailImage}
                    />
                  </div>
                </div>
                <div className={styles.videoInfo}>
                  <h3 className={styles.videoTitle}>{video.title}</h3>
                  <div className={styles.videoStats}>
                    <span>조회수 {formatCount(video.views)}</span>
                    <span className={styles.separator}>•</span>
                    <span>좋아요 {video.likes}개</span>
                  </div>
                  <p className={styles.videoDescription}>{video.description}</p>
                </div>
                <div className={styles.videoActions}>
                  <div className={styles.privacyIcon}>
                    <Image
                      src="/LockGray.svg"
                      alt="비공개"
                      width={16}
                      height={16}
                    />
                  </div>
                  <button className={styles.menuButton}>
                    <Image
                      src="/Edit.svg"
                      alt="더보기"
                      width={16}
                      height={16}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
