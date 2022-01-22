import React, { useState } from 'react';
import OrderingViews from '../../Views/OrderingViews';

const OrderingPay = ({ payment_methods, setFieldValue }) => {
  const [paymentsVariant, setpaymentsVariant] = useState(payment_methods);
  const setActiveVariantPayments = (event) => {
    const id = Number(event.target.id);
    const newPaymentsVariant = paymentsVariant.map((el) => {
      if (el.id === id) {
        setFieldValue('payment_methods', el.id);
        return {
          ...el,
          active: true,
        };
      } else {
        if (el.id === payment_methods) setFieldValue('payment_methods', null);
        return {
          ...el,
          active: false,
        };
      }
    });
    setpaymentsVariant(newPaymentsVariant);
  };
  return (
    <OrderingViews.OrderingPaySection>
      <OrderingViews.OrderingPayHead />
      <OrderingViews.OrderingPayDescription />
      <OrderingViews.OrderingPayButtons
        payment_methods={paymentsVariant}
        setActiveVariantPayments={setActiveVariantPayments}
      />
    </OrderingViews.OrderingPaySection>
  );
};

export default React.memo(OrderingPay);
