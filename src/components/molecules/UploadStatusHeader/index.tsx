import React from "react";

import BookMark from "@/assets/images/Label.svg";

import styles from "./UploadStatusHeader.module.scss";

interface UploadStatusProps {
  region: string | null;
  rank: number;
  dongName: string | null;
  children?: React.ReactNode;
}
function UploadStatusHeader({ region, rank, dongName }: UploadStatusProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.dongName}>{dongName}</div>
      <div className={styles.region}>
        <BookMark /> 서울 {region} 내 <span className={styles.rank}>{rank}위</span>
      </div>
    </div>
  );
}

export default UploadStatusHeader;
