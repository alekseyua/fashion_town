import React from 'react';

const WrapperButtonSave = ({ children }) => {
  return <div className="cabinet_myshop__tab_btnwrap">{children}</div>;
};

export default React.memo(WrapperButtonSave);
