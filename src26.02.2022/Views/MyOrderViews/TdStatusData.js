import React from 'react';
import {
  infoWhite,
  statusWait,
  statusWork,
  statusCancel,
  statusCanceled,
  statusChange,
  statusPackage,
  statusClosed,
  statusOrdered,
  statusSend,
  statusPaid,
  statusReturn,
} from '../../images';
import classNames from 'classnames';
import style from './styles/index.module.scss';
import { GxIcon } from '@garpix/garpix-web-components-react';

const TdStatusData = ({ status = 'default', statusTitle = 'Название статуса' }) => {
  const statusIcon = {
    work: statusWork,
    created: statusOrdered,
    sended: statusSend,
    payment_waiting: statusSend,
    in_process: statusWait,
    packaging: statusPackage,
    delivery_payment_waiting: statusWork,
    closed: statusClosed,
    canceled: statusCancel,
    return: statusReturn,
    default: statusWait,
  };
  return (
    <div
      className={classNames({
        [style['cabinet-status']]: true,
        [style['cabinet-status--work']]: true,
      })}
    >
      <span className={style['cabinet-status__icon']}>
        <GxIcon src={statusIcon[status]} alt={statusTitle} />
      </span>
      <span
        className={classNames({
          [style['cabinet-status__title']]: true,
          [style[`cabinet-status__title--${status}`]]: true,
        })}
      >
        {statusTitle}
      </span>
    </div>
  );
};

export default React.memo(TdStatusData);
