import React from 'react';
import { NavLink } from 'react-router-dom';
import Text from '../../components/Text';
import { COOKIE_KEYS, ROLE } from '../../const';
import PayModalContent from '../../components/BalanceComponent/PayModalContent';
import { getCookie } from '../../utils';
import Button from '../Button';
import api from '../../api';
import style from './styles/userRouting.module.scss';
import { useStoreon } from 'storeon/react';

const orderApi = api.orderApi;
const UserRoutingPanel = ({
  cabinet_menu = [],
  username = '',
  setModalStates,
}) => {
  const { dataBalance } = useStoreon('dataBalance');
  const { userPage } = useStoreon('userPage');
  const {role} = userPage.profile;
  const initialsName = `${username[0]}${username[username.length - 1]}`;

  const closeModal = () => {
    setModalStates({
      content: null,
      show: false,
      addClass: false,
    });
  };

  const openModalPay = () => {
    orderApi.getRandomRequizites().then((res) => {
      setModalStates({
        content: <PayModalContent closeModal={closeModal} requisites={res} />,
        show: true,
        addClass: 'modal-payments',
      });
    });
  };

  const checkRole = (role) => {
    switch (role) {
      case ROLE.DROPSHIPPER:
        return Text({ text: 'dropshipper' });
      case ROLE.WHOLESALE:
        return Text({ text: 'wholesaleBuyer' });
      case ROLE.RETAIL:
        return Text({ text: 'retailBuyer' });
    }
  };
  return (
    <div className={style['cabinet-sidebaruser']}>
      <div className={style['cabinet-sidebar__top']}>
        <div className={style['cabinet-sidebar__avawrap']}>
          <div className={style['cabinet-sidebar__avaname']}>{initialsName}</div>
        </div>
        <div className={style['cabinet-sidebar__userinfo']}>
          <div className={style['cabinet-sidebar__username']}>{username}</div>
          <div className={style['cabinet-sidebar__userrole']}>{checkRole(role)}</div>
        </div>
      </div>
      <div className={style['cabinet-sidebar__balancerow']}>
        <div className={style['cabinet-sidebar__balanceblock']}>
          <div className={style['cabinet-sidebar__balancelabel']}>
            <Text text={'balance'} />:
          </div>
          <div className={style['cabinet-sidebar__balancevalue']}>
            {dataBalance.balance}&nbsp;
            {getCookie(COOKIE_KEYS.CURRENCIES)}
          </div>
        </div>
        <div className={style['cabinet-sidebar__balancebtns']}>
          {/* <Button onClick={openModalPay} variant={'cabinet_border_accent'}>
            Пополнить
          </Button> */}
        </div>
      </div>
      <div className={style['cabinet-sidebar__menu']}>
        {cabinet_menu.map((el) => {
          return (
            <NavLink
              to={el.url ? el.url : '#'}
              key={el.id}
              className={style['cabinet-sidebar__menulink']}
              data-cy={`cabinet-sidebar${el.id}`}
            >
              {el.title}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
export default React.memo(UserRoutingPanel);
