import React from "react";

interface HighlightTextProps {
  color: string;
  children: React.ReactNode;
}
export const HighlightText = ({ color, children }: HighlightTextProps) => {
  return <span style={{ color }}>{children}</span>;
};
