import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import style from './logo.module.scss';
// import { GxIcon } from '@garpix/garpix-web-components-react';
// import { logo } from '../../images/index';
import { useIntl } from 'react-intl';

//const Logo = ({ isLight = false, mobile = false, site_configuration }) => {
const Logo = ({ isLight = false, mobile = false, site_configuration }) => {
const [logoFirm, setLogoFirm] = useState();
useEffect(()=>{
  site_configuration.logo_1 !== '#' ? setLogoFirm(site_configuration.logo_1) : null;
  site_configuration.logo_2 !== '#' ? setLogoFirm(site_configuration.logo_2) : null;
})
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
      {/* <img src={logoFirm} label="Fashion Town" /> */}
      <div 
        className={style["logo-img"]}
        style={{
          backgroundImage: `url(${logoFirm})`
        }}
      ></div>
     { /*<GxIcon src={site_configuration?.logo_1} label="Fashion Town" /> */}
    </NavLink>

  );
  
};
//<img src={site_configuration?.logo_1} label="Fashion Town" />
export default React.memo(Logo);
