import { usePathname } from "next/navigation";
import styles from "./StepIndicator.module.scss";

const steps = ["nickname", "location", "category"];

export default function OnboardingStepIndicator() {
  const pathname = usePathname();
  const activeIndex = steps.findIndex((step) => pathname!.includes(step));
  return (
    <div className={styles.stepIndicator}>
      {steps.map((_, idx) => (
        <div
          key={idx}
          className={`${styles.dot} ${idx === activeIndex ? styles.active : ""}`}
        />
      ))}
    </div>
  );
}
