import styles from './loader.module.css';

interface LoaderProp {
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
}

export default function Loader({
  width = '100%',
  height = 20,
  style,
}: LoaderProp) {
  return (
    <div className={styles.loader} style={{ width, height, ...style }}></div>
  );
}
