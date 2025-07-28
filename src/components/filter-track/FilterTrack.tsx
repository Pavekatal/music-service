'use client';

import { useState } from 'react';
import styles from './filtertrack.module.css';
import FilterList from '@components/filter-list/FilterList';
import { TrackType } from '@shared-types/SharedTypes';
import { data } from '@/data';

export default function FilterTrack() {
  const [openFilterListModal, setOpenFilterListModal] = useState(false);

  const trackKeys = Object.keys(data) as (keyof TrackType)[];
  const [filterListByKey, setFilterListByKey] = useState<keyof TrackType>(
    trackKeys[1],
  );

  const onOpenFilterList = (key: keyof TrackType) => {
    setFilterListByKey(key);

    if (!openFilterListModal) {
      setOpenFilterListModal(true);
    } else if (openFilterListModal && filterListByKey === key) {
      setOpenFilterListModal(false);
    } else {
      setFilterListByKey(key);
    }
  };

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>

      <div className={styles.filter__container}>
        <div
          onClick={() => onOpenFilterList('name')}
          className={styles.filter__button}
        >
          исполнителю
        </div>
        {openFilterListModal && filterListByKey === 'name' && (
          <FilterList keyOfList={filterListByKey} />
        )}
      </div>

      <div className={styles.filter__container}>
        <div
          onClick={() => onOpenFilterList('release_date')}
          className={styles.filter__button}
        >
          году выпуска
        </div>
        {openFilterListModal && filterListByKey === 'release_date' && (
          <FilterList keyOfList={filterListByKey} />
        )}
      </div>

      <div className={styles.filter__container}>
        <div
          onClick={() => onOpenFilterList('genre')}
          className={styles.filter__button}
        >
          жанру
        </div>
        {openFilterListModal && filterListByKey === 'genre' && (
          <FilterList keyOfList={filterListByKey} />
        )}
      </div>
    </div>
  );
}
