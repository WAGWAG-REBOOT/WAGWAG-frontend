import { formatCount } from "@/utils/helpers";

import HeartGraySvg from "@/assets/images/HeartGray.svg";
import HeartFillSvg from "@/assets/images/HeartSmall.svg";

import styles from "./LikeCount.module.scss";

interface LikeCountProps {
  count: number;
  size?: "large" | "small";
}
export const LikeCount = ({ count, size = "large" }: LikeCountProps) => {
  return (
    <div className={styles.likeCountGroup}>
      {size === "small" ? <HeartFillSvg /> : <HeartGraySvg />}
      <div className={styles.likeCount}>{formatCount(count)}</div>
    </div>
  );
};
