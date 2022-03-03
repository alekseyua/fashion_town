import React from 'react';
import { statusCancel, statusSend } from '../../images';
import { GxIcon } from '@garpix/garpix-web-components-react';
import classNames from 'classnames';
import style from './styles/index.module.scss';

const successMessesnge =
  'Условие минимального заказа выполнено! Размерный ряд одной модели в одном цвете';
const rejectMessenge =
  'Условие минимального заказа не выполнено! Размерный ряд одной модели в одном цвете';

const SuccesMinOrder = ({
  success = false,
  messenge = rejectMessenge,
}) => {
  return (
    <div
      className={classNames({
        [style['wrapper_order']]: true,
        [style['wrapper_order-success']]: success,
      })}
    >
      <GxIcon className={style['wrapper_order-icon']} src={success ? statusSend : statusCancel} />
      <span className={style['wrapper_order__messenge']}>{messenge}</span>
    </div>
  );
};

export default React.memo(SuccesMinOrder);
