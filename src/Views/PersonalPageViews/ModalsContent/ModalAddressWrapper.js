import React from 'react';
import { GxSpinner } from '@garpix/garpix-web-components-react'
import style from '../styles/wrapper.module.scss';
import Text from '../../../components/Text';
import Button from '../../Button';

const ModalAddressWrapper = ({ children, closeModal, isSaved}) => {
  return (
    <div className="modal-wrap">
      <div onClick={closeModal} slot={"close-button"} className="modal-closebtn" data-cy={'modal_add_address_close_modal'}>
        <i></i>
      </div>
      <div className="modal-heading">Адрес доставки</div>
      <div className="modal-content">
        {children}
        <div className={style["cabinet-form__end"]}>
          <div className={style["cabinet-form__endleft"]}>
            <Button onClick={closeModal} type={'button'} variant={'cabinet_default_border'} data-cy={'modal_add_address_cancel_button'}>
              <Text text={'cancellation'} />
            </Button>
          </div>
          <div className={style['cabinet-form__endright']}>
            <Button type={'submit'} variant={'cabinet_default'} data-cy={'modal_add_address_save_button'}>
              <Text text={'save'} />
              {!isSaved ? <GxSpinner slot="icon-right" className="spiner" /> : null}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default React.memo(ModalAddressWrapper);
