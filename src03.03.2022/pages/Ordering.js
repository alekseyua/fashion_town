import React from 'react';
import Layout from '../Views';
import { GxRow } from '@garpix/garpix-web-components-react';
import Container from '../Views/Container';
import OrderComponent from '../components/OrderComponent';
import { ROLE } from '../const';
import { useStoreon } from 'storeon/react';
import Modal from '../Views/ModalCreator';


const Ordering = (props) => {
  let {
    payment_methods,
    delivery_methods,
    cart_content,
    profile,
    role_configuration,
    site_configuration,
  } = props;

  return (
    <Layout main {...props}>
      <Modal.StorControllerModal />
      <Container>
        <GxRow>
          <OrderComponent
            payment_methods={payment_methods}
            delivery_methods={delivery_methods}
            cart_content={cart_content}
            profile={profile}
            role_configuration={role_configuration}
            site_configuration={site_configuration}
          />
        </GxRow>
      </Container>
    </Layout>
  );
};

export default React.memo(Ordering);
