import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './socialLinks.module.scss';
import { GxIcon } from '@garpix/garpix-web-components-react';
import { v4 } from 'uuid';

const SocialLinks = (props) => {
  const { social_links } = props;
  return (
    <div className={style['social-links']}>
      <nav className={style['social-links__list']}>
        {social_links.map((el, key) => {
          return (
            <li key={v4()} className={style['social-links__list-item']}>
              <a target="_blank" href={el.url ? el.url : '#'}>
                <GxIcon className={style['social-links__list-item-icon']} src={el.icon} alt="" />
              </a>
            </li>
          );
        })}
      </nav>
    </div>
  );
};

export default React.memo(SocialLinks);
