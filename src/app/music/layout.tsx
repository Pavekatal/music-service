import { ReactNode } from 'react';
import styles from './layout.module.css';
import Nav from '@components/nav/Nav';
import Sidebar from '@components/sidebar/Sidebar';
import Bar from '@components/bar/Bar';

interface MusicLayoutProps {
  children: ReactNode;
}

export default function MusicLayout({ children }: MusicLayoutProps) {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <main className={styles.main}>
            <Nav />
            {children}
            <Sidebar />
          </main>
          <Bar />
          <footer className="footer"></footer>
        </div>
      </div>
    </>
  );
}
