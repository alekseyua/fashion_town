import serializeAddressDelivery from './serializeAddressDelivery';
import serializeOrderData from './serializeOrderData';
import serializeAddressDeliveryPost from './serializeAddressDeliveryPost';
import serializePaymentsProfile from './serializePaymentsProfile';

const serializeOrderIsNullField = (data) => {
  const newData = {};
  for (const key in data) {
    const element = data[key];
    if (element !== null) newData[key] = element;
  }
  return newData;
};

export {
  serializeAddressDelivery,
  serializePaymentsProfile,
  serializeOrderData,
  serializeAddressDeliveryPost,
  serializeOrderIsNullField,
};
