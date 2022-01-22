import React from 'react';

const Container = ({ children, onScroll }) => {
  return  <div onScroll={onScroll} className="container">{children}</div>;
};

export default React.memo(Container);
