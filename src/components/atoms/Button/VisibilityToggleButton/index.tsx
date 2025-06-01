import styles from "./VisibilityToggleButton.module.scss";

interface VisibilityToggleButtonProps {
  isPublic: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const VisibilityToggleButton = ({
  isPublic,
  onClick,
  disabled,
}: VisibilityToggleButtonProps) => {
  const iconSrc = isPublic ? "/unlockIcon.svg" : "/lockIcon.svg";

  //이렇게 가져다 쓰세요~
  // const [isPublic, setIsPublic] = useState(true);

  // const handleToggle = () => {
  //   setIsPublic((prev) => !prev);
  // };
  // <VisibilityToggleButton isPublic={isPublic} onClick={handleToggle} />;

  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      <img
        className={styles.icon}
        src={iconSrc}
        alt={isPublic ? "전체공개" : "비공개"}
      />
      <span className={styles.text}>{isPublic ? "전체공개" : "비공개"}</span>
    </button>
  );
}