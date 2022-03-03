import dayjs from '../../utils/dayjs';
import Api from '../../api';

const newsCardSerializer = (news) => {
  return news.map((el) => {
    return {
      ...el,
      title: el.title,
      image: el.image,
      created_at: dayjs(Api.language, el.created_at).format('DD MMMM YYYY'),
      // updated_at: dayjs(Api.language, el.updated_at).format('DD MMMM YYYY'),
      content: el.content,
      description: el.description,
      slug: el.slug,
      id: el.id,
      // is_active: el.is_active,
      // is_for_dropshipper: el.is_for_dropshipper,
      // is_for_retailer: el.is_for_retailer,
      // is_for_wholesaler: el.is_for_wholesaler,
    };
  });
};

export default newsCardSerializer;
// "id": 0,
// "title": "string",
// "url": "string",
// "created_at": "2021-03-17T11:55:49.760Z",
// "image": "string",
// "rubrics": "string"
