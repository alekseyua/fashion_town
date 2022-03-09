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
  // profile,
  site_configuration,
  role_configuration,
  currencies,
  year,
  policy,
  cartUpdate,
}) => {
//Views -> index

const { userPage } = useStoreon('userPage');
let { profile } = userPage;
const [modalStates, setModalStates] = useState(Modal.defaultModalStates);
if ( profile === undefined ){
  // profile = {
  //   id: 216,
  //   user: {
  //     id: 623,
  //     is_active: true,
  //     username: 'drop',
  //     email: 'drop@i.ua',
  //     phone: '830681411990',
  //     first_name: 'drop',
  //     middle_name: 'drop',
  //     last_name: 'drop'
  //   },
  //   links: { vk_link: 'vk', insta_link: null, site_link: null },
  //   organization: { inn: null, organization: null },
  //   passport: {
  //     passport_number: null,
  //     passport_issued: null,
  //     passport_issue_date: null
  //   },
  //   role: 2,
  //   shop: { is_has_shop: false },
  //   addresses: [
  //     {
  //       id: 335,
  //       profile: 216,
  //       post_code: '49000',
  //       country: 'Украина',
  //       city: 'drop',
  //       street: 'drop',
  //       house: '1',
  //       flat: '1',
  //       first_name: 'drop',
  //       middle_name: 'drop',
  //       last_name: 'drop',
  //       phone: '+3823456789011'
  //     },
  //     {
  //       id: 336,
  //       profile: 216,
  //       post_code: '5555',
  //       country: 'Германия',
  //       city: 'drop2',
  //       street: '2',
  //       house: '2',
  //       flat: '2',
  //       first_name: 'drop2',
  //       middle_name: 'drop2',
  //       last_name: 'drop2',
  //       phone: '384564316'
  //     },
  //     {
  //       id: 337,
  //       profile: 216,
  //       post_code: '354165',
  //       country: 'Канада',
  //       city: 'JJH',
  //       street: 'JGF',
  //       house: '22',
  //       flat: '22',
  //       first_name: 'kgbkJHKH',
  //       middle_name: 'FHDT',
  //       last_name: 'bjhbk',
  //       phone: '4465673316531354'
  //     },
  //     {
  //       id: 338,
  //       profile: 216,
  //       post_code: '2323',
  //       country: 'Казахстан',
  //       city: 'xcxzczx',
  //       street: '22',
  //       house: '22',
  //       flat: '22222',
  //       first_name: 'www',
  //       middle_name: 'wwww',
  //       last_name: 'www',
  //       phone: '3080631744045'
  //     }
  //   ],
  //   balance: 19580,
  //   passive_balance: 0,
  //   status: 3,
  //   cart: 1,
  //   wishlist: 0,
  //   notifications: 0,
  //   receive_newsletter: true
  // }
   window.location?.reload()
}
// console.log('profile',profile)
  const cabinet_data = {
    // wishlist: profile.wishlist,
    cart: cartUpdate.in_cart,
    notifications: profile?.notifications
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
        site_configuration={userPage?.site_configuration}
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
        policy={site_configuration?.policy}
        footer_menu={footer_menu}
        role_configuration={role_configuration}
        site_configuration={site_configuration}
      />
    </>
  );
};


export default React.memo(Layout)