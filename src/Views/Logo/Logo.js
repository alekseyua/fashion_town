import React, { useState } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import style from './logo.module.scss';
import { GxIcon } from '@garpix/garpix-web-components-react';
import { logo } from '../../images/index';
import { useIntl } from 'react-intl';

//const Logo = ({ isLight = false, mobile = false, site_configuration }) => {
const Logo = ({ isLight = false, mobile = false, site_configuration }) => {
  //console.log("site_configuration = " + site_configuration?.logo_1);
 //const site_configuration_test = 'http://91.218.229.240:8000/media/uploads/2021/11/logo.svg'
  const { locale } = useIntl();
  return (
    <NavLink
      to={`/${locale}`}
      className={classNames({
        [style['logo']]: true,
        [style['light']]: isLight,
        [style['mobile']]: mobile,
      })}
    >
      <img src={site_configuration?.logo_1} label="Fashion Town111" />
      
     { /*<GxIcon src={site_configuration?.logo_1} label="Fashion Town" /> */}
    </NavLink>

  );
  
};
//<img src={site_configuration?.logo_1} label="Fashion Town" />
export default React.memo(Logo);
