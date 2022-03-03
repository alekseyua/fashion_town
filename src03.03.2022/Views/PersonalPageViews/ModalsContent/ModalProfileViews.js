import React from 'react';
import ModalContentViews from '../../ModalContentViews';

const ModalProfileViews = ({ closeModal, title="title", children }) => {
  return (
    <ModalContentViews.ModalWrapper>
      <ModalContentViews.CloseBtn closeModal={closeModal} />
      <ModalContentViews.HeaderBlock title={title} />
      <ModalContentViews.ContentBlock>{children}</ModalContentViews.ContentBlock>
    </ModalContentViews.ModalWrapper>
  );
};
export default React.memo(ModalProfileViews);
