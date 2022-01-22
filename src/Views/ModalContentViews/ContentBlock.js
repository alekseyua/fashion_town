import React from 'react';

const ContentBlock = ({ children }) => {

  return <div className="modal-content">{children}</div>;
};
export default React.memo(ContentBlock);
