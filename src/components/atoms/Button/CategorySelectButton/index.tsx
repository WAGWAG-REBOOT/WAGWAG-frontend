import { ButtonProps } from "../Button.types";
import styles from "./CategorySelectButton.module.scss";

interface CategoryButtonProps extends ButtonProps {
  isSelected: boolean;
}

export const CategorySelectButton = ({
  children,
  onClick,
  disabled,
  isSelected,
}: CategoryButtonProps) => {
  //이렇게 가져다 쓰세요~
  return (
    <button
      className={`${styles.button} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
