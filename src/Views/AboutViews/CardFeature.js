import React from 'react';
import Title from '../Title';
import { GxIcon } from '@garpix/garpix-web-components-react';
import style from './styles/index.module.scss';

const CardFeature = ({ title, items = [], itemsThree = [], imageItem, imageCard }) => {

  //console.log(title)
  return (
    <div className={style['about_page_pluses__card']}>
      <div className={style['about_page_pluses__card_text']}>
        <Title variant={'about__card_head'} type={'h5'}>
          {title}
        </Title>
        <ul className={style['about_page_for__list']}>
          {itemsThree.map((el, i) => {
            return (
              <li className={style['about_page_for__list-li']} key={el.id}>
                <GxIcon src={el.image} className={style['about_page_for__list_icon']} />
                <div className={style['about_page_for__list_desc']}>
                  {el.title}
                  {el.children.map((elChildren, ic) => {
                    return (
                      <div
                        key={ic}
                        className={style['about_page_for__list_desc-small']}
                        dangerouslySetInnerHTML={{ __html: elChildren.content }}
                      ></div>
                    );
                  })}
                </div>
              </li>
            );
          })}
          {items.map((el, i) => {
            return (
              <li className={style['about_page_for__list-li']} key={el.id}>
                <GxIcon src={el.image} className={style['about_page_for__list_icon']} />
                <div dangerouslySetInnerHTML={{ __html: el.content }}></div>
              </li>
            );
          })}
        </ul>
      </div>
      <img src={imageCard} className={style['about_page_pluses__card_img']} />
    </div>
  );
};

export default React.memo(CardFeature);
