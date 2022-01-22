import React from 'react';

const Wrapper = ({ children }) => {
  return <div className="cabinet_mobile_wrapper">{children}</div>;
};

export default React.memo(Wrapper);
