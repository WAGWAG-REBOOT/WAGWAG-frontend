import React from "react";
import styles from "./main.module.scss";

interface ShortsCardProps {
  thumbnailUrl: string;
  title: string;
  nickname: string;
  views: number;
}

export const ShortsCard: React.FC<ShortsCardProps> = ({ thumbnailUrl, title }) => {
  return (
    <div className={styles.shortsCard}>
      <img
        src={thumbnailUrl}
        alt={title}
      />
    </div>
  );
};
