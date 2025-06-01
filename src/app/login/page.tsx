"use client";

import { useRouter } from "next/navigation";
import styles from "./Login.module.scss";
import { LoginButton } from "@/components/atoms";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (provider: "google" | "naver") => {
    try {
      setLoading(true);

      if (provider === "google") {
        //구글 로그인
      } else {
        //네이버 로그인
      }

      router.push("/onboarding/nickname");
    } catch (error) {
      console.error(`${provider} 로그인 실패`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <img className={styles.wagLogo} src="/wagwagLogo.svg" alt="WAGWAGLOGO" />
      <h1 className={styles.guideText}>로그인을 위한 계정을 선택해주세요</h1>
      <div className={styles.buttonGroup}>
        <LoginButton provider="google" onClick={handleLogin} disabled={loading}>
          구글로 시작하기
        </LoginButton>
        <LoginButton provider="naver" onClick={handleLogin} disabled={loading}>
          네이버로 시작하기
        </LoginButton>
      </div>
    </div>
  );
}
