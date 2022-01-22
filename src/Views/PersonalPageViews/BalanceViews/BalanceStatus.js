import React from 'react';
import Text from '../../../components/Text';
import style from '../styles/wrapper.module.scss';

const BalanceStatus = ({ status }) => {
  
  return (
    <span className={!(status === 'Успешно') ? style["graytext"] : style['greentext']}>
      {!(status === 'Успешно') ? <Text text="expected" /> : <Text text="success" />}
    </span>
  );
};
export default React.memo(BalanceStatus);
