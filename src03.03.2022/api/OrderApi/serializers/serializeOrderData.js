import dayjs from '../../../utils/dayjs';
import Api from '../../../api';

const serializeOrderData = (data) => {
  data.results = data.results.map((el) => {
    return {
      ...el,
      created_at: dayjs(Api.language, el.created_at).format('DD.MM.YYYY'),
      updated_at: dayjs(Api.language, el.updated_at).format('DD.MM.YYYY'),
    };
  });
  return data;
};
export default serializeOrderData
// address: {id: 77, profile: 146, post_code: "111111", country: 1, city: "Ереваново", street: "7-го Горбатого",…}
// city: "Ереваново"
// country: 1
// first_name: "Lo"
// flat: "1"
// house: "2"
// id: 77
// last_name: "Пи"
// middle_name: "Бубонович"
// phone: "1111111111111"
// post_code: "111111"
// profile: 146
// street: "7-го Горбатого"
// cart: 87
// created_at: "2021-03-10T15:31:25.854832"
// delivery_method: 51
// extra: {}
// id: 437
// payment_method: 21
// requisites: 48
// status: "created"
// total: null
// updated_at: "2021-03-10T15:31:25.854852"
