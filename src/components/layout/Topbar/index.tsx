"use client";

import { ReactElement } from "react";
import { useEffect, useState } from "react";

import Location from "@/assets/images/Location.svg";
import Fire from "@/assets/images/Fire.svg";
import Label from "@/assets/images/Label.svg";
import Star from "@/assets/images/Star.svg";
import VideoFill from "@/assets/images/VideoFill.svg";

import styles from "./Topbar.module.scss";

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
    }, 3000); // 5초마다 변경

    return () => clearInterval(interval); // 컴포넌트 unmount 시 정리
  }, [topPosts.length]);

  return (
    <div className={styles.topbarContainer}>
      <TextGroup
        icon={<Location />}
        title={location}
        isMain
      />
      <TextGroup
        icon={<VideoFill />}
        title="오늘 올라온 영상 갯수"
        value={videoCount.toString()}
      />
      <TextGroup
        icon={<Label />}
        title="우리동네 와글 순위"
        value={`${rank}위`}
      />
      <TextGroup
        icon={<Fire />}
        title="우리동네 핫한 키워드"
        value={`#${hotKeyword}`}
      />
      <TextGroup
        icon={<Star />}
        title="인기 와글"
        value={`${currentPostIndex + 1}. ${topPosts[currentPostIndex]}`}
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
}

const TextGroup = ({ icon, title, value, isMain = false }: TextGroupProps) => (
  <div className={styles.textGroup}>
    {icon}
    <div className={styles.text}>
      <h2 className={isMain ? styles.mainTitle : styles.smallTitle}>{title}</h2>
      {value && <h3 className={styles.waggleText}>{value}</h3>}
    </div>
  </div>
);
