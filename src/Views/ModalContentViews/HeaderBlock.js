import React from 'react';

const HeaderBlock = ({ title, mb = "10px" }) => {

  return (
    <div style={{ marginBottom: mb }} className="modal-heading">
      {title}
    </div>
  );
};

export default React.memo(HeaderBlock);
