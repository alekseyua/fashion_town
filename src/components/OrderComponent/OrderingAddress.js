import React, { useState, useEffect } from 'react';
import OrderingViews from '../../Views/OrderingViews';
import api from '../../api';
import ModalAddAddress from '../PersonalPageComponent/ModalAddAddress';
import { ROLE } from '../../const';

const orderApi = api.orderApi;
const OrderingAddress = ({
  role = 2,
  selectedAdress,
  setFieldValue,
  openModalAddAddress, 
  profileId,
  closeModal,
  setFieldCountry,
  handleChange,
}) => {
  const [adresses, setadresses] = useState([]);
  const getAdresses = () => {
    orderApi
      .getOrderAddressDeliviry()
      .then((res) => {
        setadresses(res.results);
      });
  };

  const updateAddressRenderData = () => {
    getAdresses();
    closeModal();
  };

  const decorOpenModalAddAddress = () => {
    const content = (
      <ModalAddAddress
        updateAddressRenderData={updateAddressRenderData}
        typeModal={'create'}
        profileId={profileId}
        closeModal={closeModal}
        initialData={{}}
      />
    );
    return openModalAddAddress(content);
  };

  const searchAddressRenderData = (data) => {
    orderApi
      .getOrderAddressSearch({ q: data })
      .then((res) => {
        setadresses(res);
      });
  };

  useEffect(() => {
    getAdresses();
  }, []);


  return (
    <OrderingViews.OrderingAddress>
      <OrderingViews.OrderingAddressHead />
      {/* Поиск по ФИО только для дропа */}
      {role === ROLE.DROPSHIPPER ? (
        <OrderingViews.OrderingAddressSearcheInput
          searchAddressRenderData={searchAddressRenderData}
        />
      ) : null}
      
      {adresses.map((res) => {
        const {
          city,
          country,
          first_name,
          flat,
          house,
          id,
          last_name,
          middle_name,
          phone,
          post_code,
          profile,
          street,
        } = res;
        return (
          <OrderingViews.OrderingAddressItem
            key={id}
            city={city}
            country={country}
            first_name={first_name}
            flat={flat}
            house={house}
            id={id}
            last_name={last_name}
            middle_name={middle_name}
            phone={phone}
            post_code={post_code}
            profile={profile}
            street={street}
            selectedAdress={selectedAdress}
            setFieldValue={setFieldValue}
            setFieldCountry={setFieldCountry}
            handleChange={handleChange}
          />
        );
      })}
      {/* Для розницы и опта максимум 3 адреса. Если их меньше, то появляется кнопка добавить адрес 
          У дропа кнопка есть всегда */}
    {
    (role !== ROLE.DROPSHIPPER && adresses.length > 2)
        ?null
        :<OrderingViews.OrderingAddressAddBtn onClick={decorOpenModalAddAddress} />
    }

    </OrderingViews.OrderingAddress>
  );
};

export default React.memo(OrderingAddress);
//export default OrderingAddress;