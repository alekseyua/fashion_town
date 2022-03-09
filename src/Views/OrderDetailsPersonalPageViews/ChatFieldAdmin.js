import React from 'react';
import classNames from 'classnames';
import api from '../../api';
import dayjs from '../../utils/dayjs';
import style from './styles/index.module.scss';

const ChatFieldAdmin = ({
  user = 'admin',
  created_at = 'date',
  message = 'messenge',
  videos = [],
  images = [],
}) => {
  return (
    <div
      className={classNames({
        [style['cabinet_orders_details__chatmessage']]: true,
        [style['cabinet_orders_details__chatmessage-admin']]: true,
      })}
    >
      <div className={style['cabinet_orders_details__chatmessage_wrapper']}>
        <div className={style['cabinet_orders_details__chatmessage_name']}>{user}</div>
        <div className={style['cabinet_orders_details__chatmessage_date']}>
          {dayjs(api.language, created_at).format('DD.MM.YYYY HH:MM')}
        </div>
      </div>
      <div className={style['cabinet_orders_details__chatmessage_text']}>
        {message}
        <div className={style['cabinet_orders_details__chatmessage-image_wrapper']}>
          {images.map((el, i) => {
            return (
              <div className={style['cabinet_orders_details__chatmessage-preview_image']}>
                <img
                  className={style['cabinet_orders_details__chatmessage-image']}
                  src={el.image_thumb}
                  key={i}
                  alt={'image messenge'}
                />
              </div>
            );
          })}
          {videos.map((el, i) => {
            return (
              <div className={style['cabinet_orders_details__chatmessage-preview_viedo']}>
                <img
                  className={style['cabinet_orders_details__chatmessage-image']}
                  src={el.video_preview}
                  key={i}
                  alt={'image messenge'}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChatFieldAdmin);
