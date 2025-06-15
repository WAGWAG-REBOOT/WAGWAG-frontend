import styles from "./VideoPreview.module.scss";
import { useRef, memo } from "react";

interface VideoPreviewProps {
  src: string | null;
  fileName: string;
  onClick: () => void;
}

export const VideoPreview = memo(
  ({ src, fileName, onClick }: VideoPreviewProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
      <>
        <div onClick={onClick} className={styles.videoBox}>
          {src ? (
            <video
              ref={videoRef}
              src={src}
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
        <h2 className={styles.fileText}>
          <span className={styles.label}>파일 이름</span>
          <span className={styles.separator}>|</span>
          <span className={styles.name}>{fileName}</span>
        </h2>
      </>
    );
  }
);
