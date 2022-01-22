import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
// require('dayjs/locale/en');
require('dayjs/locale/ru');
// require('dayjs/locale/pl');

dayjs.extend(customParseFormat);
export default (lang, date) => {
    dayjs.locale(lang);
  return dayjs(date);
};
