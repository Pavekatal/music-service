import { TrackType } from '@shared-types/SharedTypes';
import { data } from '@/data';
import styles from './filter-length.module.css';
import { getUniqueValuesByKey } from '@utils/helper';

type LengthListProp = {
  lengthList: keyof TrackType;
};

export default function FilterLengthList({ lengthList }: LengthListProp) {
  const filteredList = getUniqueValuesByKey(data, lengthList);
  return <div className={styles.filter__length}>{filteredList.length}</div>;
}
