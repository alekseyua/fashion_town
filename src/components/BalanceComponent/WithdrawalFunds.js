import React from 'react';
import { infoAccent } from '../../images';
import Button from '../../Views/Button';
import Text from '../Text';
import PersonalPageViews from '../../Views/PersonalPageViews';
import GetMyCacheModalContent from './GetMyCacheModalContent';

const WithdrawalFunds = ({ setModalStates }) => {
  const closeModal = () => {
    setModalStates({
      content: null,
      show: false,
      addClass: false,
    });
  };

  const openModalGetMyCache = () => {
    setModalStates({
      content: <GetMyCacheModalContent closeModal={closeModal} />,
      show: true,
      addClass: 'modal-payments',
    });
  };

  return (
    <PersonalPageViews.WrapperForm>
      <PersonalPageViews.HeadingBlock title={'Вывод денежных средств'} />
      <PersonalPageViews.ContentBlock>
        <PersonalPageViews.SmallTextGray>
          Вы можете оплачивать покупки или вывести деньги на реквизиты банковского счета физического
          лица российского банка. Операция осуществляется в течение 3-5 дней.
        </PersonalPageViews.SmallTextGray>
        <PersonalPageViews.BalanceItemsWrapper>
          <PersonalPageViews.WarningHelpText
            icon={infoAccent}
            wraningText={
              'Только для РОЗНИЦЫ! Блок должен содержать текстовую информацию о политике возврата\n сервиса, форму заявки на возврат с кнопкой для прикрепления заявления на возврат'
            }
            linkText={'Заявление на возврат'}
            to={'#'}
          />
        </PersonalPageViews.BalanceItemsWrapper>
        <Button onClick={openModalGetMyCache} variant={'cabinet_default'}>
          вывести деньги
        </Button>
      </PersonalPageViews.ContentBlock>
    </PersonalPageViews.WrapperForm>
  );
};

export default React.memo(WithdrawalFunds);
