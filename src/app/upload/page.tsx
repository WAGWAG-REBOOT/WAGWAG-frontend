"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { ActionButton, VisibilityToggleButton } from "@/components/atoms";
import { VideoPreview } from "@/components/molecules/VideoPreview";

import styles from "./Upload.module.scss";

export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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

  useEffect(() => {
    return () => {
      if (videoSrc) {
        URL.revokeObjectURL(videoSrc);
      }
    };
  }, [videoSrc]);
  const fileName = videoFile?.name ?? "";

  const handleSubmit = () => {
    console.log("영상 파일:", videoFile ?? "없음");
    console.log("제목:", title);
    console.log("설명:", description);
    console.log("공개 여부:", isPublic ? "전체공개" : "비공개");
  };

  return (
    <>
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
            <div className={styles.textWrapper}>
              <h3 className={styles.smallTitle}>제목</h3>
              <div className={styles.wagtitleCount}>
                <span
                  className={`${styles.length} ${title.length >= 40 ? styles.limitReached : ""}`}
                >
                  {title.length}
                </span>{" "}
                / 40
              </div>
            </div>
            <input
              className={styles.wagtitle}
              placeholder="와글 제목을 입력해주세요"
              maxLength={40}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <div className={styles.textWrapper}>
              <h3 className={styles.smallTitle}>설명</h3>
              <div className={styles.wagtextCount}>
                <span
                  className={`${styles.length} ${
                    description.length >= 180 ? styles.limitReached : ""
                  }`}
                >
                  {description.length}
                </span>{" "}
                / 180
              </div>
            </div>
            <textarea
              className={styles.wagtext}
              placeholder="시청자에게 이 와글에 대해 설명해 주세요"
              maxLength={180}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <VisibilityToggleButton
              className={styles.toggleButton}
              isPublic={isPublic}
              onClick={handleToggle}
            />
            <ActionButton
              className={styles.actionButton}
              onClick={handleSubmit}
            >
              완료
            </ActionButton>
          </div>
        </div>
      </div>
    </>
  );
}
