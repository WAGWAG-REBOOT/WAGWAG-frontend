import { LikeCount, Nickname, ViewCount } from "@/components/atoms";

import styles from "./VideoInfo.module.scss";

interface VideoInfoProps {
  nickname: string;
  views: number;
  likes: number;
}
export const VideoInfo = ({ nickname, views, likes }: VideoInfoProps) => {
  return (
    <div className={styles.videoInfoContainer}>
      <div className={styles.videoInfoTop}>
        <ViewCount count={views} />
      </div>
      <div className={styles.videoInfoBottom}>
        <Nickname name={nickname} />
        <LikeCount count={likes} />
      </div>
    </div>
  );
};
