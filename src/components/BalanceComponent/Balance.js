import React from 'react';
import { statusSend, statusWait } from '../../images';
import Button from '../../Views/Button';
import Text from '../Text';
import api from '../../api';
import PersonalPageViews from '../../Views/PersonalPageViews';
import PayModalContent from './PayModalContent';
import { useStoreon } from 'storeon/react';
import { ROLE } from '../../const';
import { useHistory } from 'react-router-dom';


const orderApi = api.orderApi;
const Balance = ({ setModalStates, role }) => {
  const { currenssies } = useStoreon('currenssies'); //currenssies
  const { dataBalance } = useStoreon('dataBalance'); // данные баланса настроены
  const history = useHistory();
  
  
  const closeModal = () => { 
    setModalStates({
      content: null,
      show: false,
      addClass: false,
    });
 };

  const openModalPay = (e) => {
    e.preventDefault()
    orderApi.getRandomRequizites().then((res) => {
      setModalStates({
        content: <PayModalContent closeModal={closeModal} requisites={res} order_id={true} />,
        show: true,
        addClass: 'modal-payments',
      });
    });
  };

  return (
    <PersonalPageViews.WrapperForm>
      <PersonalPageViews.HeadingBlock title={Text({ text: 'balance' })} />
      <PersonalPageViews.ContentBlock>
        <PersonalPageViews.SmallTextGray>
          Вы можете пополнять баланс, <strong>после подтверждения</strong> зачисления денежных
          средств, администратор переводит их в статус <strong>«доступно»</strong>.
        </PersonalPageViews.SmallTextGray>
        <PersonalPageViews.BalanceItemsWrapper>
          <PersonalPageViews.BalanceItem
            greenText
            icon={statusSend}
            value={`${dataBalance.balance} ${String(currenssies).toUpperCase()}`}
            text={'Доступно'}
          />
          {ROLE.RETAIL !== role ? (
            <PersonalPageViews.BalanceItem
              icon={statusWait}
              value={`${dataBalance.passive_balance} ${String(currenssies).toUpperCase()}`}
              text={'К зачислению'}
            />
          ) : null}
        </PersonalPageViews.BalanceItemsWrapper>
        {ROLE.RETAIL !== role ? (
        <Button onClick={openModalPay} variant={'cabinet_default'}>
          пополнить баланс 
        </Button>
        ) : null}
      </PersonalPageViews.ContentBlock>
    </PersonalPageViews.WrapperForm>
  );
};

export default React.memo(Balance);
