"use client";

import Topbar from "@/components/layout/Topbar";
// import { useRouter } from "next/navigation";

export default function MainPage() {
  // const router = useRouter();
  return (
    <div style={{ backgroundColor: "#080808", width: "100%", height: "100%" }}>
      <Topbar
        location="서대문구 대현동"
        data={{
          videoCount: 43,
          rank: 2,
          hotKeyword: "버스킹",
          topPosts: [
            "이대 앞 휘낭시에 여기가 대박임",
            "홍제천 벚꽃길 장난 아님",
            "요즘 유기견 산책 자주 보임",
            "이대입구 신상 빵집 오픈",
            "치킨 먹고 산책 루트 공유",
          ],
        }}
      />
    </div>
  );
}
