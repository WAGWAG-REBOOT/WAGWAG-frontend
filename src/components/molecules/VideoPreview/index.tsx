import styles from "./VideoPreview.module.scss";
import { useRef, useState } from "react";

interface VideoPreviewProps {
  src: string;
  onClick: () => void;
  fileName?: string;
}

export const VideoPreview = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const fileName = videoFile?.name ?? "선택되지 않음";
  const videoRef = useRef<HTMLVideoElement>(null);
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
  const videoSrc = videoFile ? URL.createObjectURL(videoFile) : null;
  return (
    <>
      <input
        type="file"
        accept="video/*"
        ref={inputRef}
        onChange={handleVideoChange}
        style={{ display: "none" }}
      />
      <div onClick={handleClickArea} className={styles.videoBox}>
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            loop
            playsInline
            className={styles.videoBox}
            onMouseEnter={() => videoRef.current?.play()}
            onMouseLeave={() => {
              if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
              }
            }}
          />
        ) : (
          <div className={styles.Videotext}>Upload video</div>
        )}
      </div>
      <h2 className={styles.fileText}>파일 이름 | {fileName}</h2>
    </>
  );
};
