"use client";
import { useRouter } from "next/navigation";
import styles from "./Nickname.module.scss";
import { NicknameInputButton } from "@/components/atoms/Button/NicknameInputButton";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import OnboardingStepIndicator from "@/components/atoms/OnboardingStep/StepIndicator";
import React, { useEffect, useRef, useState } from "react";
import { HighlightText } from "./HighlightText";
import Image from "next/image";

export default function NicknamePage() {
  const [profileImage, setProfileImageFile] = useState<string | null>(null);
  const [imageError, setImageError] = useState("");
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState<React.ReactNode>("");
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 예시 사용중인 닉네임 리스트
  const nicknames = ["waggle", "테스트", "admin", "관리자"];

  // 닉네임 유효성 검사
  useEffect(() => {
    const specialCharacterRegex = /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g;

    if (!nickname.length) {
      setMessage("");
      setIsValid(false);
    } else if (nickname.length > 0 && nickname.length < 2) {
      setMessage(
        <>
          <HighlightText color="#FF7777">* 2 글자 이상의 </HighlightText>
          닉네임으로 정해주세요
        </>
      );
      setIsValid(false);
    } else if (specialCharacterRegex.test(nickname)) {
      setMessage(
        <>
          <HighlightText color="#FF7777">* 특수문자</HighlightText>는
          제거해주세요
        </>
      );
      setIsValid(false);
    } else if (nicknames.includes(nickname)) {
      setMessage(
        <>
          <HighlightText color="#FF7777">* 이미 사용 중</HighlightText>인
          닉네임입니다
        </>
      );
      setIsValid(false);
    } else {
      setMessage(
        <>
          <HighlightText color="#57F98E">* 사용가능한 </HighlightText>
          닉네임입니다
        </>
      );
      setIsValid(true);
    }
  }, [nickname]);
  return (
    <>
      <div className={styles.logoWrapper}>
        <Image
          className={styles.wagLogo}
          src="/wagwagLogo.svg"
          alt="WAGWAGLOGO"
          fill
        />
      </div>
      <div className={styles.container}>
        <h1 className={styles.guideText}>닉네임을 설정해 주세요</h1>
        <div className={styles.wrapper}>
          <div className={styles.profileImageContainer}>
            <div
              className={styles.profileImageWrapper}
              // onClick={handleImageClick}
            >
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="프로필 이미지"
                  fill
                  className={styles.profileImage}
                />
              ) : (
                <Image
                  src="/wagwagLogo.svg"
                  alt="기본 프로필"
                  fill
                  className={styles.defaultProfileImage}
                />
              )}
              <div className={styles.imageOverlay}>
                <span>변경</span>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              // onChange={handleImageChange}
              className={styles.hiddenInput}
            />
            {imageError && (
              <div className={styles.imageError}>• {imageError}</div>
            )}
          </div>
          <NicknameInputButton
            onChange={(e) => setNickname(e.target.value)}
          ></NicknameInputButton>
          <div className={styles.messageWrapper}>
            {message && <div className={styles.message}> {message}</div>}
          </div>
          <ActionButton
            onClick={() => router.push("./location")}
            disabled={!isValid || !nickname.trim()}
          >
            확인
          </ActionButton>
        </div>
        <div className={styles.stepcontainer}>
          <OnboardingStepIndicator />
        </div>
      </div>
    </>
  );
}
