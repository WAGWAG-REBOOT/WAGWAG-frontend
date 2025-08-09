import React from "react";

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize: "small" | "large";
  shape?: "line" | "square" | "round";
  backgroundColor?: "white" | "transparent" | "gray";
  iconPosition?: "left" | "right" | "none";
  placeholderColor?: string;
  iconColor?: "white" | "gray" | "black";
  // 추천어 드롭다운 관련 props
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
  showSuggestions?: boolean;
  maxSuggestions?: number;
}
