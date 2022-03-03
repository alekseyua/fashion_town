import React from 'react';
import style from '../index.module.scss';
import Input from '../../Input';
import Container from './Container';

const MarkUpPerCategory = ({children}) => {
  return (
    <>
      <div className={style['catfilter-block__heading']}>Наценка на категорию</div>
      <div className={style['catfilter-block__content']}>
        <div className={style['catfilter-search']}>
          <Input placeholder="Поиск..."></Input>
        </div>
        <Container nameOfStyle={style['catfilter-scrollwrap']}>
          <Container nameOfStyle={style['catfilter-scroll']}>
            {children}
          </Container>
        </Container>
      </div>
    </>
  );
};

export default React.memo(MarkUpPerCategory);
