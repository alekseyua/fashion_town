import React from 'react';
import { Link, NavLink, Route } from 'react-router-dom';
import style from './socialLinks.module.scss';
import { GxIcon } from '@garpix/garpix-web-components-react';
import { v4 } from 'uuid';

const SocialLinks = (props) => {
  const { social_links } = props;
  const redirectURL = (path)=> window.location.href = (path) 
  return (
    <div className={style['social-links']}>
      <nav className={style['social-links__list']}>
        {social_links.map((el, key) => {
          console.log('el links',el)
          return (
            <li key={v4()} className={style['social-links__list-item']}>
              <div onClick={()=>redirectURL(el.url)}>
                <GxIcon className={style['social-links__list-item-icon']} src={el.icon} alt="" />
              </div>
            </li>
          );
        })}
      </nav>
    </div>
  );
};

export default React.memo(SocialLinks);
