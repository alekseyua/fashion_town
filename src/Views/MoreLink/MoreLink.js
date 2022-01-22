import React from 'react';
import { NavLink } from 'react-router-dom';
import { useIntl } from 'react-intl';
import style from './moreLink.module.scss';

const MoreLink = (props) => {
  const { locale } = useIntl();
 // console.log('locale = ', locale);// переменную locale ложит ru
  const { children, url = `/${locale}` } = props;
  return (
    <div className={style['more-link']}>
      <NavLink to={url} className={style['more-link__link']}>
        {children}
      </NavLink>
    </div>
  );
};

export default React.memo(MoreLink);
