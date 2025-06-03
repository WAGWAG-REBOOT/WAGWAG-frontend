"use client";
import { useRouter } from "next/navigation";
import styles from "./Nickname.module.scss";
import { NicknameInputButton } from "@/components/atoms/Button/NicknameInputButton";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import OnboardingStepIndicator from "@/components/atoms/OnboardingStep/StepIndicator";
import React, { useMemo, useRef, useState } from "react";
import { HighlightText } from "./HighlightText";
import Image from "next/image";

// 비속어 방지 기능 필요
export default function NicknamePage() {
  const [profileImage, setProfileImageFile] = useState<string | null>(null);
  const [imageError, setImageError] = useState("");
  const [nickname, setNickname] = useState("");
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 예시 사용중인 닉네임 리스트
  const nicknames = useMemo(() => ["waggle", "테스트", "admin", "관리자"], []);

  const trimmedNickname = nickname.trim();

  const { message, isValid } = useMemo(() => {
    const specialCharacterRegex = /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g;
    const whitespaceRegex = /\s/g;

    if (!trimmedNickname) {
      return { message: "", isValid: false };
    } else if (trimmedNickname.length < 2) {
      return {
        message: (
          <>
            <HighlightText color="#FF7777">* 2 글자 이상의 </HighlightText>
            닉네임으로 정해주세요
          </>
        ),
        isValid: false,
      };
    } else if (specialCharacterRegex.test(trimmedNickname)) {
      return {
        message: (
          <>
            <HighlightText color="#FF7777">* 특수문자</HighlightText>는
            제거해주세요
          </>
        ),
        isValid: false,
      };
    } else if (whitespaceRegex.test(trimmedNickname)) {
      return {
        message: (
          <>
            <HighlightText color="#FF7777">* 공백</HighlightText>은 사용할 수
            없어요
          </>
        ),
        isValid: false,
      };
    } else if (
      nicknames.some(
        (used) => used.toLowerCase() === trimmedNickname.toLowerCase()
      )
    ) {
      return {
        message: (
          <>
            <HighlightText color="#FF7777">* 이미 사용 중</HighlightText>인
            닉네임입니다
          </>
        ),
        isValid: false,
      };
    } else {
      return {
        message: (
          <>
            <HighlightText color="#57F98E">* 사용가능한 </HighlightText>
            닉네임입니다
          </>
        ),
        isValid: true,
      };
    }
  }, [trimmedNickname, nicknames]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError("");
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 체크 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      setImageError("파일 크기는 5MB 이하여야 합니다");
      return;
    }

    // 파일 타입 체크
    if (!file.type.startsWith("image/")) {
      setImageError("이미지 파일만 업로드 가능합니다");
      return;
    }

    // 미리보기 이미지 생성
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        setProfileImageFile(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  return (
    <>
      <div className={styles.wagLogo}>
        <Image src="/wagwagLogo.svg" alt="WAGWAGLOGO" fill sizes="13.3rem" />
      </div>
      <div className={styles.container}>
        <h1 className={styles.guideText}>닉네임을 설정해 주세요</h1>
        <div className={styles.wrapper}>
          <div className={styles.profileImageContainer}>
            <div
              className={`${styles.profileImageWrapper} ${
                profileImage ? styles.active : ""
              }`}
              onClick={handleImageClick}
            >
              <Image
                src={profileImage ?? "/wagwagLogo.svg"}
                alt="프로필 이미지"
                fill
                sizes="13.2rem"
                className={
                  profileImage ? styles.profileImage : styles.defaultImage
                }
              />
              <div className={styles.imageOverlay}>
                <span>변경</span>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.hiddenInput}
            />
            {imageError && (
              <div className={styles.imageError}>• {imageError}</div>
            )}
          </div>
          <NicknameInputButton
            value={nickname}
            onChange={handleNicknameChange}
          ></NicknameInputButton>
          <div className={styles.messageWrapper}>
            {message && <div className={styles.message}> {message}</div>}
          </div>
          <ActionButton
            onClick={() => router.push("./location")}
            disabled={!isValid}
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
