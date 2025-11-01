import React, { useState, useRef, useEffect } from "react";
import PlaySvg from "@/assets/images/Play.svg";
import PauseSvg from "@/assets/images/Pause.svg";
import VolumeSvg from "@/assets/images/Volume.svg";
import PlayGraySvg from "@/assets/images/PlayGray.svg";
import styles from "./main.module.scss";

interface ShortsCardProps {
  thumbnailUrl: string;
  title: string;
  nickname: string;
  views: number;
}

export const ShortsCard: React.FC<ShortsCardProps> = ({ thumbnailUrl, title, nickname, views }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const volumeControlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent || 0);
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set initial volume
    video.volume = volume / 100;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play();
            setIsPlaying(true);
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [volume]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (volumeControlRef.current && !volumeControlRef.current.contains(event.target as Node)) {
        setShowVolumeSlider(false);
      }
    };

    if (showVolumeSlider) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showVolumeSlider]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    video.volume = newVolume / 100;

    if (newVolume === 0) {
      setIsMuted(true);
      video.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      video.muted = false;
    }
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div
      className={styles.shortsCard}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={thumbnailUrl}
        className={styles.videoElement}
        loop
        playsInline
      />
      <div className={styles.shortsViewCount}>
        <PlayGraySvg className={styles.viewIcon} />
        <span className={styles.viewText}>{formatViews(views)}</span>
      </div>
      <div className={styles.shortsInfo}>
        <p className={styles.shortsNickname}>{nickname}</p>
        <h3 className={styles.shortsTitle}>{title}</h3>
      </div>
      <div
        className={styles.playbackControls}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.controlButton}
          onClick={togglePlay}
        >
          {isPlaying ? <PauseSvg /> : <PlaySvg />}
        </button>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div
          className={styles.volumeControl}
          ref={volumeControlRef}
        >
          {showVolumeSlider && (
            <div className={styles.volumeSlider}>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className={styles.volumeSliderInput}
              />
            </div>
          )}
          <button
            className={styles.controlButton}
            onClick={(e) => {
              e.stopPropagation();
              setShowVolumeSlider(!showVolumeSlider);
            }}
          >
            <VolumeSvg />
          </button>
        </div>
      </div>
    </div>
  );
};
