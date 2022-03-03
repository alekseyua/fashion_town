import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './footerInfo.module.scss';
import Logo from '../Logo';
import classNames from 'classnames';
// import { GxIcon } from '@garpix/garpix-web-components-react';

const FooterInfo = (props) => {
  const {
    logo,
    content,
    link = null,
    title = '',
    classModificator = false,
    site_configuration,
    data,
    callbackOnClick,
  } = props;
  // todo: что делать с разной шириной иконок? --icon-width: auto; не работает
  const customClassNameWrapper = classNames({
    [style['footer-info']]: true,
    [style[classModificator]]: !!classModificator,
  });
  return (
    <div className={customClassNameWrapper}>
      <div
        className={classNames({
          ['container']: true,
          [style['relative-container']]: true,
        })}
      >
        {logo ? (
          <div className={style['footer-logo']}>
            <Logo site_configuration={site_configuration} />
          </div>
        ) : (
          <h4 className={style['footer-info__title']}>
            ДОСТАВКА
            {/* {title} */}
          </h4>
        )}
        <div className={style['footer-info__content']}>{content}</div>
        {link ? (
          <NavLink className={style['footer-info__link']} to={'/information/delivery'}>
            <i className={style['footer-info__link-img']}>
              <img src={link.icon} alt="footer icon" width={'10px'} height={'10px'} />
            </i>
            <span className={style['footer-info__link-name']}>{link.name}</span>
          </NavLink>
        ) : (
          <div className={style['footer-info__link']} onClick={callbackOnClick}>
            <i className={style['footer-info__link-img']}>
              <img src={data.icon} alt="footer icon" width={'10px'} height={'10px'} />
            </i>
            <span className={style['footer-info__link-name']}>{data.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(FooterInfo);
