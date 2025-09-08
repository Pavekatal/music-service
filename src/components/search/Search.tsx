'use client';

import { useState } from 'react';
import styles from './search.module.css';
import { useAppDispatch } from '../../store/store';
import { setSearchTrack } from '../../store/features/trackSlice';

export default function Search() {
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState('');

  const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    dispatch(setSearchTrack(e.target.value));
  };

  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchInput}
        onChange={onSearchInput}
      />
    </div>
  );
}
