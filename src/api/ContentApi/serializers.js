import dayjs from '../../utils/dayjs';
import Api from '../../api';
import qs from 'qs';
import { v4 } from 'uuid';
/**
 * @param {*} data
 */
export const serializeCatalogProduct = (data) => {
  data.results = data.results.map((el) => {
    return {
      ...el,
      id: el.id,
      title: el.title,
      brand: el.brand,
      prices: el.prices,
      stock: el.stock,
      images: el.images,
      colors: el.colors,
      isSales: el.is_closeout,
      isNew: el.is_new,
      sizes: el.sizes,
      isHit: el.is_bestseller,
      favorite: el.is_liked,
      product_rc: el.product_rc,
    };
  });
  return data;
};

export const newsCardSerializer = (data) => {
  data.results = data.results.map((el) => {
    return {
      ...el,
      title: el.title,
      image: el.image,
      created_at: dayjs(Api.language, el.created_at).format('DD MMMM YYYY'),
      content: el.content,
      description: el.description,
      slug: el.slug,
      id: el.id,
    };
  });
  return data;
};

export const livePhotosCardSerializer = (data) => {
  data.results = data.results.map((el) => {
    return {
      ...el,
      created_at: dayjs(Api.language, el.created_at).format('DD.MM.YYYY'),
    };
  });
  return data;
};

export const serializeCatalogParams = (params) => {
  for (const key in params) {
    const element = params[key];
    if (Array.isArray(element)) {
      params[key] = params[key].join();
    }
  }
  return params;
};

export const paramsReviewSerializer = (data) => {
  const params = new FormData();
  for (const key in data.files) {
    const element = data.files[key];
    if (element instanceof File) params.append('files', element, element.name);
  }
  if (data.product) params.set('product', data.product);
  params.set('stars', data.stars);
  params.set('content', data.content);
  params.set('profile', data.profile);
  return params;
};

export const exportCatalogSerializer = (data) => {
  const newData = data;
  newData.results = data.results.map((el) => {
    return {
      ...el,
      id: v4(),
      selected: false,
    };
  });

  return newData;
};

export const allProductShopSerializer = (data) => {
  const newData = data;
  newData.results = data.results.map((el) => {
    return {
      ...el,
      selected: false,
    };
  });

  return newData;
};
