import { useState, useRef, useEffect } from "react";
import SearchSVG from "@/assets/images/Search.svg";

import { SearchInputProps } from "../Input.types";

import styles from "./SearchInput.module.scss";

function SearchInput({
  inputSize,
  shape = "line",
  backgroundColor = "transparent",
  iconPosition = "none",
  // placeholderColor = "#888",
  iconColor = "gray",
  suggestions = [],
  onSuggestionClick,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showSuggestions = false,
  maxSuggestions = 5,
  value,
  onChange,
  ...rest
}: SearchInputProps) {
  const iconSize = inputSize === "small" ? 12 : 18;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>(value?.toString() || "");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // value prop이 변경될 때 inputValue 업데이트
  useEffect(() => {
    setInputValue(value?.toString() || "");
  }, [value]);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 입력값 변경 시 드롭다운 표시
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // 입력값이 있으면 추천어 표시 (한국어 추천완성)
    if (value.trim() && suggestions.length > 0) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }

    // 외부 onChange 핸들러 호출
    if (onChange) {
      onChange(e);
    }
  };

  // 추천어 클릭 처리
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setIsDropdownOpen(false);

    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    }

    // input의 value를 업데이트하기 위해 이벤트 시뮬레이션
    if (inputRef.current) {
      const event = new Event("input", { bubbles: true });
      Object.defineProperty(event, "target", { value: inputRef.current });
      inputRef.current.value = suggestion;
      inputRef.current.dispatchEvent(event);
    }
  };

  // 필터링된 추천어 (한국어 입력에 최적화)
  const filteredSuggestions = suggestions
    .filter((suggestion) => {
      const input = (inputValue || "").toLowerCase();
      const suggestionLower = suggestion.toLowerCase();

      // 정확한 일치
      if (suggestionLower === input) return true;

      // 시작 부분 일치 (한국어 입력에 유용)
      if (suggestionLower.startsWith(input)) return true;

      // 포함 관계
      if (suggestionLower.includes(input)) return true;

      return false;
    })
    .slice(0, maxSuggestions);

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
          ref={inputRef}
          className={styles.input}
          // style={{ "--placeholder-color": placeholderColor } as React.CSSProperties}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            if (inputValue.trim() && suggestions.length > 0) {
              setIsDropdownOpen(true);
            }
          }}
          {...rest}
        />
        {iconPosition === "right" && (
          <SearchSVG
            className={`${styles.icon} ${styles[iconColor]}`}
            width={iconSize}
            height={iconSize}
          />
        )}
      </div>

      {/* 추천어 드롭다운 */}
      {isDropdownOpen && filteredSuggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className={styles.dropdown}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className={styles.suggestionItem}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchInput;
