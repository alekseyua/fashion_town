import React from 'react';
import { redWomen } from '../../images';
import Text from '../../components/Text';
import style from './styles/leftSide.module.scss';
import videoReg from '../../video/video_2022-03-11_13-29-13.mp4';
import { Player, BigPlayButton } from 'video-react';

const LeftSide = ({ image = redWomen }) => {

console.log('video', videoReg)
  return (
    <div className={style['wrapper']}>
      {/* <img className={style['wrapper__image']} src={image} alt={Text({ text: 'backgroundAuth' })} /> */}
      <Player 
        className="news-details-page__slider_item" 
        // controls={false}
          muted
          autoPlay={"autoplay"}
          preLoad={"auto"}
          loop 
          fluid={true} 
          poster={image} 
          src={videoReg}
      >
        {/* <BigPlayButton position="center"></BigPlayButton> */}
      </Player>
      <div className={style['wrapper__marcket-info']}>
        {/* todo: inner rich text */}
        <div className={style['wrapper__upper-title']}>
          ТОРГОВАЯ БИЗНЕС-ПЛАТФОРМА для Розничных, оптовых покупателей и дропшипперов
        </div>
        {/* todo: inner rich text */}
        <div className={style['wrapper__midle-title']}>FASHION TOWN</div>
        <div className={style['wrapper__line']}></div>
        {/* todo: inner rich text */}
        <div className={style['wrapper__lower-title']}>
          Для тех, кто хочет не только покупать, но и зарабатывать!
        </div>
      </div>
    </div>
  );
};
export default React.memo(LeftSide);
