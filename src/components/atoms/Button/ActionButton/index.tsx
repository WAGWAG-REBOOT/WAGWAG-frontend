import { ButtonProps } from "../Button.types";
import styles from "./ActionButton.module.scss";

interface ActionButtonProps extends ButtonProps {
  className?: string;
}

export const ActionButton = ({
  children,
  onClick,
  disabled,
  className,
}: ActionButtonProps) => {
  return (
    <button
      className={`${styles.button} ${className ?? ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
