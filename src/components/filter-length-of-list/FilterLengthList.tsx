import styles from './filter-length.module.css';

type LengthListProp = {
  list: string[];
};

export default function FilterLengthList({ list }: LengthListProp) {
  return <div className={styles.filter__length}>{list.length}</div>;
}
