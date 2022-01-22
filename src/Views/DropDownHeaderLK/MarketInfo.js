import React from 'react';
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
            <a target="_blank" href={to}>
              <Text text={'onlineStore'} />
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};
export default React.memo(MarketInfo);
