import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Text from '../../components/Text';
import style from './styles/index.module.scss';
import Button from '../Button';

const CategoryMarkup = ({ children }) => {
  const [viewAll, setViewAll] = useState(false);
  return (
    <div className={style['catfilter-block']}>
      <div className={style['catfilter-block__heading']}>Наценка на категорию</div>
      <div className={style['catfilter-block__content']}>
        <div
          className={classNames({
            [style['catfilter-scroll']]: true,
            [style['catfilter-scroll-category-markup']]: true,
            [style['active']]: viewAll,
          })}
        >
          {children}
        </div>
      </div>
      <div className={style['catfilter-block__bottom']}>
        <Button
          data-cy={`catfilterColorsButton`}
          onClick={() => {
            setViewAll(!viewAll);
          }}
          gxVariant="text"
          className={style['catfilter-block__toggle']}
        >
          <Text text={viewAll ? 'hide' : 'views.all'} />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(CategoryMarkup);
