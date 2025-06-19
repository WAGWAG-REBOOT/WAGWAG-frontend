"use client";
import { useRouter } from "next/navigation";
import styles from "./Category.module.scss";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import { CategorySelectButton } from "@/components/atoms/Button/CategorySelectButton";
import OnboardingStepIndicator from "@/components/atoms/OnboardingStep/StepIndicator";
import { useUserSettingStore } from "@/stores";

const CATEGORIES = [
  "뷰티",
  "운동",
  "노래",
  "게임",
  "산책",
  "음식",
  "일상생활",
  "타 지역 인기 와글",
];

const MAX_SELECT = 3;

const FIRST_BUTTONS = CATEGORIES.slice(0, 6);
const LAST_BUTTONS = CATEGORIES.slice(6);

export default function CategoryPage() {
  const { categories, setCategories, reset } = useUserSettingStore();
  const router = useRouter();

  const handleSelect = (category: string) => {
    setCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      } else if (prev.length < MAX_SELECT) {
        return [...prev, category];
      } else {
        return prev; // 3개 이상 선택 불가
      }
    });
  };

  const handleComplete = () => {
    reset(); // 상태 초기화
    router.push("../main");
  };

  return (
    <>
      <img className={styles.wagLogo} src="/wagwagLogo.svg" alt="WAGWAGLOGO" />
      <div className={styles.container}>
        <h1 className={styles.guideText}>
          waggle 님이 관심있는 주제를 알려주세요
        </h1>
        <h2 className={styles.helperText}>
          <span className={styles.highlight}>* </span>
          <span>내 취향에 맞는 와글을 더 편리하게 볼 수 있어요</span>
        </h2>
        <div className={styles.grid}>
          <div className={styles.categoryGrid}>
            {FIRST_BUTTONS.map((category) => (
              <CategorySelectButton
                key={category}
                isSelected={categories.includes(category)}
                onClick={() => handleSelect(category)}
                disabled={
                  categories.length >= MAX_SELECT &&
                  !categories.includes(category)
                }
                className={styles.categorySelectButton}
              >
                {category}
              </CategorySelectButton>
            ))}
          </div>
          <div className={styles.lastRow}>
            {LAST_BUTTONS.map((category) => (
              <CategorySelectButton
                key={category}
                isSelected={categories.includes(category)}
                onClick={() => handleSelect(category)}
                disabled={
                  categories.length >= MAX_SELECT &&
                  !categories.includes(category)
                }
                className={styles.categorySelectButton}
                wide={4.25}
              >
                {category}
              </CategorySelectButton>
            ))}
          </div>
        </div>
        <ActionButton
          onClick={handleComplete}
          disabled={categories.length === 0 || categories.length > MAX_SELECT}
        >
          완료
        </ActionButton>
        <div className={styles.stepContainer}>
          <OnboardingStepIndicator />
        </div>
      </div>
    </>
  );
}
