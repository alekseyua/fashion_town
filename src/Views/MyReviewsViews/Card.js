import React from 'react';
import { productCard1, productCard2, newsCard, arrowDown, likeIcon } from '../../images';
import { GxIcon } from '@garpix/garpix-web-components-react';
import Raiting from '../Raiting';
import classNames from 'classnames';
import api from '../../api';
import dayjs from '../../utils/dayjs';
import style from './styles/index.module.scss';

// content: "qweqwe"
// created_at: "2021-05-24T11:01:05.497919"
// id: 645
// likes_count: 1
// review_photos: [{review: 645,…}]
// 0: {review: 645,…}
// image: "http://fashiontown.staging.garpix.com/media/uploads/2021/5/bez-nazvaniia-1_I0svYZa.jpeg"
// image_thumb: "http://fashiontown.staging.garpix.com/media/uploads/2021/5/bez-nazvaniia-1_I0svYZa_75x100.jpg"
// review: 645
// review_type: {type: "Отзыв о товаре", product: "Хлопковая блузка"}
// product: "Хлопковая блузка"
// type: "Отзыв о товаре"
// review_videos: []
// stars: 1
// status: "Опубликовано"
const Card = ({
  content,
  created_at,
  id,
  likes_count,
  likes_count_add = '10',
  review_photos,
  stars,
  status,
  review_type,
  review_videos,
  setModalStates,
}) => {
  const widthScreen = window.innerWidth;
  const getPlusPhoto = () => {
    if (widthScreen <= 375) {
      if (Number(Math.sign(review_photos.length - 3)) !== -1) return `+${review_photos.length - 3}`;
    } else {
      if (Number(Math.sign(review_photos.length - 4) !== -1)) return `+${review_photos.length - 4}`;
    }
    return null;
  };
  return (
    <div className={style['cabinet_history__card']}>
      <details className={style['cabinet_history__card_more']}>
        <summary className={style['cabinet_history__card_top']}>
          <div className={style['cabinet_history__card_product']}>
            <div>
              <p className={style['cabinet_history__card_head']}>{review_type.type}</p>
              <p className={style['cabinet_history__card_text']}>{review_type.product}</p>
            </div>
            <div className={style['cabinet_history__card_image_wrap']}>
              {review_photos.map((el, i) => {
                if (widthScreen <= 375) {
                  if (i < 2) {
                    return (
                      <img
                        className={style['cabinet_history__card_image']}
                        src={el.image_thumb}
                        width="50px"
                        height="50px"
                        alt={'min image card'}
                      />
                    );
                  }
                } else {
                  if (i < 3) {
                    return (
                      <img
                        className={style['cabinet_history__card_image']}
                        src={el.image_thumb}
                        width="50px"
                        height="50px"
                        alt={'min image card'}
                      />
                    );
                  }
                }
              })}
              <p className={style['cabinet_history__card_image_counter']}>{getPlusPhoto()}</p>
            </div>
          </div>
          <div className={style['cabinet_history__card_publication']}>
            <div>
              <p className={style['cabinet_history__card_head']}>
                {dayjs(created_at).format('DD.MM.YYYY')}
              </p>
              <p className={style['cabinet_history__card_text']}>34 бонуса (-ов)</p>
            </div>
            <div className={style['cabinet_history__card_bonus_wrap']}>
              <div className={style['cabinet_history__card_bonus_likes_wrap']}>
                <GxIcon src={likeIcon} className={style['cabinet_history__card_bonus_icon']} />
                <p className={style['cabinet_history__card_bonus_likes']}>{likes_count}</p>
              </div>
              <p className={style['cabinet_history__card_bonus_plus']}>
                +{likes_count_add ? likes_count_add : '0'}
              </p>
            </div>
          </div>
          <div className={style['cabinet_history__card_revstatus']}>
            <p
              className={classNames({
                [style['cabinet_history__card_status']]: true,
                [style['cabinet_history__card_status-onmoder']]: status === 'На модерации',
                [style['cabinet_history__card_status-reject']]: status === 'Отклонено',
                [style['cabinet_history__card_status-published']]: status === 'Опубликовано',
              })}
            >
              {status}
            </p>
            <GxIcon src={arrowDown} className={style['cabinet_history__card_revstatus_icon']} />
          </div>
        </summary>
        <div className={style['cabinet_history__card_details']}>
          <h3 className={style['cabinet_history__card_details_head']}>Текст отзыва</h3>
          <div className={style['cabinet_history__card_details_line']}></div>
          <p className={style['cabinet_history__card_details_text']}>
            <div dangerouslySetInnerHTML={{ __html: content ? content : "" }}></div>
          </p>
          <div className={style['cabinet_history__card_details_wrap']}>
            <p className={style['cabinet_history__card_details_desc']}>Фото или видео:</p>
            {review_photos.map((el, i) => {
              return (
                <img
                  className={style['cabinet_history__card_image']}
                  src={el.image_thumb}
                  width="50px"
                  height="50px"
                  alt={'image thumb'}
                />
              );
            })}
          </div>
          <div className={style['cabinet_history__card_details_wrap']}>
            <p className={style['cabinet_history__card_details_desc']}>Оценка:</p>
            <Raiting disabled max={5} value={stars} />
          </div>
        </div>
      </details>
    </div>
  );
};

export default React.memo(Card);
