import React from 'react';
import { Link } from 'react-router-dom';
import Text from '../../components/Text';
import { defaultImageMarketInfo } from '../../images';
import style from './marketInfo.module.scss';

const MarketInfo = ({ image, to = '#', title = 'FASHION STORE' }) => {
  return (
    <div className={style['wrapper']}>
      <div className={style['wrapper-ellipse']}>
        <img src={image ? image : defaultImageMarketInfo} />
      </div>
      <div className={style['wrapper-name_and_link']}>
        <p className={style['wrapper-name_and_link-name']}>
          {title}
          <br />
          <span className={style['wrapper-name_and_link-link']}>
            <Link target="_blank" to={to}>
              <Text text={'onlineStore'} />
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};
export default React.memo(MarketInfo);
