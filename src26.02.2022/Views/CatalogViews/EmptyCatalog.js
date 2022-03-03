import React from 'react';
import Container from '../Container';
import { GxRow, GxCol } from '@garpix/garpix-web-components-react';
import Title from '../Title';
import CartViews from '../CartViews';
import style from './styles/index.module.scss';

const EmptyCatalog = ({}) => {
  return (
    <div className={style['empty_catalog-wrapper']}>
      <Container>
        <GxRow>
          <GxCol className="cart__empty">
            <Title variant={'cart'} type={'h1'}>
              По вашему запросу ничего не найдено.
            </Title>
            <CartViews.Text type={'text-under_title'}>
              Попробуйте уточнить в службе поддержки...
            </CartViews.Text>
          </GxCol>
        </GxRow>
      </Container>
    </div>
  );
};

export default React.memo(EmptyCatalog);
