import React from "react";

// import ArrowButton from "../components/atoms/Button/ArrowButton";
import { PositionButton } from "../components/atoms/Button/PositionButton";
import TagButton from "../components/atoms/Button/TagButton";
import SearchInput from "../components/atoms/Input/SearchInput";

const ArrowButtonTest = () => {
  return (
    <div
      style={{
        background: "#d9d9d9",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
      }}
    >
      {/* <ArrowButton direction="down" arrowType="line" children={null} /> */}
      {/* SearchInput 테스트 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          marginTop: 40,
        }}
      >
        <SearchInput
          inputSize="large"
          shape="line"
          backgroundColor="transparent"
          iconColor="white"
          iconPosition="right"
          placeholderColor="white"
          placeholder="검색어를 입력해주세요"
        />
        <SearchInput
          inputSize="small"
          shape="line"
          backgroundColor="transparent"
          iconPosition="left"
          iconColor="white"
          placeholder="내가 올린 영상 내에서 검색.."
        />
        <SearchInput
          inputSize="small"
          shape="round"
          backgroundColor="white"
          iconColor="black"
          iconPosition="right"
          placeholder="지역명을 입력해주세요"
        />
        <SearchInput
          inputSize="large"
          shape="square"
          backgroundColor="gray"
          iconColor="gray"
          iconPosition="right"
          placeholder="지역, 구, 동으로 검색"
        />
      </div>
      {/* PositionButton 테스트 */}
      <div style={{ marginTop: 40 }}>
        <PositionButton
          count={103}
          // circleTextColor="white"
          label="북아현동"
          onClick={() => alert("클릭!")}
        />
      </div>
      {/* TagButton 테스트 */}
      <div style={{ marginTop: 40 }}>
        <TagButton
          fontSize="1.35rem"
          padding="0.9rem 2.25rem 0.95rem"
        >
          더보기
        </TagButton>
      </div>
    </div>
  );
};

export default ArrowButtonTest;
