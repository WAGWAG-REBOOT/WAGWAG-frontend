import { ButtonProps } from "../Button.types";
import styles from "./LoginButton.module.scss";

interface LoginButtonProps extends Omit<ButtonProps, "onClick"> {
  provider: "google" | "naver";
  onClick: (provider: "google" | "naver") => void;
}

export const LoginButton = ({
  children,
  provider,
  onClick,
  disabled,
}: LoginButtonProps) => {
  const logoSrc = provider === "google" ? "/googleLogo.svg" : "/naverLogo.svg";

  return (
    <button
      className={styles.button}
      onClick={() => onClick(provider)}
      disabled={disabled}
    >
      <img src={logoSrc} alt={`${provider} logo`} className={styles.icon} />
      <span className={styles.text}>{children}</span>
    </button>
  );
};
