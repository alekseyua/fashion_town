import React from 'react';
import { closeNoFill, chatIcon } from '../../images';
import { GxButton, GxIcon } from '@garpix/garpix-web-components-react';
import style from './styles/index.module.scss';

const HeadChat = ({ toggleOpenChats }) => {
  return (
    <div className={style['widget__chat_head']}>
      <h4 className={style['widget__chat_head_text']}>Вопрос-ответ</h4>
      <div className={style['widget__chat_head_buttons']}>
        <GxButton className={style['"widget__chat_head_btn"']} variant="text" size="sm" circle>
          <GxIcon src={chatIcon} className={style['widget__chat_head_icon']} />
        </GxButton>
        <GxButton
          onClick={toggleOpenChats}
          className={style['widget__chat_head_btn']}
          variant="text"
          size="sm"
          circle
        >
          <GxIcon src={closeNoFill} className={style['widget__chat_head_icon']} />
        </GxButton>
      </div>
    </div>
  );
};

export default React.memo(HeadChat);
