import React from 'react';
import Layout from '../Views';
import Account from '../components/Account';
import Modal from '../Views/ModalCreator';

const AccountPage = (props) => {
  return (
    <Layout {...props}>
      <Modal.StorControllerModal />
      <Account {...props} />
    </Layout>
  );
};

export default React.memo(AccountPage);
