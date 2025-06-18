"use client";
// import { useRouter } from "next/navigation";
import { useUserSettingStore } from "@/stores";

export default function CategoryPage() {
  // const router = useRouter();
  const { nickname, profileImage, selectedGu, selectedDong, categories } =
    useUserSettingStore.getState();
  console.log({ nickname, profileImage, selectedGu, selectedDong, categories });
  return <h1>메인페이지입니다.</h1>;
}
