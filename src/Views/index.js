import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import classNames from 'classnames';
import { GxIcon } from '@garpix/garpix-web-components-react';
import VidjetChatComponent from '../components/VidjetChatComponent';
import ButtonScrollTopComponent from '../components/ButtonScrollTopComponent';
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
  profile,
  site_configuration,
  role_configuration,
  currencies,
  year,
  policy,
  cartUpdate,
}) => {
//Views -> index

if ( profile === undefined ){
  window.location.reload();
}

  const cabinet_data = {
    // wishlist: profile.wishlist,
    cart: cartUpdate.in_cart,
    notifications: profile.notifications,
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
        site_configuration={site_configuration}
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