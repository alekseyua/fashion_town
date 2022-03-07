import { GxButton, GxIcon } from '@garpix/garpix-web-components-react';
import React, { useState } from 'react';
import style from './styles/index.module.scss';
import {toolTipIcon} from '../../images';
import ModalContentViews from '../ModalContentViews';
import Modal from '../../Views/ModalCreator';
const HeadChat = ({ setModalStates}) => {
  // const [modalStates, setModalStates] = useState(Modal.defaultModalStates);

  const closeModal = () => {
    setModalStates({
      content: null,
      show: false,
      addClass: null,
    });
  };
  const heandlerClickInfo = () => {
    setModalStates({
      content: (<>
        <ModalContentViews.CloseBtn closeModal={closeModal} />
        <p
          style={
            {
              fontSize: '18px',
              padding: '10px 25px',

            }
          }
        >
          Сообщения в этом чате отправляются и Менеджеру по закупкам и Менеджеру по упаковкам. Здесь можно писать общую информацию по заказу и вопросы
        </p>

      </>),
      show: true,
      addClass: 'modal-info-order',
    });
  }

  return (
    <div className={style['cabinet_orders_details__chat_head']}>
      <div className={style['cabinet_orders_details__paystatus']}>
        <GxButton
          circle
          size="sm"
          variant="info"
          className={style['cabinet_orders_details__tooltipicon']}
          onClick={heandlerClickInfo}
        >
          <GxIcon src={toolTipIcon} />
        </GxButton>
      </div>
      
      Чат по заказу
      <div className={style['cabinet_orders_details__chat_mobbtn']}>&#9660;</div>
    </div>
  );
};

export default React.memo(HeadChat);
