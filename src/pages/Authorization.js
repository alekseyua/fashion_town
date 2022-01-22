import React, { useState } from 'react';
import Layout from '../Views';
import Text from '../components/Text';
import { Authorization } from '../components/Auth';
import Modal from '../Views/ModalCreator';
const AuthorizationPage = (props) => {
  const [modalStates, setModalStates] = useState(Modal.defaultModalStates);
  return (
    <Layout title={Text({ text: 'authorization' })} {...props}>
      <Modal.ModalCreator {...modalStates} setModalStates={setModalStates} />
      <Authorization {...props} setModalStates={setModalStates} />
    </Layout>
  );
};

export default React.memo(AuthorizationPage);
