import { MypageInfoArea } from "@/components/organisms/mypage";

import styles from "./mypage.module.scss";

const userProfile = {
  userName: "심승보",
  email: "seungbo@wagwag.com",
  location: "서울",
  joinDate: "2025-01-01",
} as const;

const userStat = {
  contribution: 30,
  uploads: 10,
  likes: 10000,
  views: 1000000,
} as const;

export default function MyPage() {
  return (
    <div className={styles.mypageContainer}>
      <MypageInfoArea
        userProfile={userProfile}
        userStat={userStat}
      />
    </div>
  );
}
