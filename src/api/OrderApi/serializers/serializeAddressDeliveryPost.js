const serializeAddressDeliveryPost = (data, profileId) => {
    return {
      profile: profileId,
      post_code: data.postcode,
      country: data.country,
      city: data.city,
      street: data.street,
      house: data.houseNumber,
      flat: data.apartamentNumber,
      first_name: data.firstname,
      middle_name: data.patronymic,
      last_name: data.lastname,
      phone: data.phone,
    };
  };
  export default serializeAddressDeliveryPost