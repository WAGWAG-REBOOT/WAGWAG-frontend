import React, { useState } from "react";
import SearchInput from "../components/atoms/Input/SearchInput";
import AdvancedSearchInput from "../components/atoms/Input/SearchInput/AdvancedSearchInput";
import APISearchInput from "../components/atoms/Input/SearchInput/APISearchInput";
import KoreanSearchInput from "../components/atoms/Input/SearchInput/KoreanSearchInput";
import JSONSearchInput from "../components/atoms/Input/SearchInput/JSONSearchInput";

const SearchInputTest = () => {
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>("");
  const [advancedSelectedSuggestion, setAdvancedSelectedSuggestion] = useState<string>("");
  const [apiSelectedSuggestion, setApiSelectedSuggestion] = useState<string>("");
  const [koreanSelectedSuggestion, setKoreanSelectedSuggestion] = useState<string>("");
  const [jsonSelectedSuggestion, setJsonSelectedSuggestion] = useState<string>("");

  // 하드데이터 예시들
  const techSuggestions = ["React", "TypeScript", "JavaScript", "Node.js", "Next.js"];

  const handleSuggestionClick = (suggestion: string) => {
    setSelectedSuggestion(suggestion);
    console.log("기본 SearchInput - 선택된 추천어:", suggestion);
  };

  const handleAdvancedSuggestionClick = (suggestion: string) => {
    setAdvancedSelectedSuggestion(suggestion);
    console.log("AdvancedSearchInput - 선택된 추천어:", suggestion);
  };

  const handleAPISuggestionClick = (suggestion: string) => {
    setApiSelectedSuggestion(suggestion);
    console.log("APISearchInput - 선택된 추천어:", suggestion);
  };

  const handleKoreanSuggestionClick = (suggestion: string) => {
    setKoreanSelectedSuggestion(suggestion);
    console.log("KoreanSearchInput - 선택된 추천어:", suggestion);
  };

  const handleJSONSuggestionClick = (suggestion: string) => {
    setJsonSelectedSuggestion(suggestion);
    console.log("JSONSearchInput - 선택된 추천어:", suggestion);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>🔍 검색 컴포넌트 비교 테스트</h1>

      <div style={{ marginBottom: "3rem" }}>
        <h2>📝 1. 하드데이터 방식 (기본)</h2>
        <p style={{ color: "#666", marginBottom: "1rem" }}>정적으로 정의된 배열을 사용하는 방식</p>
        <SearchInput
          inputSize="large"
          shape="round"
          backgroundColor="white"
          iconPosition="left"
          placeholder="하드데이터 검색 (기본)..."
          suggestions={techSuggestions}
          onSuggestionClick={handleSuggestionClick}
          maxSuggestions={5}
        />
        {selectedSuggestion && (
          <div
            style={{
              marginTop: "1rem",
              padding: "0.5rem",
              backgroundColor: "#e3f2fd",
              borderRadius: "0.5rem",
              fontSize: "0.9rem",
            }}
          >
            <strong>선택된 추천어:</strong> {selectedSuggestion}
          </div>
        )}
      </div>

      <div style={{ marginBottom: "3rem" }}>
        <h2>🚀 2. 라이브러리 + 하드데이터 방식</h2>
        <p style={{ color: "#666", marginBottom: "1rem" }}>
          Downshift + Fuse.js를 사용한 고급 버전
        </p>
        <AdvancedSearchInput
          inputSize="large"
          shape="round"
          backgroundColor="white"
          iconPosition="left"
          placeholder="라이브러리 + 하드데이터 검색..."
          suggestions={techSuggestions}
          onSuggestionClick={handleAdvancedSuggestionClick}
          maxSuggestions={5}
        />
        {advancedSelectedSuggestion && (
          <div
            style={{
              marginTop: "1rem",
              padding: "0.5rem",
              backgroundColor: "#f3e5f5",
              borderRadius: "0.5rem",
              fontSize: "0.9rem",
            }}
          >
            <strong>선택된 추천어:</strong> {advancedSelectedSuggestion}
          </div>
        )}
      </div>

      <div style={{ marginBottom: "3rem" }}>
        <h2>🌐 3. API 연동 방식</h2>
        <p style={{ color: "#666", marginBottom: "1rem" }}>
          실제 외부 API를 호출하여 검색어를 가져오는 방식
        </p>

        <div style={{ marginBottom: "2rem" }}>
          <h3>📚 사전 API</h3>
          <APISearchInput
            inputSize="small"
            shape="square"
            backgroundColor="white"
            iconPosition="left"
            placeholder="사전 API 검색..."
            searchType="dictionary"
            maxSuggestions={5}
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3>🔄 동의어 API</h3>
          <APISearchInput
            inputSize="small"
            shape="square"
            backgroundColor="white"
            iconPosition="left"
            placeholder="동의어 API 검색..."
            searchType="synonyms"
            maxSuggestions={5}
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3>💻 사용자 정의 API</h3>
          <APISearchInput
            inputSize="small"
            shape="square"
            backgroundColor="white"
            iconPosition="left"
            placeholder="사용자 정의 API 검색..."
            searchType="custom"
            apiEndpoint="https://api.example.com/custom"
            maxSuggestions={5}
          />
        </div>

        {apiSelectedSuggestion && (
          <div
            style={{
              marginTop: "1rem",
              padding: "0.5rem",
              backgroundColor: "#fff3e0",
              borderRadius: "0.5rem",
              fontSize: "0.9rem",
            }}
          >
            <strong>선택된 추천어:</strong> {apiSelectedSuggestion}
          </div>
        )}
      </div>

      <div style={{ marginBottom: "3rem" }}>
        <h2>📄 4. JSON 파일 기반 검색</h2>
        <p style={{ color: "#666", marginBottom: "1rem" }}>
          서버에 저장된 JSON 파일에서 데이터를 로드하여 검색하는 방식
        </p>

        <div style={{ marginBottom: "2rem" }}>
          <h3>🌿 자연/계절 관련</h3>
          <JSONSearchInput
            inputSize="small"
            shape="square"
            backgroundColor="white"
            iconPosition="left"
            placeholder="자연/계절 관련 단어 검색 (JSON)..."
            jsonPath="/data/korean-words.json"
            searchCategory="nature"
            onSuggestionClick={handleJSONSuggestionClick}
            maxSuggestions={5}
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3>🍜 음식 관련</h3>
          <JSONSearchInput
            inputSize="small"
            shape="square"
            backgroundColor="white"
            iconPosition="left"
            placeholder="음식 관련 단어 검색 (JSON)..."
            jsonPath="/data/korean-words.json"
            searchCategory="food"
            onSuggestionClick={handleJSONSuggestionClick}
            maxSuggestions={5}
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3>🏙️ 장소 관련</h3>
          <JSONSearchInput
            inputSize="small"
            shape="square"
            backgroundColor="white"
            iconPosition="left"
            placeholder="장소 관련 단어 검색 (JSON)..."
            jsonPath="/data/korean-words.json"
            searchCategory="place"
            onSuggestionClick={handleJSONSuggestionClick}
            maxSuggestions={5}
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3>💝 감정 관련</h3>
          <JSONSearchInput
            inputSize="small"
            shape="square"
            backgroundColor="white"
            iconPosition="left"
            placeholder="감정 관련 단어 검색 (JSON)..."
            jsonPath="/data/korean-words.json"
            searchCategory="emotion"
            onSuggestionClick={handleJSONSuggestionClick}
            maxSuggestions={5}
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3>🌍 전체 카테고리</h3>
          <JSONSearchInput
            inputSize="small"
            shape="square"
            backgroundColor="white"
            iconPosition="left"
            placeholder="모든 한국어 단어 검색 (JSON)..."
            jsonPath="/data/korean-words.json"
            searchCategory="all"
            onSuggestionClick={handleJSONSuggestionClick}
            maxSuggestions={5}
          />
        </div>

        {jsonSelectedSuggestion && (
          <div
            style={{
              marginTop: "1rem",
              padding: "0.5rem",
              backgroundColor: "#e8f5e8",
              borderRadius: "0.5rem",
              fontSize: "0.9rem",
            }}
          >
            <strong>선택된 추천어:</strong> {jsonSelectedSuggestion}
          </div>
        )}
      </div>

      <div style={{ marginBottom: "3rem" }}>
        <h2>🇰🇷 5. 한국어 전용 검색 (추천)</h2>
        <p style={{ color: "#666", marginBottom: "1rem" }}>
          한국어에 특화된 검색 컴포넌트 - "계곡", "여름" 등 모든 한국어 단어 지원
        </p>

        <div style={{ marginBottom: "2rem" }}>
          <h3>🌿 자연/계절 관련</h3>
          <KoreanSearchInput
            inputSize="small"
            shape="square"
            backgroundColor="white"
            iconPosition="left"
            placeholder="자연/계절 관련 단어 검색 (계곡, 여름, 봄 등)..."
            searchCategory="nature"
            onSuggestionClick={handleKoreanSuggestionClick}
            maxSuggestions={5}
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3>🍜 음식 관련</h3>
          <KoreanSearchInput
            inputSize="small"
            shape="square"
            backgroundColor="white"
            iconPosition="left"
            placeholder="음식 관련 단어 검색 (김치, 커피, 떡볶이 등)..."
            searchCategory="food"
            onSuggestionClick={handleKoreanSuggestionClick}
            maxSuggestions={5}
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3>🏙️ 장소 관련</h3>
          <KoreanSearchInput
            inputSize="small"
            shape="square"
            backgroundColor="white"
            iconPosition="left"
            placeholder="장소 관련 단어 검색 (서울, 집, 학교 등)..."
            searchCategory="place"
            onSuggestionClick={handleKoreanSuggestionClick}
            maxSuggestions={5}
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3>💝 감정 관련</h3>
          <KoreanSearchInput
            inputSize="small"
            shape="square"
            backgroundColor="white"
            iconPosition="left"
            placeholder="감정 관련 단어 검색 (기쁨, 슬픔, 사랑 등)..."
            searchCategory="emotion"
            onSuggestionClick={handleKoreanSuggestionClick}
            maxSuggestions={5}
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3>🌍 전체 카테고리</h3>
          <KoreanSearchInput
            inputSize="small"
            shape="square"
            backgroundColor="white"
            iconPosition="left"
            placeholder="모든 한국어 단어 검색..."
            searchCategory="all"
            onSuggestionClick={handleKoreanSuggestionClick}
            maxSuggestions={5}
          />
        </div>

        {koreanSelectedSuggestion && (
          <div
            style={{
              marginTop: "1rem",
              padding: "0.5rem",
              backgroundColor: "#e8f5e8",
              borderRadius: "0.5rem",
              fontSize: "0.9rem",
            }}
          >
            <strong>선택된 추천어:</strong> {koreanSelectedSuggestion}
          </div>
        )}
      </div>

      <div style={{ marginBottom: "3rem" }}>
        <h2>🌐 6. 실제 API 연동 방식</h2>
        <p style={{ color: "#666", marginBottom: "1rem" }}>
          실제 외부 API를 호출하여 검색어를 가져오는 방식 (한국어 제한적)
        </p>

        <div style={{ marginBottom: "2rem" }}>
          <h3>📚 영어 사전 API</h3>
          <APISearchInput
            inputSize="small"
            shape="square"
            backgroundColor="white"
            iconPosition="left"
            placeholder="영어 단어 검색 (Dictionary API)..."
            searchType="dictionary"
            maxSuggestions={5}
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3>🔄 동의어 API</h3>
          <APISearchInput
            inputSize="small"
            shape="square"
            backgroundColor="white"
            iconPosition="left"
            placeholder="동의어 검색 (Datamuse API)..."
            searchType="synonyms"
            maxSuggestions={5}
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3>💻 사용자 정의 API</h3>
          <APISearchInput
            inputSize="small"
            shape="square"
            backgroundColor="white"
            iconPosition="left"
            placeholder="사용자 정의 API 검색..."
            searchType="custom"
            apiEndpoint="https://api.github.com/search/repositories"
            maxSuggestions={5}
          />
        </div>

        {apiSelectedSuggestion && (
          <div
            style={{
              marginTop: "1rem",
              padding: "0.5rem",
              backgroundColor: "#e8f5e8",
              borderRadius: "0.5rem",
              fontSize: "0.9rem",
            }}
          >
            <strong>선택된 추천어:</strong> {apiSelectedSuggestion}
          </div>
        )}
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h2>📊 한국어 검색 지원 현황 비교 (JSON 방식 추가)</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <th style={{ padding: "0.75rem", border: "1px solid #ddd", textAlign: "left" }}>
                검색 방식
              </th>
              <th style={{ padding: "0.75rem", border: "1px solid #ddd", textAlign: "left" }}>
                "계곡" 검색
              </th>
              <th style={{ padding: "0.75rem", border: "1px solid #ddd", textAlign: "left" }}>
                "여름" 검색
              </th>
              <th style={{ padding: "0.75rem", border: "1px solid #ddd", textAlign: "left" }}>
                한국어 지원
              </th>
              <th style={{ padding: "0.75rem", border: "1px solid #ddd", textAlign: "left" }}>
                추천도
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>하드데이터</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>❌ 제한적</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>❌ 제한적</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>기본</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>⭐</td>
            </tr>
            <tr>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>동적 데이터</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>✅ 지원</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>✅ 지원</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>좋음</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>⭐⭐⭐</td>
            </tr>
            <tr>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>한국어 전용</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>✅ 완벽 지원</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>✅ 완벽 지원</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>완벽</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>⭐⭐⭐⭐⭐</td>
            </tr>
            <tr>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>JSON 파일</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>✅ 완벽 지원</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>✅ 완벽 지원</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>완벽</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>⭐⭐⭐⭐</td>
            </tr>
            <tr>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>API 연동</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>❌ 지원 안됨</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>❌ 지원 안됨</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>제한적</td>
              <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>⭐</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3>💡 한국어 검색 권장사항:</h3>
        <ul>
          <li>
            <strong>한국어 전용 컴포넌트</strong>: "계곡", "여름" 등 모든 한국어 단어 완벽 지원
          </li>
          <li>
            <strong>JSON 파일 방식</strong>: 서버에 JSON 파일 저장하여 유연한 데이터 관리
          </li>
          <li>
            <strong>동적 데이터 방식</strong>: 카테고리별 한국어 검색어 제공
          </li>
          <li>
            <strong>API 연동</strong>: 영어 단어만 지원, 한국어는 제한적
          </li>
          <li>
            <strong>하드데이터</strong>: 수동으로 한국어 단어 추가 필요
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SearchInputTest;
