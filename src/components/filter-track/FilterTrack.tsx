'use client';

import { useState } from 'react';
import styles from './filtertrack.module.css';
import FilterList from '@components/filter-list/FilterList';
import { TrackType } from '@shared-types/SharedTypes';
import { data } from '@/data';
import classNames from 'classnames';
import FilterLengthList from '@components/filter-length-of-list/FilterLengthList';
import styled from '../filter-list/filterlist.module.css';

export default function FilterTrack() {
  const [openFilterListModal, setOpenFilterListModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState(false);

  const trackKeys = Object.keys(data) as (keyof TrackType)[];
  const [filterListByKey, setFilterListByKey] = useState<keyof TrackType>(
    trackKeys[1],
  );

  const onOpenFilterList = (key: keyof TrackType) => {
    setFilterListByKey(key);
    setActiveFilter(true);

    if (!openFilterListModal) {
      setOpenFilterListModal(true);
    } else if (openFilterListModal && filterListByKey === key) {
      setOpenFilterListModal(false);
      setActiveFilter(false);
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
          className={classNames(styles.filter__button, {
            [styles.active]: activeFilter && filterListByKey === 'name',
          })}
        >
          исполнителю
        </div>
        {openFilterListModal && filterListByKey === 'name' && (
          <FilterList keyOfList={filterListByKey} />
        )}
        {openFilterListModal && filterListByKey === 'name' && (
          <FilterLengthList lengthList={filterListByKey} />
        )}
      </div>

      <div className={styles.filter__container}>
        <div
          onClick={() => onOpenFilterList('release_date')}
          className={classNames(styles.filter__button, {
            [styles.active]: activeFilter && filterListByKey === 'release_date',
          })}
        >
          году выпуска
        </div>
        {openFilterListModal && filterListByKey === 'release_date' && (
          // <FilterList keyOfList={filterListByKey} />
          <div className={styled.filter__content}>
            <div className={styled.filter__list}>
              <p className={styled.filter__track}>Сначала новые</p>
              <p className={styled.filter__track}>Сначала старые</p>
              <p className={styled.filter__track}>По умолчанию</p>
            </div>
          </div>
        )}
        {/* {openFilterListModal && filterListByKey === 'release_date' && (
          <FilterLengthList lengthList={filterListByKey} />
        )} */}
      </div>

      <div className={styles.filter__container}>
        <div
          onClick={() => onOpenFilterList('genre')}
          className={classNames(styles.filter__button, {
            [styles.active]: activeFilter && filterListByKey === 'genre',
          })}
        >
          жанру
        </div>
        {openFilterListModal && filterListByKey === 'genre' && (
          <FilterList keyOfList={filterListByKey} />
        )}
        {openFilterListModal && filterListByKey === 'genre' && (
          <FilterLengthList lengthList={filterListByKey} />
        )}
      </div>
    </div>
  );
}
