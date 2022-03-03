import React from 'react';
import Layout from '../Views';
import Checkout from '../components/Checkout';
import Modal from '../Views/ModalCreator';


const CheckoutPage = (props) => {  
  return (
    <Layout {...props}>
      <Modal.StorControllerModal />
      <Checkout {...props}/>
    </Layout>
  );
};

export default React.memo(CheckoutPage);
