import Sidebar from "@/components/layout/Sidebar";

import styles from "./layout.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.content}>{children}</div>
      </main>
    </>
  );
}
