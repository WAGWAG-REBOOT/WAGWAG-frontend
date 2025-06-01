import React from "react";
import styles from "./ProgressBar.module.scss";
import { ProgressBarProps } from "./ProgressBar.types";

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  className = "",
}) => {
  // percentage를 0-100 범위로 제한
  const clampedPercentage = Math.max(0, Math.min(100, percentage));
  
  const fillStyle = {
    width: `${clampedPercentage}%`,
  };
  
  // 퍼센트 카드의 위치 계산 (진행 바의 끝 부분에 위치)
  const cardStyle = {
    left: `${clampedPercentage}%`,
  };

  // 연결선의 위치 계산 (진행 바의 끝 부분에 위치)
  const connectorStyle = {
    left: `${clampedPercentage}%`,
  };

  return (
    <div className={`${styles.progressContainer} ${className}`}>
      <div className={styles.progressBarWrapper}>
        <div className={styles.progressBarFill} style={fillStyle} />
      </div>
      
      <div className={styles.connectorLine} style={connectorStyle} />
      
      <div className={styles.percentageCard} style={cardStyle}>
        <span className={styles.percentageText}>상위
          <span className={styles.percentage}> {clampedPercentage.toFixed(1)}%</span> 
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
