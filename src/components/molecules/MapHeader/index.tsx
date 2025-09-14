"use client";
import React from "react";

import { WagleSegmentToggle } from "@/components/atoms/Button/WagleSegmentToggle";
import SearchInput from "@/components/atoms/Input/SearchInput";

import styles from "./MapHeader.module.scss";

type MapHeaderProps = {
  mode: "popular" | "all";
  setMode: React.Dispatch<React.SetStateAction<"popular" | "all">>;
};
function MapHeader({ mode, setMode }: MapHeaderProps) {
  return (
    <div className={styles.mapHeader}>
      <WagleSegmentToggle
        mode={mode}
        onChange={setMode}
      />

      <SearchInput
        inputSize="large"
        shape="round"
        backgroundColor="white"
        iconColor="black"
        iconPosition="right"
        placeholder="지역명을 입력해주세요"
      />
    </div>
  );
}

export default MapHeader;
