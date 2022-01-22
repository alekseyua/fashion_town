import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import MyShopViews from '../../Views/MyShopViews/MyShop';
import { GxForm } from '@garpix/garpix-web-components-react';
import api from '../../api';

const orderApi = api.orderApi;

const PaymentDetailsFromMyMarket = ({}) => {
  const [requizites, setrequizites] = useState(null);
  const submitPaymentsDetails = (data, { resetForm }) => {
    orderApi.postRequizitesShop({ requisites: data.requzites }).then((res) => {
      setrequizites(res.data.requisites);
      resetForm();
    });
  };

  useEffect(() => {
    orderApi.getRequizitesShop().then((res) => {
      setrequizites(res.data.requisites);
    });
  }, []);
  return (
    <Formik
      onSubmit={submitPaymentsDetails}
      initialValues={{
        requzites: '',
      }}
    >
      {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }) => (
        <GxForm noValidate onSubmit={handleSubmit}>
          <MyShopViews.InfoBlock>
            <MyShopViews.InfoText content={requizites} />
          </MyShopViews.InfoBlock>
          <MyShopViews.ContentBlock />
          <MyShopViews.PaymentDetails
            handleSubmit={handleSubmit}
            values={values}
            setFieldValue={setFieldValue}
            handleChange={handleChange}
          />
        </GxForm>
      )}
    </Formik>
  );
};

export default React.memo(PaymentDetailsFromMyMarket);
