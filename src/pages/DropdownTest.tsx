import { useState } from "react";
import { Dropdown, DropdownOption } from "../components/atoms";

const DropdownTest = () => {
  const [selectedYear, setSelectedYear] = useState<number | undefined>();
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  // const [selectedColor, setSelectedColor] = useState<string | undefined>(); // TODO: 색상 선택 기능 사용 시 주석 해제

  // 연도 옵션
  const yearOptions: DropdownOption<number>[] = [
    { value: 2025, label: "2025" },
    { value: 2024, label: "2024" },
    { value: 2023, label: "2023" },
    { value: 2022, label: "2022" },
    { value: 2021, label: "2021" },
    { value: 2020, label: "2020" },
  ];

  // 언어 옵션
  const languageOptions: DropdownOption<string>[] = [
    { value: "ko", label: "한국어" },
    { value: "en", label: "English" },
    { value: "ja", label: "日本語" },
    { value: "zh", label: "中文" },
  ];

  // 카테고리 옵션
  const categoryOptions: DropdownOption<string>[] = [
    { value: "all", label: "전체" },
    { value: "nature", label: "자연/계절" },
    { value: "food", label: "음식" },
    { value: "place", label: "장소" },
    { value: "emotion", label: "감정" },
  ];

  // 색상 옵션
  const colorOptions: DropdownOption<string>[] = [
    { value: "red", label: "빨강" },
    { value: "blue", label: "파랑" },
    { value: "green", label: "초록" },
    { value: "yellow", label: "노랑" },
    { value: "purple", label: "보라" },
  ];

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#1a1a1a",
        minHeight: "100vh",
        color: "#ffffff",
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "30px", fontSize: "24px", fontWeight: "bold" }}>
        Dropdown 컴포넌트 테스트
      </h1>

      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "600" }}>
          1. 기본 드롭다운 (연도 선택)
        </h2>
        <div style={{ marginBottom: "20px" }}>
          <Dropdown<number>
            options={yearOptions}
            selectedValue={selectedYear}
            onSelect={(year) => {
              setSelectedYear(year);
              console.log("선택된 연도:", year);
            }}
            placeholder="연도 선택"
          />
        </div>
        <p style={{ fontSize: "14px", color: "#cccccc", marginBottom: "10px" }}>• 타입: number</p>
        <p style={{ fontSize: "14px", color: "#cccccc" }}>
          • 현재 선택된 값: {selectedYear || "없음"}
        </p>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "600" }}>
          2. 문자열 드롭다운 (언어 선택)
        </h2>
        <div style={{ marginBottom: "20px" }}>
          <Dropdown<string>
            options={languageOptions}
            selectedValue={selectedLanguage}
            onSelect={(lang) => {
              setSelectedLanguage(lang);
              console.log("선택된 언어:", lang);
            }}
            placeholder="언어 선택"
          />
        </div>
        <p style={{ fontSize: "14px", color: "#cccccc", marginBottom: "10px" }}>• 타입: string</p>
        <p style={{ fontSize: "14px", color: "#cccccc" }}>
          • 현재 선택된 값: {selectedLanguage || "없음"}
        </p>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "600" }}>
          3. 기본값이 있는 드롭다운
        </h2>
        <div style={{ marginBottom: "20px" }}>
          <Dropdown<string>
            options={categoryOptions}
            selectedValue={selectedCategory || "all"}
            onSelect={(category) => {
              setSelectedCategory(category);
              console.log("선택된 카테고리:", category);
            }}
            placeholder="카테고리 선택"
          />
        </div>
        <p style={{ fontSize: "14px", color: "#cccccc", marginBottom: "10px" }}>
          • 기본 선택값: "전체"
        </p>
        <p style={{ fontSize: "14px", color: "#cccccc" }}>
          • 현재 선택된 값: {selectedCategory || "all"}
        </p>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "600" }}>
          4. 비활성화된 드롭다운
        </h2>
        <div style={{ marginBottom: "20px" }}>
          <Dropdown<string>
            options={colorOptions}
            placeholder="비활성화됨"
            isDisabled={true}
          />
        </div>
        <p style={{ fontSize: "14px", color: "#cccccc" }}>• isDisabled prop으로 비활성화</p>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "600" }}>
          5. 여러 개 드롭다운 (비교용)
        </h2>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: "12px", color: "#999", marginBottom: "8px" }}>드롭다운 1</p>
            <Dropdown<number>
              options={yearOptions}
              placeholder="연도"
            />
          </div>
          <div>
            <p style={{ fontSize: "12px", color: "#999", marginBottom: "8px" }}>드롭다운 2</p>
            <Dropdown<string>
              options={languageOptions}
              placeholder="언어"
            />
          </div>
          <div>
            <p style={{ fontSize: "12px", color: "#999", marginBottom: "8px" }}>드롭다운 3</p>
            <Dropdown<string>
              options={categoryOptions}
              placeholder="카테고리"
            />
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "600" }}>
          6. 스크롤이 있는 긴 목록
        </h2>
        <div style={{ marginBottom: "20px" }}>
          <Dropdown<number>
            options={Array.from({ length: 20 }, (_, i) => ({
              value: 2025 - i,
              label: `${2025 - i}년`,
            }))}
            placeholder="연도 선택 (긴 목록)"
          />
        </div>
        <p style={{ fontSize: "14px", color: "#cccccc" }}>• 최대 높이 300px, 스크롤 지원</p>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "600" }}>
          7. 커스텀 크기
        </h2>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <div style={{ width: "150px" }}>
            <p style={{ fontSize: "12px", color: "#999", marginBottom: "8px" }}>작은 크기</p>
            <Dropdown<string>
              options={languageOptions}
              placeholder="언어"
            />
          </div>
          <div style={{ width: "200px" }}>
            <p style={{ fontSize: "12px", color: "#999", marginBottom: "8px" }}>기본 크기</p>
            <Dropdown<string>
              options={languageOptions}
              placeholder="언어"
            />
          </div>
          <div style={{ width: "300px" }}>
            <p style={{ fontSize: "12px", color: "#999", marginBottom: "8px" }}>큰 크기</p>
            <Dropdown<string>
              options={languageOptions}
              placeholder="언어"
            />
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#2a2a2a",
          padding: "20px",
          borderRadius: "8px",
          marginTop: "40px",
        }}
      >
        <h3 style={{ marginBottom: "15px", fontSize: "16px", fontWeight: "600" }}>테스트 가이드</h3>
        <ul style={{ fontSize: "14px", color: "#cccccc", lineHeight: "1.6" }}>
          <li>각 드롭다운을 클릭해서 열고 닫아보세요</li>
          <li>옵션을 선택해보세요</li>
          <li>드롭다운 외부를 클릭해서 자동으로 닫히는지 확인해보세요</li>
          <li>호버 효과와 선택된 상태 스타일을 확인해보세요</li>
          <li>여러 드롭다운을 동시에 열어보세요 (하나만 열려야 합니다)</li>
          <li>반응형 동작을 위해 브라우저 창 크기를 조절해보세요</li>
        </ul>
      </div>

      <div
        style={{
          backgroundColor: "#2a2a2a",
          padding: "20px",
          borderRadius: "8px",
          marginTop: "20px",
        }}
      >
        <h3 style={{ marginBottom: "15px", fontSize: "16px", fontWeight: "600" }}>사용 예시</h3>
        <pre
          style={{
            backgroundColor: "#1a1a1a",
            padding: "15px",
            borderRadius: "4px",
            fontSize: "12px",
            overflow: "auto",
          }}
        >
          {`import { Dropdown, DropdownOption } from "@/components/atoms";

// 연도 선택 드롭다운
const yearOptions: DropdownOption<number>[] = [
  { value: 2025, label: "2025" },
  { value: 2024, label: "2024" },
];

<Dropdown<number>
  options={yearOptions}
  selectedValue={selectedYear}
  onSelect={(year) => setSelectedYear(year)}
  placeholder="연도 선택"
/>

// 언어 선택 드롭다운
const languageOptions: DropdownOption<string>[] = [
  { value: "ko", label: "한국어" },
  { value: "en", label: "English" },
];

<Dropdown<string>
  options={languageOptions}
  selectedValue={selectedLanguage}
  onSelect={(lang) => setSelectedLanguage(lang)}
  placeholder="언어 선택"
  isDisabled={false}
/>`}
        </pre>
      </div>
    </div>
  );
};

export default DropdownTest;
