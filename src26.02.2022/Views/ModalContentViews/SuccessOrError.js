import React from 'react';
import style from './styles/index.module.scss';
import { errorAlertIcon, successAlertIcon } from '../../images';
import { GxIcon, GxButton } from '@garpix/garpix-web-components-react';

const SuccessOrError = ({ success, closeModal, content = null}) => {

  if (content === null) {
    success ? (content = 'Ваш отзыв принят на модерацию') : (content = 'Ваш отзыв не отправлен');
  }

  return (
    <div className={style['wrapper-info']}>
      <div className={style['wrapper-info__messenge']}>
        <GxIcon src={success ? successAlertIcon : errorAlertIcon} />
        <span>{content}</span>
      </div>
      <GxButton onClick={closeModal} className={style['productreviews__form-submit-btnlage']} data-cy={`close_modal_review`}>
        хорошо
      </GxButton>
    </div>
  );
};

export default React.memo(SuccessOrError);
