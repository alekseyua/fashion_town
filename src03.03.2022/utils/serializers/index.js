import dayjs from '../dayjs';
import api from '../../api';

/**
 * @param {
 * companyName: ""
 * email: ""
 * facebook: ""
 * firstname: "qwe"
 * iAgreeDataProcessing: false
 * inn: ""
 * instagram: ""
 * lastname: "qwe"
 * username: "qwe"
 * password: ""
 * patronymic: "qwe"
 * phone: ""
 * receiveNewsletters: false
 * vk: ""
 * whereDidYouHearAboutService: ""
 * } values
 */
export const serializeDataRegistration = (values, role) => {
  for (const key in values) {
    const element = values[key];
    if (!element?.length) {
      values[key] = null;
    }
  }
  let data = {
    username: values.username,
    email: values.email,
    phone: values.phone,
    password: values.password,
    first_name: values.firstname,
    middle_name: values.patronymic,
    last_name: values.lastname,
    role: role,
    vk_link: values.vk,
    insta_link: values.instagram,
    other_link: values.other,
    inn: values.inn,
    organization: values.companyName,
    other_where_did_hear_about: values.otherWhereDidHearAbout,
    birthdate: dayjs(api.language, new Date()).format('DD.MM.YYYY'),
  };

  return data;
};

export const serializeErrorResponse = (response) => {
  let errorData = '';
  if (typeof response.data.error === 'string') {
    return response.data.error;
  } else {
    for (const key in response.data) {
      const element = response.data[key];
      element.forEach((errEl) => {
        errorData += `${errEl} `;
      });
    }
  }

  return errorData;
};

export const putUserDataSerializer = (data) => {
  return {
    first_name: data.firstname,
    middle_name: data.patronymic,
    last_name: data.lastname,
    email: data.email,
    inn: data.inn,
    organization: data.companyName,
    vk_link: data.vk,
    insta_link: data.instagram,
    other_link: data.otherSocialLink,
    site_link: data.addresSite,
    receive_newsletter: data.receiveNewsletters,
  };
};

export const getSelectedPhotoId = (data) => {
  const newData = [];
  data.forEach((element) => {
    if (element.selected) newData.push(element);
  });
  return newData;
};
