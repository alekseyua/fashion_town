import React from 'react';
import { NavLink } from 'react-router-dom';
import { useIntl } from 'react-intl';
import style from './moreLink.module.scss';

const MoreLink = (props) => {
  const { locale } = useIntl();
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
