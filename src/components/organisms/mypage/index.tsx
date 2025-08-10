import { Contribution, StatCard, UserProfileCard } from "../../molecules";

import styles from "./MypageInfoArea.module.scss";

type UserProfile = {
  userName: string;
  email: string;
  location: string;
  joinDate: string;
};

type UserStat = {
  contribution: number;
  uploads: number;
  likes: number;
  views: number;
};

interface MypageInfoAreaProps {
  userProfile: UserProfile;
  userStat: UserStat;
}

export const MypageInfoArea = ({ userProfile, userStat }: MypageInfoAreaProps) => {
  return (
    <div className={styles.mypageInfoAreaContainer}>
      <div className={styles.userProfileContainer}>
        <UserProfileCard
          userName={userProfile.userName}
          email={userProfile.email}
          location={userProfile.location}
          joinDate={userProfile.joinDate}
        />
      </div>
      <div className={styles.userInfoContainer}>
        <Contribution
          percentage={userStat.contribution}
          className={styles.userContributionContainer}
        />
        <div className={styles.userStatCardContainer}>
          <StatCard
            variant="uploads"
            value={userStat.uploads}
          />
          <StatCard
            variant="likes"
            value={userStat.likes}
          />
          <StatCard
            variant="views"
            value={userStat.views}
          />
        </div>
      </div>
    </div>
  );
};
