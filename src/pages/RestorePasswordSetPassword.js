import React from 'react';
import Layout from '../Views';
import { RestorePasswordSetPassword } from '../components/Auth';

const RestorePasswordSetPasswordPage = (props) => {
  return (
    <Layout {...props}>
      <RestorePasswordSetPassword />
    </Layout>
  );
};

export default React.memo(RestorePasswordSetPasswordPage);
