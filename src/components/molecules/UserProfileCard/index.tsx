import React from "react";
import styles from "./UserProfileCard.module.scss";
import { UserProfileCardProps } from "./UserProfileCard.types";
import Image from "next/image";
import LocationPinGraySvg from "@/assets/images/LocationPinGray.svg";

export const UserProfileCard: React.FC<UserProfileCardProps> = ({
  profileImage,
  userName,
  email,
  location,
  joinDate,
  className = "",
}) => {
  return (
    <div className={`${styles.userProfileCard} ${className}`}>
      <div className={styles.profileImageContainer}>
        {profileImage ? (
          <Image 
            src={profileImage} 
            alt={`${userName}의 프로필`}
            className={styles.profileImage}
          />
        ) : (
          <div className={styles.defaultProfileIcon} />
        )}
      </div>
      
      <h2 className={styles.username}>{userName}</h2>
      <p className={styles.email}>{email}</p>
      
      <div className={styles.divider} />
      
      <div className={styles.locationContainer}>
        <LocationPinGraySvg />      
        <span className={styles.location}>{location}</span>
      </div>
      
      <p className={styles.joinDate}>가입 : {joinDate}</p>
    </div>
  );
};