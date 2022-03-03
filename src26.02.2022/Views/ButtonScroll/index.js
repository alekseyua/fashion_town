import React from 'react';
import { GxIcon } from '@garpix/garpix-web-components-react';
import { arrowTop } from '../../images';
import { Link } from 'react-router-dom';

const ButtonScroll = ({}) => {
  return (
    <div className="topbtn__wrap">
      <Link to="#" className="topbtn__button">
        <GxIcon src={arrowTop} className={'scroll-icon'} />
      </Link>
    </div>
  );
};
export default React.memo(ButtonScroll);
