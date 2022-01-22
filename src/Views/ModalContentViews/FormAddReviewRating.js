import React from 'react';
import { GxRating } from '@garpix/garpix-web-components-react';
import Text from '../../components/Text';
import style from './styles/index.module.scss';

const FormAddReviewRating = ({ values, setFieldValue }) => {
  return (
    <p className={style['productreviews__form-raiting']}>
      <span>
        <Text text={'evaluation'} />:
      </span>
      <GxRating
        onGx-change={(e) => {
          const value = e.target.value;
          setFieldValue('stars', value);
        }}
        className={style['productreviews__form-rating-indicator']}
        precision="1"
        value={values?.stars}
        data-cy={`rating_review`}
      ></GxRating>
    </p>
  );
};

export default React.memo(FormAddReviewRating);
