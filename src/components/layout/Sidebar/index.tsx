"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ProfileImage } from "@/components/atoms";

import MainAdd from "@/assets/images/MainAdd.svg";
import MainHome from "@/assets/images/MainHome.svg";
import MainHomeDisabled from "@/assets/images/MainHomeDisabled.svg";
import MainLocation from "@/assets/images/MainLocation.svg";
import MainLocationDisabled from "@/assets/images/MainLocationDisabled.svg";
import MainSearch from "@/assets/images/MainSearch.svg";
import MainSearchDisabled from "@/assets/images/MainSearchDisabled.svg";
import MainSetting from "@/assets/images/MainSetting.svg";
import MainSettingDisabled from "@/assets/images/MainSettingDisabled.svg";

import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebarContainer}>
      <div className={styles.upperContainer}>
        <div className={styles.logoContainer}>
          <Image
            src="/wagwagLogo.svg"
            alt="logo"
            width={111.75}
            height={18.75}
          />
        </div>
        <div className={styles.menuContainer}>
          <Link href="/upload">
            <MainAdd />
          </Link>
          <Link href="/main">{pathname === "/main" ? <MainHome /> : <MainHomeDisabled />}</Link>
          <Link href="/map">
            {pathname === "/map" ? <MainLocation /> : <MainLocationDisabled />}
          </Link>
          <Link href="/search">
            {pathname === "/search" ? <MainSearch /> : <MainSearchDisabled />}
          </Link>
          <Link href="/mypage">
            {pathname === "/mypage" ? <MainSetting /> : <MainSettingDisabled />}
          </Link>
        </div>
      </div>

      <Link
        href="/mypage"
        className={styles.profileContainer}
      >
        <ProfileImage
          imageUrl="/profileDemo.svg"
          alt="profile"
        />
        <span className={styles.profileNickname}>wagwag</span>
      </Link>
    </aside>
  );
};

export default Sidebar;
