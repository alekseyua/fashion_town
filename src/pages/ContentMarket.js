import React, { useState } from 'react';
import Layout from '../Views';
import PersonalPageViews from '../Views/PersonalPageViews';
import PersonalPageComponent from '../components/PersonalPageComponent';
import MyShopViews from '../Views/MyShopViews';
import { arrowRightBlack } from '../images';
import Modal from '../Views/ModalCreator';

const ContentMarket = (props) => {
  const [modalStates, setModalStates] = useState(Modal.defaultModalStates);
  const {
    header_menu,
    product,
    cabinet_menu,
    create_shop,
    cabinet_site_menu,
    profile_data,
    profile,
    cabinet_site_config_menu,
  } = props;
  const { user = {}, shop, role, passport, organization, links, id, balance } = profile;
  const { is_has_shop, shop_link } = shop;
  const { username } = user;
  return (
    <Layout {...props}>
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
            <MyShopViews.MyShop.MainBlock>
              <MyShopViews.MyShop.Header name={'Контент'} />
              <MyShopViews.MyShop.ContentBlock>
                <MyShopViews.MyShop.Wrapper>
                  {cabinet_site_config_menu.map((el) => {
                    return (
                      <MyShopViews.Content
                        name={el.title}
                        {...el}
                        arrowRightBlack={arrowRightBlack}
                      />
                    );
                  })}
                </MyShopViews.MyShop.Wrapper>
              </MyShopViews.MyShop.ContentBlock>
            </MyShopViews.MyShop.MainBlock>
          </>
        }
      ></PersonalPageViews.WrapperPage>
    </Layout>
  );
};

export default React.memo(ContentMarket);
