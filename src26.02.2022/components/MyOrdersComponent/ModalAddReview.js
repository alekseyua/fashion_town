import React from 'react';
import MyOrderViews from '../../Views/MyOrderViews'

const ModalAddReview = ({ closeModal }) => {
  return <MyOrderViews.ModalAddReview closeModal={closeModal}>ModalAddReview</MyOrderViews.ModalAddReview>;
};

export default React.memo(ModalAddReview);
