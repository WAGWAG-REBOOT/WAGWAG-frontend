import styles from "./NicknameInputButton.module.scss";
import type { InputHTMLAttributes } from "react";

interface NicknameInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const NicknameInputButton = ({ ...props }: NicknameInputProps) => {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder="닉네임을 입력해주세요"
      {...props}
    />
  );
};
