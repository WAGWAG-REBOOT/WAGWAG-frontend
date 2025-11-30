import React, { useState, useMemo } from "react";
import { useCombobox } from "downshift";
import Fuse from "fuse.js";
import styles from "./SearchInput.module.scss";
import SearchSVG from "src/assets/images/Search.svg";

interface AdvancedSearchInputProps {
  inputSize: "small" | "large";
  shape?: "line" | "square" | "round";
  backgroundColor?: "white" | "transparent" | "gray";
  iconPosition?: "left" | "right" | "none";
  placeholderColor?: string;
  iconColor?: "white" | "gray" | "black";
  placeholder?: string;
  suggestions: string[];
  onSuggestionClick?: (suggestion: string) => void;
  maxSuggestions?: number;
  // Fuse.js 옵션
  fuseOptions?: any;
}

function AdvancedSearchInput({
  inputSize,
  shape = "line",
  backgroundColor = "transparent",
  iconPosition = "none",
  placeholderColor = "#888",
  iconColor = "gray",
  placeholder = "검색어를 입력하세요...",
  suggestions,
  onSuggestionClick,
  maxSuggestions = 5,
  fuseOptions = {
    threshold: 0.3, // 유사도 임계값 (0-1, 낮을수록 정확)
    distance: 100, // 편집 거리
    includeScore: true,
    keys: [""], // 문자열 자체를 검색
  },
}: AdvancedSearchInputProps) {
  const iconSize = inputSize === "small" ? 12 : 18;

  // Fuse.js 인스턴스 생성
  const fuse = useMemo(() => new Fuse(suggestions, fuseOptions), [suggestions, fuseOptions]);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
    selectItem,
  } = useCombobox({
    items: suggestions,
    onInputValueChange: ({ inputValue }) => {
      // 입력값이 변경될 때마다 Fuse.js로 검색
      if (inputValue) {
        const results = fuse.search(inputValue);
        const filteredItems = results.slice(0, maxSuggestions).map((result) => result.item);

        // Downshift의 내부 상태 업데이트를 위해 강제로 메뉴 열기
        if (filteredItems.length > 0) {
          // 이 부분은 Downshift의 제한으로 인해 완벽하지 않을 수 있음
        }
      }
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem && onSuggestionClick) {
        onSuggestionClick(selectedItem);
      }
    },
  });

  // 현재 입력값에 대한 검색 결과
  const inputValue = getInputProps().value as string;
  const searchResults = useMemo(() => {
    if (!inputValue) return suggestions.slice(0, maxSuggestions);

    const results = fuse.search(inputValue);
    return results.slice(0, maxSuggestions).map((result) => result.item);
  }, [inputValue, fuse, maxSuggestions]);

  return (
    <div className={styles.searchContainer}>
      <div
        className={
          styles.wrapper +
          " " +
          styles[inputSize] +
          " " +
          styles[shape] +
          " " +
          styles[backgroundColor] +
          " " +
          styles[iconPosition]
        }
      >
        {iconPosition === "left" && (
          <SearchSVG
            className={`${styles.icon} ${styles[iconColor]}`}
            width={iconSize}
            height={iconSize}
          />
        )}

        <input
          {...getInputProps()}
          className={styles.input}
          style={{ "--placeholder-color": placeholderColor } as React.CSSProperties}
          placeholder={placeholder}
        />

        {iconPosition === "right" && (
          <SearchSVG
            className={`${styles.icon} ${styles[iconColor]}`}
            width={iconSize}
            height={iconSize}
          />
        )}
      </div>

      {/* 검색 결과 드롭다운 */}
      <ul
        {...getMenuProps()}
        className={styles.dropdown}
        style={{ display: isOpen && searchResults.length > 0 ? "block" : "none" }}
      >
        {searchResults.map((item, index) => (
          <li
            key={`${item}${index}`}
            {...getItemProps({ item, index })}
            className={`${styles.suggestionItem} ${
              highlightedIndex === index ? styles.highlighted : ""
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdvancedSearchInput;
