"use client";

import ArrowButton from "@/components/atoms/Button/ArrowButton";
import { VideoCard } from "@/components/molecules";
import React from "react";
import styles from "./main.module.scss";
import { useScrollCarousel } from "./useScrollCarousel";

interface VideoCardData {
  id: number;
  thumbnailUrl: string;
  nickname: string;
  views: number;
  likes: number;
  title: string;
}

interface VideoCarouselSectionProps {
  title: string;
  videoCards: VideoCardData[];
  locationText?: string;
  variant?: "default" | "myPage";
  onViewAllClick?: () => void;
}

export const VideoCarouselSection: React.FC<VideoCarouselSectionProps> = ({
  title,
  videoCards,
  locationText,
  variant = "default",
  onViewAllClick,
}) => {
  const { scrollContainerRef, canScrollLeft, canScrollRight, handleScroll } = useScrollCarousel();

  return (
    <div>
      <div className={styles.titleSection}>
        <h1 className={styles.waggleTitle}>
          {locationText && <span className={styles.locationText}>{locationText}</span>} {title}
        </h1>
        {variant === "myPage" ? (
          <button
            className={styles.viewAllButton}
            onClick={onViewAllClick}
          >
            모두보기
          </button>
        ) : (
          <div className={styles.arrowButtons}>
            <ArrowButton
              direction="left"
              arrowType="default"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
            >
              {""}
            </ArrowButton>
            <ArrowButton
              direction="right"
              arrowType="default"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
            >
              {""}
            </ArrowButton>
          </div>
        )}
      </div>
      <div
        className={styles.videoCardList}
        ref={scrollContainerRef}
      >
        {videoCards.map((video) => (
          <VideoCard
            key={video.id}
            thumbnailUrl={video.thumbnailUrl}
            nickname={video.nickname}
            views={video.views}
            likes={video.likes}
            title={video.title}
            size="large"
          />
        ))}
      </div>
    </div>
  );
};
