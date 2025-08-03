"use client";

import Topbar from "@/components/layout/Topbar";
// import { useRouter } from "next/navigation";

export default function MainPage() {
  // const router = useRouter();
  return (
    <Topbar
      location="서대문구 대현동"
      data={{
        videoCount: 43,
        rank: 2,
        hotKeyword: "버스킹",
        topPosts: [
          "이대 앞 휘낭시에 여기가 대박임",
          "오늘자 홍제천 벚꽃길 분위기",
          "요즘 유기견이 많이 보인다ㅠㅠ",
          "이대입구 신상 빵집 오픈함",
          "치킨 먹고 산책 루트 공유한다",
        ],
      }}
    />
  );
}
