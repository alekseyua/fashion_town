import React, { useState } from 'react';
import Layout from '../Views';
import PersonalPageComponent from '../components/PersonalPageComponent';
import BalanceComponent from '../components/BalanceComponent';
import Modal from '../Views/ModalCreator';
import PersonalPageViews from '../Views/PersonalPageViews';
import { useStoreon } from 'storeon/react';

const BalancePage = (props) => {
  const [modalStates, setModalStates] = useState(Modal.defaultModalStates);
  //const { dataBalance } = useStoreon('dataBalance');
  const { cabinet_menu, create_shop, cabinet_site_menu, profile, dataBalance } = props;
  const { user = {}, shop, role, passport, organization, links } = profile;
  const { is_has_shop, shop_link } = shop;
  const { username = '' } = user;

  

  //todo: можно пропсом кастрировать футер
  return (
    <Layout main profile={profile} {...props}>
      <Modal.ModalCreator {...modalStates} setModalStates={setModalStates} />
      <Modal.StorControllerModal />
      <PersonalPageViews.WrapperPage
        leftChildComponent={
          <PersonalPageComponent.SidebarEntryPersonalPage
            shop={shop}
            create_shop={shop_link}
            is_has_shop={is_has_shop}
            cabinet_menu={cabinet_menu}
            cabinet_site_menu={cabinet_site_menu}
            dataBalance={dataBalance}
            username={username}
            role={role}
            setModalStates={setModalStates}
          />
        }
        rightChildComponent={
          <>
            <BalanceComponent.Balance
              role={role}
              dataBalance={dataBalance}
              setModalStates={setModalStates}
            />
            <BalanceComponent.WithdrawalFunds setModalStates={setModalStates} />
            <BalanceComponent.HistoryPayments />
          </>
        }
      ></PersonalPageViews.WrapperPage>
    </Layout>
  );
};

export default React.memo(BalancePage);
