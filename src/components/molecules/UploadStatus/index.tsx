import { ReactNode } from "react";

import BookMark from "@/assets/images/Label.svg";

import styles from "./UploadStatus.module.scss";

interface UploadStatusProps {
  region: string;
  rank: number;
  dongName: string;
  children?: ReactNode;
}
export const UploadStatus = ({ region, rank, dongName }: UploadStatusProps) => {
  return (
    <div className={styles.uploadStatusWrapper}>
      <div className={styles.header}>
        <div className={styles.region}>
          <BookMark /> 서울 {region} 내 <span className={styles.rank}>{rank}위</span>
        </div>
      </div>
      <div className={styles.dongName}>{dongName}</div>
    </div>
  );
};
