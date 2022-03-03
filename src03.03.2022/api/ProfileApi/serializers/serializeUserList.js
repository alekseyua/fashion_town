import dayjs from '../../../utils/dayjs';
import Api from '../../../api';

const serializeUserList = (data) => {
  data.results = data.results.map((el) => {
    return {
      ...el,
      date_joined: dayjs(Api.language, el.date_joined).format('DD.MM.YYYY'),
      last_activity: dayjs(Api.language, el.last_activity).format('DD.MM.YYYY'),
    };
  });
  return data;
};
export default serializeUserList;
