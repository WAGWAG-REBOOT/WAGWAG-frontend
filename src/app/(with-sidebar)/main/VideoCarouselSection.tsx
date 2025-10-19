import React from "react";
import { VideoCard } from "@/components/molecules";
import ArrowButton from "@/components/atoms/Button/ArrowButton";
import { useScrollCarousel } from "./useScrollCarousel";
import styles from "./main.module.scss";

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
}

export const VideoCarouselSection: React.FC<VideoCarouselSectionProps> = ({
  title,
  videoCards,
  locationText,
}) => {
  const { scrollContainerRef, canScrollLeft, canScrollRight, handleScroll } = useScrollCarousel();

  return (
    <>
      <div className={styles.titleSection}>
        <h1 className={styles.waggleTitle}>
          {locationText && <span className={styles.locationText}>{locationText}</span>} {title}
        </h1>
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
    </>
  );
};
