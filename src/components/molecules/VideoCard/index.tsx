import Image from "next/image";

import { LikeCount, ViewCount } from "@/components/atoms";
import { VideoInfo } from "@/components/molecules";

import styles from "./VideoCard.module.scss";

interface VideoCardProps {
  thumbnailUrl: string;
  nickname: string;
  views: number;
  likes: number;
  title: string;
  size?: "large" | "small";
}
export const VideoCard = ({
  thumbnailUrl,
  nickname,
  views,
  likes,
  title,
  size = "large",
}: VideoCardProps) => {
  return (
    <div
      className={`${styles.videoCardContainer} ${size === "small" ? styles.small : styles.large}`}
    >
      <div className={styles.thumbnailContainer}>
        {size === "large" && (
          <VideoInfo
            nickname={nickname}
            views={views}
            likes={likes}
          />
        )}
        <Image
          src={thumbnailUrl}
          alt={title}
          width={size === "large" ? 236 : 122}
          height={size === "large" ? 340 : 161}
        />
      </div>
      {size === "small" && (
        <div className={styles.smallVideoInfo}>
          <ViewCount
            count={views}
            size="small"
          />
          <LikeCount
            count={likes}
            size="small"
          />
        </div>
      )}
      {size === "large" && <p className={styles.videoTitle}>{title}</p>}
    </div>
  );
};
