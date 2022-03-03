import api from './api';

export const PATHS = {
  ALL: {
    path: '*',
    fetchInitialData: api.getPage,
  },
};
export const RE_CAPTHA_KEY = '6LcXhGwUAAAAAGiWdDTN_VYRMx2SWDVxmAaWGLYP';
export const DEFAULT_CURRENCIES = 'USD';
export const ONE_YEARS = 2592e3;
export const COOKIE_KEYS = {
  CURRENCIES: 'currency',
  AUTH: 'ft_token',
};
export const ACTIONS_KEY = {
  LOG_OUT: 'log_out',
};
//все доступные валюты на сайте
export const CURRENCIES_DATA = [
  {
    name: 'Zl',
    value: 'zl',
  },
  {
    name: 'Eur',
    value: 'eur',
  },
  {
    name: 'Usd',
    value: 'usd',
  },
  {
    name: 'Byn',
    value: 'byn',
  },
  {
    name: 'Yah',
    value: 'yah',
  },
  {
    name: 'Kzt',
    value: 'kzt',
  },
];

export const LANG_DATA = [
  {
    name: 'Ru',
    value: 'ru',
  },
  {
    name: 'Eng',
    value: 'en',
  },
  {
    name: 'Pl',
    value: 'pl',
  },
];

/**
 * (UNREGISTRED, 'Незарегистрированный пользователь'),
 * (RETAIL, 'Розничный покупатель'),
 * (DROPSHIPPER, 'Дропшиппер'),
 * (WHOLESALE, 'Оптовый покупатель'),
 */
// class STATUS:
//         UNREGISTRED = 0
//         AWAING_REGICTRATION_CONFIRM = 1
//         REGISTRATION_REJECTED = 2
//         REGISTRED = 3
//         TYPES = (
//             (UNREGISTRED, 'Незарегистрированный пользователь'),
//             (AWAING_REGICTRATION_CONFIRM, 'Ожидается подтверждение регистрации'),
//             (REGISTRATION_REJECTED, 'Отказ в регистрации'),
//             (REGISTRED, 'Зарегистрированный пользователь'),
//         )
export const ROLE = {
  UNREGISTRED: 0,
  RETAIL: 1,
  DROPSHIPPER: 2,
  WHOLESALE: 3, 
};

export const STATUS_FETCHER = {
  LOADING: 'loading',
  FAILED: 'failed',
  LOADED: 'loaded',
};

export const DEFAULT_PAGE_SIZE = 30;
export const DEFAULT_PAGE_COUNT_PAGINATION = 5;

export const LOCAL_STORAGE_KEYS = {
  WISHLIST: 'wishlist',
  ANNOUNCE: 'announce',
};

export const ERROR_STATUS = {
  FORBIDDEN: 403,
  BAD_REQUEST: 400,
  NO_ACCESS: 401,
};

export const SHOP_PAGE = {
  ALL_PRODUCTS: 'ALL_PRODUCTS',
  MY_PRODUCTS: 'MY_PRODUCTS',
};

export const STATUS_EQUARING = {
  SUCCESS: 'SUCCESS',
};
