import React from 'react';

const TypeOfIcon = ({ nameOfStyle, image }) => {
  return (
    <img src={image} alt="Image" className={nameOfStyle} />
  );
};
export default React.memo(TypeOfIcon);
