import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './mainAbout.module.scss';
import Text from '../../components/Text';
import { mainAboutImg } from '../../images/index';

const MainAboutLayout = ({ about_banner }) => {
  const { content, title, image, banner_type, url = "#" } = about_banner;
  return (
    <div className={style['main-about']}>
      <div className={'container'}>
        <div className={style['main-about-wrap']}>
          <div className={style['main-about__content']}>
            <h2 className={style['main-about__title']}>{title}</h2>
            <div
              className={style['main-about__text']}
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
            <NavLink to={url} className={style['main-about__link']}>
              <Text text={'moreDetails'} />
            </NavLink>
            <div className={style['main-about__image']}>
              <img src={image ? image : mainAboutImg} alt={banner_type} />
            </div>
          </div>
        </div>
      </div>
      <div className={style['main-about-bg']}></div>
      <div className={style['main-about-bg']}></div>
    </div>
  );
};

export default React.memo(MainAboutLayout);
