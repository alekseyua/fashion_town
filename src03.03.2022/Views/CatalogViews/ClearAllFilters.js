import React from 'react';
import Text from '../../components/Text';
import style from './styles/index.module.scss';

const ClearAllFilters = ({ onClick }) => {
  return (
    <div onClick={onClick} className={style['catalog-tagclear']}>
      <div className={style['catalog-tag__value']} data-cy={`clearAllFocusFilters`}>
        <Text text={'clear.all'} />
      </div>
    </div>
  );
};

export default React.memo(ClearAllFilters);
