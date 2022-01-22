import React from 'react';
import Button from '../Button';
import Text from '../../components/Text';
import style from './styles/index.module.scss';

const ShowMoreBtn = ({ onClick, allCount = 30, currentCount = 10 }) => {
  return (
    <div className={style['show_more']}>
      <Button onClick={onClick} gxVariant="text" variant={'show_more-default'}>
      Показать еще
      </Button>
      <span className={style['show_more-counter']}>
        показано {currentCount} из {allCount}
      </span>
    </div>
  );
};

export default React.memo(ShowMoreBtn);
