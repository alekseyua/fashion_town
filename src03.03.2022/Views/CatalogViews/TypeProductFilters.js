import React, { useState } from 'react';
import Text from '../../components/Text';
import style from './styles/index.module.scss';
import Input from '../Input';
import classNames from 'classnames';
import Button from '../Button';

const TypeProductFilters = ({
  children,
  resetFilter,
  sercheTypeProduct,
  sercheValue,
  is_visibleViewAll = true,
}) => {
  const [viewAll, setViewAll] = useState(false);
  return (
    <div className={style['catfilter-block']}>
      <div className={style['catfilter-block__heading']}>
        <Text text={'type.product'} />
      </div>
      <div className={style['catfilter-block__content']}>
        <div className={style['catfilter-search']}>
          <Input
            data-cy={`searchTypeProductsFilter`}
            value={sercheValue}
            onGx-input={sercheTypeProduct}
            label={''}
            placeholder={`${Text({ text: 'search' })}...`}
            variant="light"
          ></Input>
        </div>
        <div className={style['catfilter-scrollwrap']}>
          <div
            className={classNames({
              [style['catfilter-scroll']]: true,
              [style['active']]: viewAll,
            })}
          >
            {children}
          </div>
        </div>
      </div>
      <div className={style['catfilter-block__bottom']}>
        {is_visibleViewAll ? (
          <Button
            onClick={() => {
              setViewAll(!viewAll);
            }}
            gxVariant="text"
            data-cy={`catfilterProductButton`}
            className={style['catfilter-block__toggle']}
          >
            <Text text={viewAll ? 'hide' : 'views.all'} />
          </Button>
        ) : (
          <div></div>
        )}

        <Button
          onClick={() => {
            sercheTypeProduct({
              target: {
                value: '',
              },
            });
            resetFilter();
          }}
          gxVariant="text"
          data-cy={`catfilterProductButtonReset`}
          className={style['catfilter-block__reset']}
        >
          <Text text={'reset'} />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(TypeProductFilters);
