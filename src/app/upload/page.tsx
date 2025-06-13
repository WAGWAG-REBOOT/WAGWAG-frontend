"use client";

import { useMemo, useEffect, useRef, useState } from "react";
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
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickArea = () => {
    inputRef.current?.click();
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const videoSrc = useMemo(() => {
    if (!videoFile) return null;
    return URL.createObjectURL(videoFile);
  }, [videoFile]);

  // 객체 URL 메모리 해제 (중요!)
  useEffect(() => {
    return () => {
      if (videoSrc) {
        URL.revokeObjectURL(videoSrc);
      }
    };
  }, [videoSrc]);
  const fileName = videoFile?.name ?? "선택되지 않음";
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
            <input
              type="file"
              accept="video/*"
              ref={inputRef}
              onChange={handleVideoChange}
              style={{ display: "none" }}
            />
            <VideoPreview
              src={videoSrc}
              fileName={fileName}
              onClick={handleClickArea}
            />
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
            <ActionButton className={styles.actionButton}>완료</ActionButton>
          </div>
        </div>
      </div>
    </>
  );
}
