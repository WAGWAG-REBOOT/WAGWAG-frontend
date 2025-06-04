import { ButtonProps } from "../Button.types";
import styles from "./CategorySelectButton.module.scss";

interface CategoryButtonProps extends ButtonProps {
  isSelected: boolean;
  wide?: boolean | number;
}

export const CategorySelectButton = ({
  children,
  onClick,
  disabled,
  isSelected,
  wide = false,
}: CategoryButtonProps) => {
  //이렇게 가져다 쓰세요~
  // wide가 숫자면 padding을 동적으로 계산
  const dynamicStyle =
    typeof wide === "number"
      ? { paddingLeft: `${wide}rem`, paddingRight: `${wide}rem` }
      : {};

  return (
    <button
      className={`${styles.button} ${isSelected ? styles.selected : ""} ${wide === true ? styles.wide : ""}`}
      style={dynamicStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
