import React, { useState, useEffect } from 'react';
import { GxModal } from '@garpix/garpix-web-components-react';
import classNames from 'classnames';
import { useStoreon } from 'storeon/react';
import style from './modalCreator.module.scss';

const StorControllerModal = ({}) => {
  const { dispatch, modal } = useStoreon('modal');

  const closeModal = () => {
    dispatch({
      content: null,
      show: false,
      addClass: false,
    });
  };


  return (
    <GxModal
      onGx-after-hide={closeModal}
      open={modal.show}
      className={classNames({
        [style['modal_creator']]: true,
        [style[modal.addClass]]: !!modal.addClass,
      })}
    >
      {modal.content}
    </GxModal>
  );
};

export default React.memo(StorControllerModal);
