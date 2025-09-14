import React from "react";
import Slider from "react-slick";

import TagButton from "@/components/atoms/Button/TagButton";
import { VideoCard } from "@/components/molecules";
import UploadChart from "@/components/molecules/UploadChart";
import UploadStatusHeader from "@/components/molecules/UploadStatusHeader";

import styles from "./UploadStatus.module.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type UploadStatusProps = {
  selectedAddr: { region: string; dongName: string } | null;
};
function UploadStatus({ selectedAddr }: UploadStatusProps) {
  const videos = [
    {
      thumbnailUrl: "/nature.jpg",
      nickname: "SONN",
      views: 23900,
      likes: 12600,
      title: "대현문화공원 앞에 버스킹 실력자",
    },
    {
      thumbnailUrl: "/nature.jpg",
      nickname: "JIN",
      views: 18000,
      likes: 9000,
      title: "광장 버스킹 현장",
    },
    {
      thumbnailUrl: "/nature.jpg",
      nickname: "JIN",
      views: 18000,
      likes: 9000,
      title: "광장 버스킹 현장",
    },
  ];

  const settings = {
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: false,
    arrows: false,
    dots: false,
    variableWidth: false,
  };

  return (
    <div className={styles.uploadStatusWrapper}>
      <div className={styles.header}>
        <UploadStatusHeader
          region={selectedAddr && selectedAddr.region}
          rank={2}
          dongName={selectedAddr && selectedAddr.dongName}
        />
      </div>
      <div className={styles.chartWrapper}>
        <div className={styles.chartTitle}>와글 업로드 현황</div>
        <UploadChart />
      </div>
      <div className={styles.videoWrapper}>
        <div className={styles.title}>인기 와글</div>
        <TagButton
          fontSize="1.35rem"
          padding="0.9rem 2.25rem 0.95rem"
        >
          더보기
        </TagButton>
      </div>
      <Slider
        {...settings}
        className={styles.slider}
      >
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            thumbnailUrl={video.thumbnailUrl}
            nickname={video.nickname}
            views={video.views}
            likes={video.likes}
            title={video.title}
            size="small"
          />
        ))}
      </Slider>
    </div>
  );
}

export default UploadStatus;
