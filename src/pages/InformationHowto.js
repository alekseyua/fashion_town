import React from 'react';
import Layout from '../Views';
import InformationViews from '../Views/InformationViews';
import Title from '../Views/Title';
import Breadcrumbs from '../Views/Breadcrumbs';
import Container from '../Views/Container';
import WorldStandardSizesChart from '../Views/WorldStandardSizesChart';
import { useStoreon } from 'storeon/react';
import Modal from '../Views/ModalCreator';


const InformationHowto = (props) => {
  const {
    cabinet_menu,
    create_shop,
    cabinet_site_menu,
    profile,
    breadcrumbs,
    components = [],
  } = props;
  const { user = {}, shop = {}, role, passport, organization, links, balance } = profile;
  const { is_has_shop, shop_link } = shop;
  const { username = '' } = user;
  const { dispatch, faq } = useStoreon('faq');

  //todo: можно пропсом кастрировать футер

  const openVidjet = () => {
    dispatch('faq/update', {
      show: true,
    });
  };
  return (
    <Layout profile={profile} {...props}>
      <Modal.StorControllerModal />
      <Container>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <InformationViews.PaymentsConteiner>
          <Title variant={'information-payments__title'} type={'h1'}>
            {components[0].title}
          </Title>
          <InformationViews.HowToWrapper>
            <InformationViews.BlockHowTo>
              <InformationViews.HowToDecription content={components[0].content} />
              <InformationViews.ImageWoman />
            </InformationViews.BlockHowTo>
            {/* таблица */}
            <WorldStandardSizesChart />
            {/* подпись под таблицей */}
            <InformationViews.HowToDecription modificatorClass={'small'}>
              Приведенные данные в таблице являются ориентиром для самостоятельного определения
              своего размера согласно мировым стандартам. Реальные размеры товаров, представленных
              на сайте, могут отличаться. Если вы затрудняетесь с определением своего размера,
              просьба обратиться в нашу техническую поддержку.
            </InformationViews.HowToDecription>

            {/* форма обратной связи */}
            <InformationViews.SubTitle>Форма обратной связи</InformationViews.SubTitle>
            <InformationViews.HowToDecription>
              Вы можете написать нам письменное обращение или оставить отзыв о работе магазина или
              компании. <br />
              Наши сотрудники отвечают в течение 3 дней.
            </InformationViews.HowToDecription>
            <InformationViews.Link is_link={false} onClick={openVidjet}>
              Написать нам
            </InformationViews.Link>
          </InformationViews.HowToWrapper>
        </InformationViews.PaymentsConteiner>
      </Container>
    </Layout>
  );
};

export default React.memo(InformationHowto);
