import React from 'react';
import Button from '../Button';
import Text from '../../components/Text';
import { GxSpinner } from '@garpix/garpix-web-components-react';
import style from '../../Views/PersonalPageViews/styles/wrapper.module.scss';

const FormButtons = ({ closeModal, isSaved = false }) => {

//console.log('ModalContentViews -> FormButtons--!!!!  ')
  
  return (
    <div className={style['cabinet-form__end']}>
      <div className={style['cabinet-form__endleft']}>
        <Button
          onClick={closeModal}
          type={'button'}
          variant={'cabinet_default_border'}
          data-cy={'modal_add_address_cancel_button'}
        >
          <Text text={'cancellation'} />
        </Button>
      </div>
      <div className={style['cabinet-form__endright']}>
        <Button
          type={'submit'}
          variant={'cabinet_default'}
          data-cy={'modal_add_address_save_button'}
        >
          <Text text={'save'} />
          {isSaved ? <GxSpinner slot="icon-right" className="spiner" /> : null}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(FormButtons);
