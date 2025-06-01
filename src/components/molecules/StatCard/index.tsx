import VideoFillGraySvg from "@/assets/images/VideoFillGray.svg";
import HeartFillGraySvg from "@/assets/images/HeartFillGray.svg";
import EyeFillGraySvg from "@/assets/images/EyeFillGray.svg";
import styles from "./StatCard.module.scss";

interface StatCardProps {
  variant: "uploads" | "likes" | "views";
  value: number; // K, M 단위 붙은 스트링일 수도 있음
}
// TODO: number <-> K, M 단위 변환 함수 추가

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
  return (
    <div className={styles.statCardContainer}>
      <p className={styles.label}>
        {variantMap[variant].label}
      </p>
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={styles.icon}>
            {variantMap[variant].icon}
          </div>
          <p className={styles.value}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}