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
      <PersonalPageViews.HeadingBlock title={'Возврат денежных средств в связи с отменой заказа'} />
      <PersonalPageViews.ContentBlock>
        <PersonalPageViews.SmallTextGray>
          Согласно п.5 Договора оказания услуг по подбору и выкупу одежды (публичная оферта).
           Вы можете запросить возврат денежных средств,
           воспользовавшись формой ниже. Необходимо приложить скан заполненного заявления
        </PersonalPageViews.SmallTextGray>
        {/* <PersonalPageViews.BalanceItemsWrapper>
          <PersonalPageViews.WarningHelpText
            icon={infoAccent}
            wraningText={
              'Только для РОЗНИЦЫ! Блок должен содержать текстовую информацию о политике возврата\n сервиса, форму заявки на возврат с кнопкой для прикрепления заявления на возврат'
            }
            linkText={'Заявление на возврат'}
            to={'#'}
          />
        </PersonalPageViews.BalanceItemsWrapper> */}
        <Button onClick={openModalGetMyCache} variant={'cabinet_default'}  style={{minWidth: 211}}>
          Оформить возврат
        </Button>
      </PersonalPageViews.ContentBlock>
    </PersonalPageViews.WrapperForm>
  );
};

export default React.memo(WithdrawalFunds);
