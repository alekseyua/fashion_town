import React from 'react';

const HeaderBlock = ({ title, mb = "10px" }) => {

//console.log('ModalContentViews -> HeaderBlock--!!!!  ')
  
  return (
    <div style={{ marginBottom: mb }} className="modal-heading">
      {title}
    </div>
  );
};

export default React.memo(HeaderBlock);
