import { TrackType } from '@shared-types/SharedTypes';
import styles from './filter-length.module.css';
import { getUniqueValuesByKey } from '@utils/helper';

type LengthListProp = {
  lengthList: keyof TrackType;
  tracks: TrackType[];
};

export default function FilterLengthList({
  lengthList,
  tracks,
}: LengthListProp) {
  const filteredList = getUniqueValuesByKey(tracks, lengthList);
  return <div className={styles.filter__length}>{filteredList.length}</div>;
}
