import React from 'react';
import { GxSpinner } from '@garpix/garpix-web-components-react';
import Text from '../../components/Text';
import ModalContentViews from '../ModalContentViews';
import Button from '../Button';

const ModalAddReview = ({ closeModal, isSaved = true, children }) => {
  return (
    <ModalContentViews.ModalContentViews
      title={'Оставьте отзыв'}
      keyText={'send'}
      closeModal={closeModal}
      isSaved={isSaved}
    >
      {children}
    </ModalContentViews.ModalContentViews>
  );
};

export default React.memo(ModalAddReview);
