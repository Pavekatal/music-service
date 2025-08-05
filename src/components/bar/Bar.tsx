'use client';

import Link from 'next/link';
import styles from './bar.module.css';
import classnames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useEffect, useRef } from 'react';
import { setIsPlay } from '../../store/features/trackSlice';

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentTrack && isPlay && audioRef.current) {
      audioRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [currentTrack, isPlay]);

  if (!currentTrack) return <></>;

  const audioPlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      dispatch(setIsPlay(true));
    }
  };

  const audioPause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      dispatch(setIsPlay(false));
    }
  };

  const notYetImplemented = () => {
    alert('Еще не реализовано');
  };

  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        controls
        src={currentTrack?.track_file}
        className={styles.audio}
      ></audio>
      <div className={styles.bar__content}>
        <div className={styles.bar__playerProgress}></div>
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div
                className={styles.player__btnPrev}
                onClick={notYetImplemented}
              >
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              {!isPlay ? (
                <div
                  className={classnames(styles.player__btnPlay, styles.btn)}
                  onClick={audioPlay}
                >
                  <svg className={styles.player__btnPlaySvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
                  </svg>
                </div>
              ) : (
                <div
                  className={classnames(styles.player__btnPlay, styles.btn)}
                  onClick={audioPause}
                >
                  <svg className={styles.player__btnPlaySvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-pause"></use>
                  </svg>
                </div>
              )}

              <div
                className={styles.player__btnNext}
                onClick={notYetImplemented}
              >
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                className={classnames(styles.player__btnRepeat, styles.btnIcon)}
                onClick={notYetImplemented}
              >
                <svg className={styles.player__btnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                className={classnames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                )}
                onClick={notYetImplemented}
              >
                <svg className={styles.player__btnShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="">
                    {currentTrack.name}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {currentTrack.author}
                  </Link>
                </div>
              </div>

              <div className={styles.trackPlay__dislike}>
                <div
                  className={classnames(
                    styles.player__btnShuffle,
                    styles.btnIcon,
                  )}
                  onClick={notYetImplemented}
                >
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                {/* <div
                  className={classnames(
                    styles.trackPlay__dislike,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div> */}
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image} onClick={notYetImplemented}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={classnames(styles.volume__progress, styles.btn)}>
                <input
                  className={classnames(
                    styles.volume__progressLine,
                    styles.btn,
                  )}
                  type="range"
                  name="range"
                  onChange={notYetImplemented}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
