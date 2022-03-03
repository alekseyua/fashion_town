import React, { useState, useEffect } from 'react';
import HelpText from '../../Views/HelpText';
import Text from '../Text';
import Input from '../../Views/Input';
import PersonalPageViews from '../../Views/PersonalPageViews';
import WarningBlock from '../../Views/WarningBlock';
import Button from '../../Views/Button';

const ModalDeleteAccount = ({ title, closeModal, deleteAccountSubmit }) => {
  const [reasonDeletion, setReasonDeletion] = useState(null);
  const handleChange = (e) => {
    setReasonDeletion(e.target.value);
  };
  return (
    <PersonalPageViews.ModalProfileViews title={title} closeModal={closeModal}>
      <WarningBlock
        variant={'wrapper'}
        textWarning={'Обратите внимание: данные удалятся безвозвратно!'}
      />
      <HelpText addClass={'profile'}>
        Вместе с аккаунтом мы удалим из системы вашу личную информацию, историю заказов и покупок.
      </HelpText>
      <Input
        value={reasonDeletion}
        name={'reasonDeletion'}
        variant={'largeCustomLabel'}
        onGx-input={handleChange}
        label={Text({ text: 'reason.for.deletion' })}
        placeholder={Text({ text: 'enter.text' })}
      />
      <PersonalPageViews.WrapperButtonBottom
        btnCancel={
          <Button
            onClick={() =>
              deleteAccountSubmit({
                comment: reasonDeletion,
              })
            }
            variant={'cancel-black-full'}
          >
            <Text text={'delete'} />
          </Button>
        }
        btnSuccess={
          <Button onClick={closeModal} variant={'cancel-black-border'}>
            <Text text={'cancellation'} />
          </Button>
        }
      />
    </PersonalPageViews.ModalProfileViews>
  );
};
export default React.memo(ModalDeleteAccount);
