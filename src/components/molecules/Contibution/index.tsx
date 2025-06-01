import React from "react";
import PolygonRightGraySvg from "@/assets/images/PolygonRightGray.svg";
import InformationSvg from "@/assets/images/Information.svg";
import { ProgressBar } from "@/components/atoms";
import styles from "./Contribution.module.scss";
import { ContributionProps } from "./Contribution.types";

export const Contribution: React.FC<ContributionProps> = ({
  percentage,
  title = "나의 지역 순위 기여도",
  className = "",
}) => {
  return (
    <div className={`${styles.contributionContainer} ${className}`}>
      <div className={styles.contributionHeader}>
        <PolygonRightGraySvg />
        <h1>{title}</h1>
        <InformationSvg />
      </div>

      <ProgressBar percentage={percentage} />
    </div>
  );
};