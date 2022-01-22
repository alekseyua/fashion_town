import React from 'react';
import { GxInput, GxButton, GxIcon } from '@garpix/garpix-web-components-react';
import { paperclip, send } from '../../images';
import classNames from 'classnames';
import style from './styles/index.module.scss';

const SendChat = ({}) => {
  return (
    <div className={style['widget__chat_send']}>
      <div className={style['widget__chat_send_form']}>
        <GxInput
          className={style['widget__chat_send_input']}
          placeholder="Написать сообщение..."
        ></GxInput>
        <GxButton
          size="sm"
          className={classNames({
            [style['widget__chat_send_sendbtn']]: true,
            [style['widget__chat_send_btn']]: true,
          })}
        >
          <GxIcon src={paperclip} />
        </GxButton>
        <GxButton
          size="sm"
          className={classNames({
            [style['widget__chat_send_sendbtn']]: true,
            [style['widget__chat_send_btn']]: true,
          })}
        >
          <GxIcon src={send} />
        </GxButton>
      </div>
    </div>
  );
};

export default React.memo(SendChat);
