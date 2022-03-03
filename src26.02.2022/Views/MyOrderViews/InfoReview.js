import React from 'react';
import Text from '../../components/Text';
import Button from '../../Views/Button';
import ButtonToCatalog from './ButtonToCatalog';
import style from './styles/index.module.scss'

const InfoReview = ({ hideReviewBlock, addReview,page_type_catalog, }) => {
  return (
    <div className={style["cabinet-inforeview"]}>
      <div className={style["cabinet-inforeview__heading"]}>
        <Text text={'dont.buy.something'} />
      </div>
      <div className={style["cabinet-inforeview__text"]}>
        <Text text={'can.start.now'} />
      </div>
      <div className={style["cabinet-inforeview__btns"]}>
        <ButtonToCatalog to={page_type_catalog}>
        <Text text={'make.order'} />
        </ButtonToCatalog>
      </div>
    </div>
  );
};

export default React.memo(InfoReview);
