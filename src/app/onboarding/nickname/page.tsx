"use client";
import { useRouter } from "next/navigation";
import styles from "./Nickname.module.scss";
import { NicknameInputButton } from "@/components/atoms/Button/NicknameInputButton";
import { ActionButton } from "@/components/atoms/Button/ActionButton";
import OnboardingStepIndicator from "@/components/atoms/OnboardingStep/StepIndicator";

export default function NicknamePage() {
  const router = useRouter();
  return (
    <>
      <div className={styles.container}>
        <NicknameInputButton></NicknameInputButton>
        <ActionButton onClick={() => router.push("./location")}>
          확인
        </ActionButton>
        <div className={styles.stepcontainer}>
          <OnboardingStepIndicator />
        </div>
      </div>
    </>
  );
}
