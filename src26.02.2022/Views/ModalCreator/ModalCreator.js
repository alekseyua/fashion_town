import React from 'react';
import { GxModal } from '@garpix/garpix-web-components-react';
import classNames from 'classnames';
import style from './modalCreator.module.scss';

export const defaultModalStates = {
  content: null,
  show: false,
  addClass: false,
};

const ModalCreator = ({ content = null, show = true, setModalStates, addClass = false }) => {
  const closeModal = () => {

    setModalStates({
      content: null,
      show: false,
      addClass: false,
    });
  };
  const createdClassName = classNames({
    [style['modal_creator']]: true,
    [style[addClass]]: !!addClass,
  });



  return (
    <GxModal 
      onGx-after-hide={closeModal} 
      open={show} 
      className={createdClassName}
    > 
         
      {content}

    </GxModal>
  );
};
export default React.memo(ModalCreator);
