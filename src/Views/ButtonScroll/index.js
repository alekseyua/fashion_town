import React from 'react';
import { GxIcon } from '@garpix/garpix-web-components-react';
import { arrowTop } from '../../images';

const ButtonScroll = ({}) => {
  return (
    <div className="topbtn__wrap">
      <a href="#" className="topbtn__button">
        <GxIcon src={arrowTop} className={'scroll-icon'} />
      </a>
    </div>
  );
};
export default React.memo(ButtonScroll);
