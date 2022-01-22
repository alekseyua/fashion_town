import React from 'react';

const TdData = ({children}) => {
  return <td>{children}</td>;
};

export default React.memo(TdData);
