import React from 'react';

const CloseBtn = ({ closeModal }) => {

  return (
    <div onClick={closeModal} slot={'close-button'} className="modal-closebtn">
      <i></i>
    </div>
  );
};

export default React.memo(CloseBtn);
