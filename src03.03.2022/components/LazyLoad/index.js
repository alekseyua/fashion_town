import React, { useState, useEffect, useRef } from 'react';

const LazyLoad = ({ children, results }) => {
  const [state, setstate] = useState({
    data: results,
  });
  const blockRef = useRef();
  const onScroll = (event) => {
  }

  return <div onScroll={onScroll} ref={blockRef}>{children({ data: state.data })}</div>;
};

export default React.memo(LazyLoad);
