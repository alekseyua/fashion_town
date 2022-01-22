import React from 'react';
import style from './styles/index.module.scss';

const ViewsImage = ({ image }) => {

//console.log('ModalContentViews -> ViewsImage--!!!!  ')
  
  return (
    <div className={style['preview-image']}>
      <img src={image} />
    </div>
  );
};

export default React.memo(ViewsImage);
