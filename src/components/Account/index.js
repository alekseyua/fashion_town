import React, { useState } from 'react';
import { GxGrid, GxRow, GxCol } from '@garpix/garpix-web-components-react';
import { useStoreon } from 'storeon/react';
import { Authorization } from '../Auth';
import Orders from './Orders';
import AccountDetails from './AccountDetails';
import { Link } from 'react-router-dom';
import api from '../../api';
import { useIntl } from 'react-intl';

const Account = ({ site_configuration, orders }) => {
  const { locale } = useIntl();

  const { currentUser } = useStoreon('currentUser');
  const [showTab, setTab] = useState('orders');

  const handleShowTab = (e, tab) => {
    e.preventDefault();
    setTab(tab);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await api.logout();
    const { location } = window;

    location.href = `/${locale}`;
  };

  if (currentUser === null) return null;
  const { status } = currentUser;
  if (status === false) return <Authorization site_configuration={site_configuration} />;
  const { first_name } = currentUser;
  return (
    <div className="my-account white-bg p-5">
      <GxGrid>
        <div className="account-dashboard">
          <div className="dashboard-upper-info">
            <GxRow className="no-gutters align-items-center">
              <GxCol lg={3} md={6}>
                <div className="d-single-info">
                  <p className="user-name">
                    Добрый день, <span>{first_name}</span>
                  </p>
                </div>
              </GxCol>
              <GxCol lg={3} md={6}>
                <div className="d-single-info">
                  <p>Нужна Помощь?</p>
                  <p>admin@example.com.</p>
                </div>
              </GxCol>
              <GxCol lg={3} md={6}>
                <div className="d-single-info">
                  <p>Служба поддержки</p>
                  <p>support@example.com</p>
                </div>
              </GxCol>
              <GxCol lg={3} md={6}>
                <div className="d-single-info text-center">
                  <Link className="view-cart" to={site_configuration.cart_slug}>
                    Корзина
                  </Link>
                </div>
              </GxCol>
            </GxRow>
          </div>
          <GxRow>
            <GxCol lg={2}>
              {/* Nav tabs */}
              <ul className="nav flex-column dashboard-list" role="tablist">
                <li>
                  <Link 
                  onClick={(e) => handleShowTab(e, 'orders')} 
                  data-toggle="tab" 
                  to="#orders">
                    Заказы
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={(e) => handleShowTab(e, 'account-details')}
                    data-toggle="tab"
                    to="#account-details"
                  >
                    Персональные данные
                  </Link>
                </li>
                <li>
                  <Link onClick={handleLogout} to="#">
                    Выход
                  </Link>
                </li>
              </ul>
            </GxCol>
            <GxCol lg={10}>
              {/* Tab panes */}
              <div className="tab-content dashboard-content mt-all-40">
                <div
                  id="orders"
                  className={`tab-pane ${showTab === 'orders' ? 'active show' : 'fade'}`}
                >
                  <Orders orders={orders} />
                </div>
                <div
                  id="account-details"
                  className={`tab-pane ${showTab === 'account-details' ? 'active show' : 'fade'}`}
                >
                  <AccountDetails />
                </div>
              </div>
            </GxCol>
          </GxRow>
        </div>
      </GxGrid>
    </div>
  );
};

export default React.memo(Account);
