import { ErrorMessage } from 'formik';
import * as Yup from 'yup';

const phoneRegExp = /(7|8|1)((\D)[\-]?)?(^\s)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,12}$/;
const symbolReject = /^\D*\S\D$/;
const innRegExp = /\d{12}|\d{10}/;
const postcodeRegExp = /\d*/;
const passport_data = /^\d*\s\d*$/;

export const signInSchemaByPhone = (errorsMessenge) => {
  return Yup.object().shape({
    phone: Yup.string()
      .matches(phoneRegExp, errorsMessenge.notValidPass)
      .required(errorsMessenge.requiredField),
    password: Yup.string()
      .min(8, errorsMessenge.shortPass)
      .max(50, errorsMessenge.longPass)
      .required(errorsMessenge.requiredField),
    serverError: Yup.string(),
  });
};
export const signInSchemaByUsername = (errorsMessenge) => {
  return Yup.object().shape({
    username: Yup.string()
      .max(20, errorsMessenge.longUsername)
      .required(errorsMessenge.requiredField),
    password: Yup.string()
      .min(8, errorsMessenge.shortPass)
      .max(50, errorsMessenge.longPass)
      .required(errorsMessenge.requiredField),
    serverError: Yup.string(),
  });
};
export const userQuestionSchema = (errorsMessenge) => {
  return Yup.object().shape({
    fio: Yup.string()
      .trim()
      .nullable()
      .max(70, errorsMessenge.longfio)
      .required(errorsMessenge.requiredField),
    email: Yup.string()
      .nullable()
      .max(50, errorsMessenge.longEmail)
      .email(errorsMessenge.email)
      .required(errorsMessenge.requiredField),
    question: Yup.string()
      .nullable()
      .matches(symbolReject, errorsMessenge.symbol)
      .min(2, errorsMessenge.shortComments)
      .max(1250, errorsMessenge.longComments)
      .required(errorsMessenge.requiredField),
    // serverError: Yup.string(),
  });
};
export const signUpFirstFormSchema = (errorsMessenge) => {
  return Yup.object().shape({
    lastname: Yup.string()
      .nullable()
      .matches(symbolReject, errorsMessenge.symbol)
      .min(2, errorsMessenge.shortLastName)
      .max(20, errorsMessenge.longLastName)
      .required(errorsMessenge.requiredField),
    firstname: Yup.string()
      .nullable()
      .matches(symbolReject, errorsMessenge.symbol)
      .min(2, errorsMessenge.shortFirstname)
      .max(20, errorsMessenge.longFirstname)
      .required(errorsMessenge.requiredField),
    patronymic: Yup.string()
      .nullable()
      .matches(symbolReject, errorsMessenge.symbol)
      .min(2, errorsMessenge.shortPatronymic)
      .max(20, errorsMessenge.longPatronymic),
    username: Yup.string()
      .nullable()
      .min(2, errorsMessenge.shortusername)
      .max(20, errorsMessenge.longusername)
      .required(errorsMessenge.requiredField),
    iAgreeDataProcessing: Yup.boolean().oneOf([true]),
  });
};

export const signUpBaseInfoFormSchema = (errorsMessenge) => {
  // email_address
  // mobPhone
  // password
  // whereDidYouHearAboutService
  // receiveNewsletters
  return Yup.object().shape({
    email: Yup.string()
      .nullable()
      .email(errorsMessenge.email)
      .required(errorsMessenge.requiredField),
    phone: Yup.string()
      .nullable()
      .matches(phoneRegExp, errorsMessenge.phone)
      .required(errorsMessenge.requiredField),
    password: Yup.string()
      .nullable()
      .min(8, errorsMessenge.shortPass)
      .max(50, errorsMessenge.longPass)
      .required(errorsMessenge.requiredField),
    confirm_password: Yup.string()
      .nullable()
      .oneOf([Yup.ref('password'), null], errorsMessenge.confirm_password),
    whereDidYouHearAboutService: Yup.string().nullable(),
    receiveNewsletters: Yup.boolean().nullable().oneOf([true], errorsMessenge.requiredField),
  });
};

export const signUpSocialMediaFormSchema = (errorsMessenge) => {
  return Yup.object().shape({
    companyName: Yup.string()
      .nullable()
      .min(3, errorsMessenge.shortCompanyName)
      .required(errorsMessenge.requiredField),
    inn: Yup.string()
      .nullable()
      .matches(innRegExp, errorsMessenge.inn)
      .min(10, errorsMessenge.shortInn)
      .max(12, errorsMessenge.longInn)
      .required(errorsMessenge.requiredField),
    vk: Yup.string().nullable(),
    instagram: Yup.string().nullable(),
    facebook: Yup.string().nullable(),
  });
};

export const signUpSocialMediaNotRequiredFormSchema = (errorsMessenge) => {
  return Yup.object().shape({
    vk: Yup.string().nullable(),
    instagram: Yup.string().nullable(),
    facebook: Yup.string().nullable(),
  });
};

export const changeUserDataSchema = (errorsMessenge, isConcatReqFildsFromRole) => {
  let shapeObject = {
    lastname: Yup.string()
      .trim()
      .nullable()
      .max(20, errorsMessenge.longLastName)
      .required(errorsMessenge.requiredField),
    firstname: Yup.string()
      .trim()
      .nullable()
      .max(20, errorsMessenge.longFirstname)
      .required(errorsMessenge.requiredField),
    patronymic: Yup.string()
      .trim()
      .nullable()
      .max(20, errorsMessenge.longPatronymic)
      .required(errorsMessenge.requiredField),
    email: Yup.string()
      .nullable()
      .email(errorsMessenge.email)
      .required(errorsMessenge.requiredField),
    phone: Yup.string()
      .nullable()
      .matches(phoneRegExp, errorsMessenge.phone)
      .required(errorsMessenge.requiredField),
    receiveNewsletters: Yup.boolean(),
    vk: Yup.string().nullable(),
    instagram: Yup.string().nullable(),
    facebook: Yup.string().nullable(),
  };
  //при некоторых ролях эти поля есть а при некоторых нету
  if (isConcatReqFildsFromRole) {
    shapeObject.addresSite = Yup.string().nullable();
    // .required(errorsMessenge.requiredField);
    shapeObject.companyName = Yup.string()
      .nullable()
      .min(3, errorsMessenge.shortCompanyName)
      .required(errorsMessenge.requiredField);
    shapeObject.inn = Yup.string()
      .nullable()
      .matches(innRegExp, errorsMessenge.inn)
      .min(10, errorsMessenge.shortInn)
      .max(12, errorsMessenge.longInn)
      .required(errorsMessenge.requiredField);
  }

  return Yup.object().shape(shapeObject);
};

export const changeAddAddressSchema = (errorsMessenge) => {
  return Yup.object().shape({
    lastname: Yup.string()
      .nullable()
      .max(20, errorsMessenge.maxLengthField)
      .required(errorsMessenge.requiredField),
    firstname: Yup.string()
      .nullable()
      .max(20, errorsMessenge.maxLengthField)
      .required(errorsMessenge.requiredField),
    patronymic: Yup.string()
      .nullable()
      .max(20, errorsMessenge.maxLengthField)
      .required(errorsMessenge.requiredField),
    phone: Yup.string()
      .nullable()
      .max(20, errorsMessenge.maxLengthField)
      .matches(phoneRegExp, errorsMessenge.phone)
      .required(errorsMessenge.requiredField),
    country: Yup.string().nullable().required(errorsMessenge.requiredField),
    postcode: Yup.string()
      .nullable()
      .matches(postcodeRegExp, errorsMessenge.postcode)
      .max(20, errorsMessenge.maxLengthField)
      .required(errorsMessenge.requiredField),
    city: Yup.string()
      .nullable()
      .max(20, errorsMessenge.maxLengthField)
      .required(errorsMessenge.requiredField),
    street: Yup.string()
      .nullable()
      .max(20, errorsMessenge.maxLengthField)
      .required(errorsMessenge.requiredField),
    houseNumber: Yup.string()
      .nullable()
      .max(20, errorsMessenge.maxLengthField)
      .required(errorsMessenge.requiredField),
    apartamentNumber: Yup.string().nullable().max(20, errorsMessenge.maxLengthField),
  });
};
export const changePhoneSchema = (errorsMessenge, isShowFildKey) => {
  if (isShowFildKey) {
    return Yup.object().shape({
      key: Yup.string().nullable().required(errorsMessenge.requiredField),
    });
  }
  return Yup.object().shape({
    phone: Yup.string()
      .nullable()
      .matches(phoneRegExp, errorsMessenge.phone)
      .required(errorsMessenge.requiredField),
  });
};

export const changePasswordSchema = (errorsMessenge) => {
  return Yup.object().shape({
    currentPassword: Yup.string()
      .nullable()
      .min(8, errorsMessenge.shortPass)
      .max(50, errorsMessenge.longPass)
      .required(errorsMessenge.requiredField),
    newPassword: Yup.string()
      .nullable()
      .required(errorsMessenge.requiredField)
      .min(8, errorsMessenge.shortPass)
      .max(50, errorsMessenge.longPass)
      .notOneOf([Yup.ref('currentPassword')], errorsMessenge.newToOld),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], errorsMessenge.match)
      .nullable()
      .required(errorsMessenge.requiredField),
  });
};
export const orderCreatePasportAndDelivery = (errorsMessenge) => {
  const today = new Date();
  return Yup.object().shape({
    payment_methods: Yup.string().nullable().required(errorsMessenge.requiredField),

    variant: Yup.string().nullable().required(errorsMessenge.requiredField),
    lastname: Yup.string()
      .nullable()
      .matches(symbolReject, errorsMessenge.symbol)
      .min(2, errorsMessenge.shortLastName)
      .max(20, errorsMessenge.longLastName)
      .required(errorsMessenge.requiredField),
    firstname: Yup.string()
      .nullable()
      .matches(symbolReject, errorsMessenge.symbol)
      .min(2, errorsMessenge.shortFirstname)
      .max(20, errorsMessenge.longFirstname)
      .required(errorsMessenge.requiredField),
    patronomic: Yup.string()
      .nullable()
      .matches(symbolReject, errorsMessenge.symbol)
      .min(2, errorsMessenge.shortFirstname)
      .max(20, errorsMessenge.longFirstname)
      .required(errorsMessenge.requiredField),
    serias_and_number_passport: Yup.string()
      .nullable()
      .matches(passport_data, errorsMessenge.symbol)
      .required(errorsMessenge.requiredField),
    issued_passport: Yup.string()
      .nullable()
      .matches(symbolReject, errorsMessenge.symbol)
      .required(errorsMessenge.requiredField),
    issued_date: Yup.date().max(today).nullable().required(errorsMessenge.requiredField),
    comment: Yup.string()
      .nullable()
      .min(2, errorsMessenge.shortFirstname)
      .max(200, errorsMessenge.longFirstname),
    agree_personal_data: Yup.boolean(),
  });
};

export const createShopSheme = (errorsMessenge) => {
  return Yup.object().shape({
    nameIM: Yup.string()
      .nullable()
      .matches(symbolReject, errorsMessenge.symbol)
      .min(2, errorsMessenge.shortIM)
      .max(20, errorsMessenge.longIM)
      .required(errorsMessenge.requiredField),
    domain: Yup.string()
      .nullable()
      .matches(symbolReject, errorsMessenge.symbol)
      .min(2, errorsMessenge.shortDomain)
      .max(20, errorsMessenge.longDomain)
      .required(errorsMessenge.requiredField),
    comentsForDNS: Yup.string()
      .nullable()
      .matches(symbolReject, errorsMessenge.symbol)
      .min(2, errorsMessenge.shortComments)
      .max(20, errorsMessenge.longComments)
      .required(errorsMessenge.requiredField),
  });
};

export const payModalScheme = (errorsMessenge) => {
  // fio: null,
  // amountCredited: null,
  // comment: null,
  //! file: null,
  return Yup.object().shape({
    fio: Yup.string()
      .nullable()
      .matches(symbolReject, errorsMessenge.symbol)
      .required(errorsMessenge.requiredField),
    cost: Yup.string().nullable().required(errorsMessenge.requiredField),
    comment: Yup.string()
      .nullable()
      .matches(symbolReject, errorsMessenge.symbol)
      .min(2, errorsMessenge.shortComments)
      .max(250, errorsMessenge.longComments)
      .required(errorsMessenge.requiredField),
  });
};

export const FaqSchema = () => {
  return Yup.object().shape({
    name: Yup.string()
      .nullable()
      .min(2, 'Слишком короткое ФИО!')
      .max(100, 'Слишком длинное ФИО!')
      .required('Обязательное поле!'),
    email: Yup.string().nullable().email('Не валидный Email').required('Обязательное поле!'),
    category: Yup.string().required('Обязательное поле!'),
    question: Yup.string()
      .min(5, 'Слишком короткий вопрос!')
      .max(200, 'Слишком длинный вопрос!')
      .required('Обязательное поле!'),
  });
};

export const LeaveRequestsScheme = () => {
  return Yup.object().shape({
    email: Yup.string()
      .nullable()
      .min(2, 'Слишком короткое имя или Email')
      .max(100, 'Слишком длинное имя или Email')
      .required('Обязательное поле!'),
    comment: Yup.string()
      .nullable()
      .min(2, 'Слишком короткий комментарий!')
      .max(100, 'Слишком длинный комментарий!')
      .required('Обязательное поле!'),
  });
};

export const feedbackSheme = () => {
  return Yup.object().shape({
    problem_area: Yup.string().nullable().required('Обязательное поле!'),
    name: Yup.string()
      .nullable()
      .min(2, 'Слишком короткое имя!')
      .max(100, 'Слишком длинное имя!')
      .required('Обязательное поле!'),
    email: Yup.string().nullable().email('Не валидный Email!').required('Обязательное поле!'),
    message: Yup.string()
      .nullable()
      .min(2, 'Слишком короткое описание проблеммы!')
      .max(200, 'Слишком длинное описание проблеммы!')
      .required('Обязательное поле!'),
  });
};
export const confirmEmail = (errorsMessenge) => {
  return Yup.object().shape({
    email: Yup.string()
      .nullable()
      .email(errorsMessenge.email)
      .required(errorsMessenge.requiredField),
  });
};
