"use client";

import { ReactElement, useEffect, useState } from "react";
import clsx from "clsx";

import Location from "@/assets/images/Location.svg";
import Fire from "@/assets/images/Fire.svg";
import Label from "@/assets/images/Label.svg";
import Star from "@/assets/images/Star.svg";
import VideoFill from "@/assets/images/VideoFill.svg";

import styles from "./Topbar.module.scss";

type WaggleVariant = "video" | "rank" | "keyword" | "post";

interface TopbarWaggleData {
  videoCount: number;
  rank: number;
  hotKeyword: string;
  topPosts: string[];
}

interface TopbarProps {
  location: string;
  data: TopbarWaggleData;
}

const Topbar = ({ location, data }: TopbarProps) => {
  const { videoCount, rank, hotKeyword, topPosts } = data;
  const [currentPostIndex, setCurrentPostIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPostIndex((prev) => (prev + 1) % topPosts.length);
    }, 3000); // 3초마다 변경

    return () => clearInterval(interval);
  }, [topPosts.length]);

  return (
    <div className={styles.topbarContainer}>
      <TextGroup
        icon={<Location />}
        title={location}
        isMain
      />
      <div className={styles.verticalDivider} />
      <TextGroup
        icon={<VideoFill />}
        title="오늘 올라온 영상 갯수"
        value={videoCount.toString()}
        variant="video"
      />
      <TextGroup
        icon={<Label />}
        title="우리동네 와글 순위"
        value={`${rank}위`}
        variant="rank"
      />
      <TextGroup
        icon={<Fire />}
        title="우리동네 핫한 키워드"
        value={`#${hotKeyword}`}
        variant="keyword"
      />
      <TextGroup
        icon={<Star />}
        title="인기 와글"
        value={`${currentPostIndex + 1}. ${topPosts[currentPostIndex]}`}
        variant="post"
      />
    </div>
  );
};

export default Topbar;

interface TextGroupProps {
  icon: ReactElement;
  title: string;
  value?: string;
  isMain?: boolean;
  variant?: WaggleVariant;
}

const TextGroup = ({ icon, title, value, isMain = false, variant }: TextGroupProps) => (
  <div className={styles.textGroup}>
    {icon}
    <div className={styles.text}>
      <h2 className={isMain ? styles.mainTitle : styles.smallTitle}>{title}</h2>
      {value && (
        <h3 className={clsx(styles.waggleText, variant && styles[`waggleText--${variant}`])}>
          {value}
        </h3>
      )}
    </div>
  </div>
);
