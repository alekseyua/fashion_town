import dayjs from '../../../utils/dayjs';
import Api from '../../../api';

const serializeNotifications = (data) => {
  data.results = data.results.map((el) => {
    return {
      ...el,
      created_at: dayjs(Api.language, el.created_at).format('DD MMMM, HH:MM'),
    };
  });
  return data;
};
export default serializeNotifications