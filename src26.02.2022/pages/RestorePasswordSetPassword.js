import React from 'react';
import Layout from '../Views';
import { RestorePasswordSetPassword } from '../components/Auth';
import Modal from '../Views/ModalCreator';


const RestorePasswordSetPasswordPage = (props) => {
  return (
    <Layout {...props}>
      <Modal.StorControllerModal />
      <RestorePasswordSetPassword />
    </Layout>
  );
};

export default React.memo(RestorePasswordSetPasswordPage);
