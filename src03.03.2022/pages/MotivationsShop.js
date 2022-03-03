import React, { useState } from 'react';
import Layout from '../Views';
import PersonalPageComponent from '../components/PersonalPageComponent';
import BalanceComponent from '../components/BalanceComponent';
import Modal from '../Views/ModalCreator';
import PersonalPageViews from '../Views/PersonalPageViews';
import Text from '../components/Text';
import Button from '../Views/Button';
import { shoppingIcon } from '../images';

const MotivationsShop = (props) => {
  const [modalStates, setModalStates] = useState(Modal.defaultModalStates);
  const { cabinet_menu, create_shop, cabinet_site_menu, profile, content, site_configuration } =
    props;
  const { user = {}, shop, role, passport, organization, links, balance } = profile;
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
            balance={balance}
            username={username}
            role={role}
            setModalStates={setModalStates}
          />
        }
        rightChildComponent={
          <>
            <PersonalPageViews.WrapperForm>
              <PersonalPageViews.HeadingBlock title={'Интернет-магазин'} />
              <PersonalPageViews.ContentBlock>
                <PersonalPageViews.SmallTextGray>
                  <div dangerouslySetInnerHTML={{ __html: content }}></div>
                </PersonalPageViews.SmallTextGray>
              </PersonalPageViews.ContentBlock>
            </PersonalPageViews.WrapperForm>
            <PersonalPageViews.WrapperButton>
              <Button
                gxVariant={'link'}
                variant={'motivation-link_create_shop'}
                href={site_configuration.page_type_shop_create}
                iconLeft={shoppingIcon}
              >
                создать свой магазин
              </Button>
              <Button
                href={site_configuration.page_type_landing}
                full
                variant={'motivation-link_create_shop-empty'}
              >
                узнать подробнее
              </Button>
            </PersonalPageViews.WrapperButton>
          </>
        }
      ></PersonalPageViews.WrapperPage>
    </Layout>
  );
};

export default React.memo(MotivationsShop);
