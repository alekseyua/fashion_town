import React from 'react';
import classNames from 'classnames';
import { GxButton, GxIcon, GxInput } from '@garpix/garpix-web-components-react';
import { paperclip, send } from '../../images';
import style from './styles/index.module.scss';

const SendChatBlock = ({
  handleSubmit,
  handleChange,
  setFieldValue,
  values,
  sendCommentFromTextField,
}) => {
  const fileInputRef = React.useRef();
  return (
    <div className={style['cabinet_orders_details__chat_send']}>
      <div className={style['cabinet_orders_details__chat_send_form']}>
        <GxInput
          value={values.text_field}
          name={'text_field'}
          // onKeyPress={(e) => {
          //   if (e.key === 'Enter') {
          //     sendCommentFromTextField(values, {
          //       resetForm: () => {
          //         setFieldValue('text_field', '');
          //         setFieldValue('file_list', []);
          //       },
          //     });
          //   }
          // }}
          onGx-change={handleChange}
          className={style['cabinet_orders_details__chat_send_input']}
          placeholder="Написать сообщение..."
        ></GxInput>
        <GxButton
          variant="text"
          size="sm"
          circle
          className={style['cabinet_orders_details__chat_send_btn']}
          onClick={(e) => {
            if (e.target.childNodes.length) {
              fileInputRef.current.click();
            }
          }}
        >
          <input
            multiple
            ref={fileInputRef}
            className={'hidden'}
            id="image"
            type="file"
            accept=".png, .jpg, .jpeg, .mp4"
            name={'file_list'}
            onChange={(event) => {
              const files = event.currentTarget.files;

              setFieldValue('file_list', files);
            }}
          />
          <GxIcon src={paperclip} />
          {values.file_list.length ? (
            <gx-badge type="warning" pill>
              {values.file_list.length}
            </gx-badge>
          ) : null}
        </GxButton>
        <GxButton
          type={'submit'}
          onClick={handleSubmit}
          variant="text"
          size="sm"
          circle
          className={style['cabinet_orders_details__chat_send_btn']}
        >
          <GxIcon src={send} />
        </GxButton>
      </div>
    </div>
  );
};

export default React.memo(SendChatBlock);
