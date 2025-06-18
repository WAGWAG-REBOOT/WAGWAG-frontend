"use client";
import { useRouter } from "next/navigation";
import styles from "./Location.module.scss";
import { SEOUL_REGIONS } from "@/constants/regions";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import OnboardingStepIndicator from "@/components/atoms/OnboardingStep/StepIndicator";
import { useUserSettingStore } from "@/stores";

export default function LocationPage() {
  const { selectedGu, selectedDong, setSelectedGu, setSelectedDong } =
    useUserSettingStore();
  const dongList = selectedGu ? SEOUL_REGIONS[selectedGu] : [];
  const guList = Object.keys(SEOUL_REGIONS);
  const router = useRouter();

  return (
    <>
      <img className={styles.wagLogo} src="/wagwagLogo.svg" alt="WAGWAGLOGO" />
      <div className={styles.container}>
        <h1 className={styles.guideText}>waggle님의 지역을 설정해 주세요</h1>
        <h2 className={styles.helperText}>
          <span className={styles.highlight}>* 내 지역</span>을 기반으로 와글을
          볼 수 있어요
        </h2>

        <div className={styles.columns01}>
          <div className={styles.wrapper}>
            {/* 시 · 도 */}
            <div className={styles.columns02}>
              <h3 className={styles.sectiontitle}>시 · 도</h3>
              <h3 className={styles.seoultext}>서울</h3>
            </div>

            <div className={styles.line}></div>

            {/* 구 · 군 · 시 */}
            <div className={styles.guList}>
              <h3 className={styles.sectiontitle}>구 · 군 · 시</h3>
              {guList.map((gu) => (
                <button
                  key={gu}
                  className={`${styles.guButton} ${selectedGu === gu ? styles.active : ""}`}
                  onClick={() => {
                    setSelectedGu(gu);
                    setSelectedDong(null);
                  }}
                >
                  {gu}
                </button>
              ))}
            </div>

            {/* 동 · 읍 · 면 */}
            <div className={styles.dongList}>
              <h3 className={styles.sectiontitle}>동 · 읍 · 면</h3>
              {dongList.map((dong) => (
                <button
                  key={dong}
                  className={`${styles.dongButton} ${selectedDong === dong ? styles.active : ""}`}
                  onClick={() => setSelectedDong(dong)}
                >
                  {dong}
                  {selectedDong === dong && (
                    <img
                      src="/checkIcon.svg"
                      alt="선택완료"
                      className={styles.checkIcon}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ActionButton
          className={styles.actionButton}
          onClick={() => router.push("./category")}
          disabled={!selectedGu || !selectedDong} // ✅ 둘 다 선택되지 않으면 비활성화
        >
          확인
        </ActionButton>

        <div className={styles.stepcontainer}>
          <OnboardingStepIndicator />
        </div>
      </div>
    </>
  );
}
