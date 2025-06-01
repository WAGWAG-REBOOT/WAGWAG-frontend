import { ButtonProps } from "../Button.types";
import styles from "./CategoryButton.module.scss";

interface CategoryButtonProps extends ButtonProps {
  isSelected: boolean;
}

export const CategoryButton = ({
  children,
  onClick,
  disabled,
  isSelected,
}: CategoryButtonProps) => {
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
