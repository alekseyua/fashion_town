import React from 'react';

const EconomyDescription = ({ content }) => {

  //console.log(children)
  return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
};

export default React.memo(EconomyDescription);
