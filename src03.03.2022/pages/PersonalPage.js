import React, { useState } from 'react';
import Layout from '../Views';
import PersonalPageComponent from '../components/PersonalPageComponent';
import PersonalPageViews from '../Views/PersonalPageViews';
import Modal from '../Views/ModalCreator';

const PersonalPage = (props) => {
  const [modalStates, setModalStates] = useState(Modal.defaultModalStates);
  const {
    cabinet_menu,
    create_shop,
    cabinet_site_menu,
    profile_data,
    profile,
    site_configuration,
  } = props;
  const { user = {}, shop, role, passport, organization, links, id, balance } = profile;
  const { is_has_shop, shop_link } = shop;
  const { username } = user;
  //todo: можно пропсом кастрировать футер

  return (
    <Layout responsive {...props}>
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
            balance={balance}
            username={username}
            role={role}
            setModalStates={setModalStates}
          />
        }
        rightChildComponent={
          <>
            <PersonalPageComponent.ContentEntryPersonalPage
              profile={profile}
              user={user}
              organization={organization}
              role={role}
              links={links}
              profileId={id}
              setModalStates={setModalStates}
              site_configuration={site_configuration}
            />
            <PersonalPageComponent.DeliveryAddresses
              profileId={profile.user.id}
              setModalStates={setModalStates}
            />

            {!is_has_shop ? (
              <PersonalPageViews.CreateStore
                className={'mobile'}
                role={role}
                create_shop={'/sozdanie-internet-magazina'} //create_shop
              />
            ) : null}
          </>
        }
      ></PersonalPageViews.WrapperPage>
    </Layout>
  );
};

export default React.memo(PersonalPage);
