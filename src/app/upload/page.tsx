"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Upload.module.scss";
import { ActionButton } from "@/components/atoms";
import { VisibilityToggleButton } from "@/components/atoms";
import { VideoPreview } from "@/components/molecules/VideoPreview";

export default function UploadPage() {
  const [isPublic, setIsPublic] = useState(true);
  const handleToggle = () => {
    setIsPublic((prev) => !prev);
  };
  return (
    <>
      {/* 아래 div는 메뉴바 공간임 */}
      <div
        style={{
          width: "15rem",
          height: "81rem",
          backgroundColor: "#fff",
          position: "fixed",
        }}
      ></div>
      <div className={styles.container}>
        <div className={styles.uploadContainer}>
          <div className={styles.videoContainer}>
            <h1 className={styles.titleText}>와글 썸네일</h1>
            <VideoPreview />
          </div>
          <div className={styles.inputContainer}>
            <h3 className={styles.smallTitle}>제목</h3>
            <input
              className={styles.wagtitle}
              placeholder="와글 제목을 입력해주세요"
              maxLength={40}
            ></input>
            <h3 className={styles.smallTitle}>설명</h3>
            <textarea
              className={styles.wagtext}
              placeholder="시청자에게 이 와글에 대해 설명해 주세요"
              maxLength={180}
            ></textarea>
            <VisibilityToggleButton
              className={styles.toggleButton}
              isPublic={isPublic}
              onClick={handleToggle}
            />
            ;<ActionButton className={styles.actionButton}>완료</ActionButton>
          </div>
        </div>
      </div>
    </>
  );
}
