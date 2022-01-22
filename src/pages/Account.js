import React from 'react';
import Layout from '../Views';
import Account from '../components/Account';

const AccountPage = (props) => {
  return (
    <Layout {...props}>
      <Account {...props} />
    </Layout>
  );
};

export default React.memo(AccountPage);
