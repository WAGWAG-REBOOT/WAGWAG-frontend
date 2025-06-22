import type { InputHTMLAttributes } from "react";

import styles from "./NicknameInputButton.module.scss";

export const NicknameInputButton = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder="닉네임을 입력해주세요"
      {...props}
    />
  );
};
