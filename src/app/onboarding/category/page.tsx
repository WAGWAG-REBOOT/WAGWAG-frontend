"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./Category.module.scss";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import { CategorySelectButton } from "@/components/atoms/Button/CategorySelectButton";
import OnboardingStepIndicator from "@/components/atoms/OnboardingStep/StepIndicator";

export default function CategoryPage() {
  const [selected, setSelected] = useState(false);
  const router = useRouter();
  return (
    <>
      <div className={styles.container}>
        <CategorySelectButton
          isSelected={selected}
          onClick={() => setSelected((prev) => !prev)}
        >
          운동
        </CategorySelectButton>{" "}
        <ActionButton onClick={() => router.push("../main")}>확인</ActionButton>
        <div className={styles.stepcontainer}>
          <OnboardingStepIndicator />
        </div>
      </div>
    </>
  );
}
