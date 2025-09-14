import { formatCount } from "@/utils/helpers";

import PlayGraySvg from "@/assets/images/PlayGray.svg";
import PlayFillSvg from "@/assets/images/PlaySmall.svg";

import styles from "./ViewCount.module.scss";

interface ViewCountProps {
  count: number;
  size?: "large" | "small";
}
export const ViewCount = ({ count, size = "large" }: ViewCountProps) => {
  return (
    <div className={styles.viewCountGroup}>
      {size === "small" ? <PlayFillSvg /> : <PlayGraySvg />}
      <div className={styles.viewCount}>{formatCount(count)}</div>
    </div>
  );
};
