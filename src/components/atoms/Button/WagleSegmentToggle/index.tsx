import styles from "./WagleSegmentToggle.module.scss";

interface WagleSegmentToggleProps {
  mode: "popular" | "all";
  onChange: (mode: "popular" | "all") => void;
}

export const WagleSegmentToggle = ({
  mode,
  onChange,
}: WagleSegmentToggleProps) => {
  {
    /* 이렇게 사용하세요~ */
    /* const [mode, setMode] = useState<"popular" | "all">("popular")
      <WagleSegmentToggle mode={mode} onChange={setMode} /> */
  }
  return (
    <div className={styles.toggleWrapper}>
      <button
        className={`${styles.button} ${mode === "popular" ? styles.active : ""}`}
        onClick={() => onChange("popular")}
      >
        지역 별 인기 와글
      </button>
      <button
        className={`${styles.button} ${mode === "all" ? styles.active : ""}`}
        onClick={() => onChange("all")}
      >
        지역 별 전체 와글
      </button>
    </div>
  );
}
