import React from "react";
import styles from "./ArrowButton.module.scss";
import { ButtonProps } from "../Button.types";

interface ArrowButtonProps extends Omit<ButtonProps, "children"> {
  arrowType?: "default" | "line";
  direction: "left" | "right" | "up" | "down";
  children?: React.ReactNode;
}

// const getArrowRotation = (direction: string) => {
//   switch (direction) {
//     case "up":
//       return "rotate(-90deg)";
//     case "down":
//       return "rotate(90deg)";
//     case "left":
//       return "rotate(180deg)";
//     case "right":
//     default:
//       return "none";
//   }
// };

const ArrowButton: React.FC<ArrowButtonProps> = ({
  arrowType = "default",
  direction,
  disabled = false,
  onClick,
  ...rest
}) => {
  return (
    <button
      className={styles.arrowButton + " " + styles[arrowType]}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      <img
        src="/Arrow.svg"
        alt={`${direction} arrow`}
        className={styles.arrowIcon + " " + styles[`arrow-${direction}`]}
      />
    </button>
  );
};

export default ArrowButton;
