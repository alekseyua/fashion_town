import React, { useState } from 'react';
import Layout from '../Views';
import PersonalPageComponent from '../components/PersonalPageComponent';
import PersonalPageViews from '../Views/PersonalPageViews';
import Modal from '../Views/ModalCreator';
import MyReviewsComponent from '../components/MyReviewsComponent';
import MyReviewsViews from '../Views/MyReviewsViews';

const ReviewsPersonalPage = (props) => {
  const [modalStates, setModalStates] = useState(Modal.defaultModalStates);
  const { cabinet_menu, create_shop, cabinet_site_menu, profile_data, profile } = props;
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
            <MyReviewsViews.ProfileLevelData setModalStates={setModalStates} profile={profile.id} />
            <MyReviewsViews.WrapperHistory>
              <MyReviewsViews.HistoryHead />
              <MyReviewsComponent setModalStates={setModalStates} />
            </MyReviewsViews.WrapperHistory>
          </>
        }
      ></PersonalPageViews.WrapperPage>
    </Layout>
  );
};

export default React.memo(ReviewsPersonalPage);
{
  /* До чего же милое платьице👍👍👍!!! 👗👗👗👗 Не скажу, что сильно электризуется⚡️⚡️⚡️⚡️⚡️. 
  Ткань приятная 👌👍👍,
              интересный крой. Советую к покупке замечательное платье 👗👗👗🤍🖤🤍🖤💗 и цена огонь 😍 На параметры
              90*72*98 рост 170 заказала 46, село отлично и длинна рукавов идеальная. Можно было и
              меньше размер взять, но рукава были бы коротковаты. */
}
