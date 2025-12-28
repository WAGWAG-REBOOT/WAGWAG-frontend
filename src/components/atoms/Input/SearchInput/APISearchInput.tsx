import { useCombobox } from "downshift";
// import Fuse from "fuse.js"; // TODO: Fuse.js 사용 시 주석 해제
import React, { useEffect, useState } from "react";
import SearchSVG from "src/assets/images/Search.svg";
import styles from "./SearchInput.module.scss";

interface APISearchInputProps {
  inputSize: "small" | "large";
  shape?: "line" | "square" | "round";
  backgroundColor?: "white" | "transparent" | "gray";
  iconPosition?: "left" | "right" | "none";
  placeholderColor?: string;
  iconColor?: "white" | "gray" | "black";
  placeholder?: string;
  // API 관련 props
  apiEndpoint?: string;
  apiKey?: string;
  searchType?: "dictionary" | "thesaurus" | "synonyms" | "custom";
  maxSuggestions?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fuseOptions?: any;
}

// 실제 API 호출 함수들
const apiService = {
  // 한국어 사전 API (국립국어원)
  async getKoreanDictionary(query: string): Promise<string[]> {
    try {
      // 실제 API 호출 시뮬레이션
      const response = await fetch(`https://api.example.com/korean-dict?q=${query}`);
      const data = await response.json();
      return data.suggestions || [];
    } catch (error) {
      console.error("사전 API 호출 실패:", error);
      return [];
    }
  },

  // 영어 사전 API (Merriam-Webster)
  async getEnglishDictionary(query: string): Promise<string[]> {
    try {
      // 실제 API 호출 시뮬레이션
      const response = await fetch(`https://api.example.com/english-dict?q=${query}`);
      const data = await response.json();
      return data.suggestions || [];
    } catch (error) {
      console.error("영어 사전 API 호출 실패:", error);
      return [];
    }
  },

  // 동의어 API
  async getSynonyms(word: string): Promise<string[]> {
    try {
      // 실제 API 호출 시뮬레이션
      const response = await fetch(`https://api.example.com/synonyms?word=${word}`);
      const data = await response.json();
      return data.synonyms || [];
    } catch (error) {
      console.error("동의어 API 호출 실패:", error);
      return [];
    }
  },

  // 사용자 정의 API
  async getCustomSuggestions(endpoint: string, query: string): Promise<string[]> {
    try {
      const response = await fetch(`${endpoint}?q=${query}`);
      const data = await response.json();
      return data.suggestions || [];
    } catch (error) {
      console.error("사용자 정의 API 호출 실패:", error);
      return [];
    }
  },
};

function APISearchInput({
  inputSize,
  shape = "line",
  backgroundColor = "transparent",
  iconPosition = "none",
  placeholderColor = "#888",
  iconColor = "gray",
  placeholder = "검색어를 입력하세요...",
  apiEndpoint,
  // apiKey, // TODO: API 키 사용 시 주석 해제
  searchType = "dictionary",
  maxSuggestions = 5,
  // fuseOptions = { // TODO: Fuse.js 사용 시 주석 해제
  //   threshold: 0.3,
  //   distance: 100,
  //   includeScore: true,
  //   keys: [""],
  // },
}: APISearchInputProps) {
  const iconSize = inputSize === "small" ? 12 : 18;
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // API에서 검색어 가져오기
  const fetchSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    try {
      let apiSuggestions: string[] = [];

      switch (searchType) {
        case "dictionary":
          // 한국어/영어 사전 API 호출
          if (/[가-힣]/.test(query)) {
            apiSuggestions = await apiService.getKoreanDictionary(query);
          } else {
            apiSuggestions = await apiService.getEnglishDictionary(query);
          }
          break;

        case "thesaurus":
          // 유의어 사전 API 호출
          apiSuggestions = await apiService.getSynonyms(query);
          break;

        case "synonyms":
          // 동의어 API 호출
          apiSuggestions = await apiService.getSynonyms(query);
          break;

        case "custom":
          // 사용자 정의 API 호출
          if (apiEndpoint) {
            apiSuggestions = await apiService.getCustomSuggestions(apiEndpoint, query);
          }
          break;

        default:
          apiSuggestions = [];
      }

      setSuggestions(apiSuggestions);
    } catch (error) {
      console.error("검색어 가져오기 실패:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 디바운스된 API 호출
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValue.trim()) {
        fetchSuggestions(inputValue);
      } else {
        setSuggestions([]);
      }
    }, 300); // 300ms 디바운스

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, searchType, apiEndpoint]);

  // Fuse.js 인스턴스 생성 (향후 사용 예정)
  // const fuse = useMemo(() => new Fuse(suggestions, fuseOptions), [suggestions, fuseOptions]);

  const { isOpen, getMenuProps, getInputProps, highlightedIndex, getItemProps } = useCombobox({
    items: suggestions,
    onInputValueChange: ({ inputValue: newValue }) => {
      setInputValue(newValue || "");
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        console.log("선택된 검색어:", selectedItem);
        setInputValue(selectedItem);
      }
    },
  });

  // 검색 결과 (API에서 가져온 결과를 그대로 사용)
  const searchResults = suggestions.slice(0, maxSuggestions);

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
          placeholder={isLoading ? "API에서 검색 중..." : placeholder}
          disabled={isLoading}
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

      {/* 로딩 상태 표시 */}
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            padding: "1rem",
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "0 0 0.5rem 0.5rem",
            textAlign: "center",
            color: "#666",
          }}
        >
          API에서 검색 중...
        </div>
      )}
    </div>
  );
}

export default APISearchInput;
