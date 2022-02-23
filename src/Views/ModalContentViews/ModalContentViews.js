import React from 'react';
import { GxSpinner } from '@garpix/garpix-web-components-react';
import Text from '../../components/Text';
import Button from '../Button';
import ModalWrapper from './ModalWrapper';
import ContentBlock from './ContentBlock';
import CloseBtn from './CloseBtn';
import HeaderBlock from './HeaderBlock';
import style from '../PersonalPageViews/styles/wrapper.module.scss'

const ModalContentViews = ({ closeModal, title, isSaved = true, children, keyText = 'save' }) => {

  return (
    <ModalWrapper>
      <CloseBtn closeModal={closeModal} />
      <HeaderBlock title={title} />
      <ContentBlock>
        {children}
        <div className={style["cabinet-form__end"]}>
          <div className={style["cabinet-form__endleft"]}>
            <Button onClick={closeModal} type={'button'} variant={'cabinet_default_border'}>
              <Text text={'cancellation'} />
            </Button>
          </div>
          <div className={style["cabinet-form__endright"]}>
            <Button type={'submit'} variant={'cabinet_default'}>
              <Text text={keyText} />
              {!isSaved ? <GxSpinner slot="icon-right" className="spiner" /> : null}
            </Button>
          </div>
        </div>
      </ContentBlock>
    </ModalWrapper>
  );
};

export default React.memo(ModalContentViews);
