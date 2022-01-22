import React, { useState } from 'react';
import { Registration } from '../components/Auth';
import Layout from '../Views';
import Text from '../components/Text';
import Modal from '../Views/ModalCreator';

const RegistrationPage = (props) => {
  const [modalStates, setModalStates] = useState(Modal.defaultModalStates);
  return (
    <Layout title={Text({ text: 'register' })} {...props}>
      <Modal.ModalCreator {...modalStates} setModalStates={setModalStates} />
      <Modal.StorControllerModal />
      <Registration {...props} setModalStates={setModalStates} />
    </Layout>
  );
};

export default React.memo(RegistrationPage);
