import React from "react";
import styles from "./Footer.module.scss";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.footerColumn}>
          <h3 className={styles.footerTitle}>WAGWAG 와그와그</h3>
          <div className={styles.footerTextList}>
            <p className={styles.footerText}>동네 기반 숏츠 플랫폼</p>
            <p className={styles.footerText}>Copyright ©와그와그</p>
          </div>
        </div>

        <div className={styles.footerColumn}>
          <h3 className={styles.footerTitle}>Member</h3>
          <div className={styles.memberSection}>
            <div className={styles.memberColumn}>
              <span className={styles.memberLabel}>Frontend</span>
              <span className={styles.memberNames}>심승보, 고은진, 문소연, 이지영</span>
            </div>
            <div className={styles.memberColumn}>
              <span className={styles.memberLabel}>Backend</span>
              <span className={styles.memberNames}>조용주, 조용주, 조용주, 조용주</span>
            </div>
          </div>
        </div>

        <div className={styles.footerColumn}>
          <h3 className={styles.footerTitle}>문의하기</h3>
          <div className={styles.footerTextList}>
            <p className={styles.footerText}>contact@wagwag.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
