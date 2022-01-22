import React, { useState, useEffect } from 'react';
import Layout from '../Views';
import Text from '../components/Text';
import InformationViews from '../Views/InformationViews';
import Title from '../Views/Title';
import Breadcrumbs from '../Views/Breadcrumbs';
import Container from '../Views/Container';
import { ROLE } from '../const';

const initialState = {
  retailPaymentsInfo: '',
  dropPaymentsInfo: '',
  woosalePaymentsInfo: '',
};
const InformationDelivery = (props) => {
  const [state, setState] = useState({ initialState });
  const {
    cabinet_menu,
    create_shop,
    cabinet_site_menu,
    components,
    profile,
    breadcrumbs,
    info_delivery,
  } = props;
  const { user = {}, shop = {}, role, passport, organization, links, balance } = profile;
  const { is_has_shop, shop_link } = shop;
  const { username = '' } = user;
  //todo: можно пропсом кастрировать футер
  const retailData = components[0].children[0];
  const dropData = components[0].children[1];
  const whosaleData = components[0].children[2];
  useEffect(() => {
    let whosaleInfo, retailInfo, dropInfo;
    info_delivery.forEach((el) => {
      if (el.role === ROLE.WHOLESALE) {
        whosaleInfo = el.payment_info;
      } else if (el.role === ROLE.RETAIL) {
        retailInfo = el.payment_info;
      } else {
        dropInfo = el.payment_info;
      }
    });
    setState({
      retailPaymentsInfo: retailInfo,
      dropPaymentsInfo: dropInfo,
      woosalePaymentsInfo: whosaleInfo,
    });
  }, [info_delivery]);
  return (
    <Layout profile={profile} {...props}>
      <Container>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <InformationViews.PaymentsConteiner>
          <Title variant={'information-payments__title'} type={'h1'}>
            {components[0].title}
          </Title>
          <InformationViews.PaymentsTextBlock>
            <InformationViews.PaymentsTitle>{retailData.title}</InformationViews.PaymentsTitle>

            <InformationViews.PaymentsDescription>
              <div dangerouslySetInnerHTML={{ __html: retailData.content }}></div>
            </InformationViews.PaymentsDescription>
          </InformationViews.PaymentsTextBlock>
        </InformationViews.PaymentsConteiner>
        {role === ROLE.RETAIL || role === ROLE.UNREGISTRED ? null : (
          <React.Fragment>
            <InformationViews.PaymentsTextBlock>
              <InformationViews.PaymentsTitle>{whosaleData.title}</InformationViews.PaymentsTitle>

              <InformationViews.PaymentsDescription>
                <div dangerouslySetInnerHTML={{ __html: whosaleData.content }}></div>
              </InformationViews.PaymentsDescription>
            </InformationViews.PaymentsTextBlock>{' '}
            <InformationViews.PaymentsTextBlock>
              <InformationViews.PaymentsTitle>{dropData.title}</InformationViews.PaymentsTitle>

              <InformationViews.PaymentsDescription>
                <div dangerouslySetInnerHTML={{ __html: dropData.content }}></div>
              </InformationViews.PaymentsDescription>
            </InformationViews.PaymentsTextBlock>
          </React.Fragment>
        )}
      </Container>
    </Layout>
  );
};

export default React.memo(InformationDelivery);
