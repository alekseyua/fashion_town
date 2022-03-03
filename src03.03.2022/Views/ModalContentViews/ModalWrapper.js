import React from 'react';

const ModalWrapper = ({ children, customClassName = 'modal-wrap' }) => {
  
  return <div className={customClassName}>{children}</div>;
};
export default React.memo(ModalWrapper);
