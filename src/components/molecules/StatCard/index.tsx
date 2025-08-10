import { formatCount } from "@/utils/helpers";

import EyeFillGraySvg from "@/assets/images/EyeFillGray.svg";
import HeartFillGraySvg from "@/assets/images/HeartFillGray.svg";
import VideoFillGraySvg from "@/assets/images/VideoFillGray.svg";

import styles from "./StatCard.module.scss";

interface StatCardProps {
  variant: "uploads" | "likes" | "views";
  value: number; // K, M 단위 붙은 스트링일 수도 있음
}

const variantMap = {
  uploads: {
    icon: <VideoFillGraySvg height={24.75} />,
    label: "업로드한 와글",
  },
  likes: {
    icon: <HeartFillGraySvg height={24.75} />,
    label: "받은 좋아요",
  },
  views: {
    icon: <EyeFillGraySvg height={24.75} />,
    label: "총 조회수",
  },
};

export const StatCard = ({ variant, value }: StatCardProps) => {
  const { icon, label } = variantMap[variant];

  const formattedValue = formatCount(value);

  return (
    <div className={styles.statCardContainer}>
      <p className={styles.label}>{label}</p>
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={styles.icon}>{icon}</div>
          <p className={styles.value}>{formattedValue}</p>
        </div>
      </div>
    </div>
  );
};
