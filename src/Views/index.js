import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import classNames from 'classnames';
import { GxIcon } from '@garpix/garpix-web-components-react';
import VidjetChatComponent from '../components/VidjetChatComponent';
import ButtonScrollTopComponent from '../components/ButtonScrollTopComponent';
import { useStoreon } from 'storeon/react';
import Modal from '../Views/ModalCreator';
import { useHistory } from 'react-router-dom';

const Layout = ({
  headerModClosed = false,
  main = false,
  responsive = false,
  children,
  title = 'Main title',
  description = '',
  main_menu,
  cabinet_menu, 
  header_menu,
  footer_menu,
  announce,
  site_configuration,
  role_configuration,
  currencies,
  year,
  policy,
  cartUpdate,
}) => {
const { userPage } = useStoreon('userPage');
let { profile } = userPage;
const history = useHistory();
const [modalStates, setModalStates] = useState(Modal.defaultModalStates);

if ( profile === undefined ){
  alert('page.profile === undefined of layout')
     window.location?.reload()
}
  const cabinet_data = {
    cart: cartUpdate.in_cart,
    notifications: profile.notifications
  };
  const mainClassModufy = classNames({
    main: main,
    responsive: responsive,
  });
  return (
    <>
      <Header
        headerModClosed={headerModClosed}
        header_menu={header_menu}
        main_menu={main_menu}
        site_configuration={userPage.site_configuration}
        announce={announce}
        cabinet_data={cabinet_data}
        profile={profile}
        cabinet_menu={cabinet_menu}
        currencies={currencies}
      />
         
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <main className={mainClassModufy}>
        <Modal.ModalCreator {...modalStates} setModalStates={setModalStates} />
        <Modal.StorControllerModal />
        <VidjetChatComponent />
        {children}
       <ButtonScrollTopComponent/>
      </main>
      <Footer
        year={year}
        policy={site_configuration.policy}
        footer_menu={footer_menu}
        role_configuration={role_configuration}
        site_configuration={site_configuration}
      />
    </>
  );
};


export default React.memo(Layout)