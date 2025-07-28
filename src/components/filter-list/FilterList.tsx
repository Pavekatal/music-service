import { getUniqueValuesByKey } from '@utils/helper';
import styles from './filterlist.module.css';
import { data } from '@/data';
import { TrackType } from '@shared-types/SharedTypes';

type FilterProp = {
  keyOfList: keyof TrackType;
};

export default function FilterList({ keyOfList }: FilterProp) {
  const filteredList = getUniqueValuesByKey(data, keyOfList);
  console.log('filteredList:', filteredList);
  return (
    <div className={styles.filter__content}>
      <div className={styles.filter__list}>
        {filteredList.map((item) => (
          <p className={styles.filter__track} key={item}>
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
