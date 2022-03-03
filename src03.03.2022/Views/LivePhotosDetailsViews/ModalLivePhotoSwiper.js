import { useState } from 'react';
import { Player, BigPlayButton } from 'video-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import style from './styles/index.module.scss';

const ModalLivePhotoSwiper = ({ imageSet, swiperParams, setSwiper }) => {
  return (
    <div className={style['live-photo-swiper__wrap']}>
      <Swiper {...swiperParams} className={style['live-photo-swiper']} onSwiper={setSwiper}>
        {imageSet.map((el, i) => (
          <SwiperSlide className={style['live-photo-swiper__slide']} key={i}>
            {el.type === 'video' ? (
              <div>
                <Player
                  className="news-details-page__slider_item"
                  fluid={true}
                  poster={el.video_preview}
                  src={el.video}
                  key={i}
                >
                  <BigPlayButton position="center"></BigPlayButton>
                </Player>
              </div>
            ) : (
              <img className={style['live-photo-swiper__img']} src={el.image} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default React.memo(ModalLivePhotoSwiper);
