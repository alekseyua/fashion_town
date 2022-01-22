import React from 'react';
import classNames from 'classnames';
import { GxRating } from '@garpix/garpix-web-components-react';
import style from '../styles/index.module.scss';

const ReviewsRightSide = ({ reviews_statistic }) => {
  return (
    <div className={style['productreviews__right-side-wrapper']}>
      <div className={style['productreviews__right-side-container']}>
        <div className={style['productreviews__indicator-star-wrapper']}>
          <GxRating
            readonly
            className={style['productreviews__rating-indicator']}
            precision=".5"
            value={reviews_statistic.all_count_percent}
          ></GxRating>
          <span>{reviews_statistic.all_count_percent.toFixed(2)} / 5</span>
        </div>
        <ul className={style['productreviews__indicator-line-list']}>
          <li className={style['productreviews__indicator-line-item']}>
            <p className={(style['productreviews__indicator-description'])}>5 звезд</p>
            <div className={style['productreviews__indicator-line-container']}>
              <div className={style['productreviews__indicator-line-gray']}></div>
              <div
                style={{ width: `${reviews_statistic['5_stars_percent']}%` }}
                className={classNames({
                  [style['productreviews__indicator-line-yelow']]: true,
                  [style['productreviews__indicator-line-yelow--five-stars']]: true,
                })}
              ></div>
            </div>
            <p className={style['productreviews__indicator-counter']}>
              {reviews_statistic['5_stars_count']}
            </p>
          </li>
          <li className={style['productreviews__indicator-line-item']}>
            <p className={style['productreviews__indicator-description']}>4 звезды</p>
            <div className={style['productreviews__indicator-line-container']}>
              <div className={style['productreviews__indicator-line-gray']}></div>
              <div
                style={{ width: `${reviews_statistic['4_stars_percent']}%` }}
                className={classNames({
                  [style['productreviews__indicator-line-yelow']]: true,
                  [style['productreviews__indicator-line-yelow--three-stars']]: true,
                })}
              ></div>
            </div>
            <p className={style['productreviews__indicator-counter']}>
              {reviews_statistic['4_stars_count']}
            </p>
          </li>
          <li className={style['productreviews__indicator-line-item']}>
            <p className={style['productreviews__indicator-description']}>3 звезды</p>
            <div className={style['productreviews__indicator-line-container']}>
              <div className={style['productreviews__indicator-line-gray']}></div>
              <div
                style={{ width: `${reviews_statistic['3_stars_percent']}%` }}
                className={classNames({
                  [style['productreviews__indicator-line-yelow']]: true,
                  [style['productreviews__indicator-line-yelow--three-stars']]: true,
                })}
              ></div>
            </div>
            <p className={style['productreviews__indicator-counter']}>
              {reviews_statistic['3_stars_count']}
            </p>
          </li>
          <li className={style['productreviews__indicator-line-item']}>
            <p className={style['productreviews__indicator-description']}>2 звезды</p>
            <div className={style['productreviews__indicator-line-container']}>
              <div className={style['productreviews__indicator-line-gray']}></div>
              <div
                style={{ width: `${reviews_statistic['2_stars_percent']}%` }}
                className={classNames({
                  [style['productreviews__indicator-line-yelow']]: true,
                  [style['productreviews__indicator-line-yelow--two-stars']]: true,
                })}
              ></div>
            </div>
            <p className={style['productreviews__indicator-counter']}>
              {reviews_statistic['2_stars_count']}
            </p>
          </li>
          <li className={style['productreviews__indicator-line-item']}>
            <p className={style['productreviews__indicator-description']}>1 звездa</p>
            <div className={style['productreviews__indicator-line-container']}>
              <div className={style['productreviews__indicator-line-gray']}></div>
              <div
                style={{ width: `${reviews_statistic['1_stars_percent']}%` }}
                className={classNames({
                  [style['productreviews__indicator-line-yelow']]: true,
                  [style['productreviews__indicator-line-yelow--one-star']]: true,
                })}
              ></div>
            </div>
            <p className={style['productreviews__indicator-counter']}>
              {reviews_statistic['1_stars_count']}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default React.memo(ReviewsRightSide);
