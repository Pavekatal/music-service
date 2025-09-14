import styles from './filterlist.module.css';
import classNames from 'classnames';

type FilterProp = {
  list: string[];
  onSelect: (value: string) => void;
  selectItems: string[];
};

export default function FilterList({
  list,
  onSelect,
  selectItems,
}: FilterProp) {
  return (
    <div className={styles.filter__content}>
      <div className={styles.filter__list}>
        {list.map((item) => (
          <p
            className={classNames(styles.filter__track, {
              [styles.selected]: selectItems.includes(item),
            })}
            key={item}
            onClick={() => onSelect(item)}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
