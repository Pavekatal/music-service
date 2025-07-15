import styles from './page.module.css';
import './page.css';
import Nav from '@components/nav/Nav';
import CenterBlock from '@components/centerblock/CenterBlock';
import Sidebar from '@components/sidebar/Sidebar';
import Bar from '@components/bar/Bar';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <CenterBlock />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
