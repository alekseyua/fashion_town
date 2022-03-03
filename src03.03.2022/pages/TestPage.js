import React from 'react';
import { GxButton } from '@garpix/garpix-web-components-react';
import Layout from '../Views';
import Modal from '../Views/ModalCreator';


const TestPage = (props) => {
  return (
    <Layout {...props}>
      <Modal.StorControllerModal />
      <div style={{ height: '4000px' }}></div>
      <button className="button" type="button">
        button
      </button>
      <div style={{ height: '4000px' }}></div>
    </Layout>
  );
};

export default React.memo(TestPage);
