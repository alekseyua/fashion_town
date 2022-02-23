import React, { useState, useEffect } from 'react';
import Layout from '../Views';
import Text from '../components/Text';
import InformationViews from '../Views/InformationViews';
import Title from '../Views/Title';
import Breadcrumbs from '../Views/Breadcrumbs';
import Container from '../Views/Container';
import { ROLE } from '../const';
import Modal from '../Views/ModalCreator';


const initialState = {
  retailPaymentsInfo: '',
  dropPaymentsInfo: '',
  woosalePaymentsInfo: '',
};

const InformationPayments = (props) => {
  const [state, setState] = useState({ initialState });
  const {
    cabinet_menu,
    create_shop,
    cabinet_site_menu,
    profile,
    info_payment,
    breadcrumbs = [],
  } = props;
  const { user = {}, shop = {}, role, passport, organization, links, balance } = profile;
  const { is_has_shop, shop_link } = shop;
  const { username = '' } = user;
  //todo: можно пропсом кастрировать футер


  useEffect(() => {
    let whosaleInfo, retailInfo, dropInfo;
    info_payment.forEach((el) => {
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
  }, [info_payment]);
  return (
    <Layout profile={profile} {...props}>
      <Modal.StorControllerModal />
      <Container>
        <InformationViews.PaymentsConteiner>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <Title variant={'information-payments__title'} type={'h1'}>
            <Text text={'info.payments'} />
          </Title>
          <InformationViews.PaymentsTextBlock>
            <InformationViews.PaymentsTitle>
              Для розничного покупателя
            </InformationViews.PaymentsTitle>
            <InformationViews.PaymentsDescription content={state.retailPaymentsInfo} />
          </InformationViews.PaymentsTextBlock>
          {role === ROLE.RETAIL || role === ROLE.UNREGISTRED ? null : (
            <>
              <InformationViews.PaymentsTextBlock>
                <InformationViews.PaymentsTitle>
                  Для оптового покупателя
                </InformationViews.PaymentsTitle>
                <InformationViews.PaymentsDescription content={state.woosalePaymentsInfo} />
              </InformationViews.PaymentsTextBlock>

              <InformationViews.PaymentsTextBlock>
                <InformationViews.PaymentsTitle>Для дропшиппера</InformationViews.PaymentsTitle>
                <InformationViews.PaymentsDescription content={state.dropPaymentsInfo} />
              </InformationViews.PaymentsTextBlock>
            </>
          )}
        </InformationViews.PaymentsConteiner>
      </Container>
    </Layout>
  );
};

export default React.memo(InformationPayments);
