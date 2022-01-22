import dayjs from '../../../utils/dayjs';
import Api from '../../../api';

const serializePaymentsProfile = (data) => {
  data.results = data.results.map((el) => {
    return {
      ...el,
      date: dayjs(Api.language, el.created_at).format('DD.MM.YYYY'),
    };
  });
  return data;
};
export default serializePaymentsProfile
// comment: ""
// cost: "12329.00"
// date: "2021-03-12T18:17:15.907981"
// id: 1049
// order: 1416
// profile: 112
// receipt: null
// requisites: "тест реквизиты !11111"
// status: 0