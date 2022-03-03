import dayjs from '../../utils/dayjs';
import Api from '../../api';

const reviewsSerializer = (data) => {
  let results = {
    service_reviews: [],
    product_reviews: [],
  };
  const resultsCollector = (arr, key) => {
    arr.map((el) => {
      results[key].push({
        ...el,
        id: el.id,
        user: el.user,
        user_rating: el.user_rating,
        stars: el.stars,
        content: el.content,
        likes_count: el.likes_count,
        idLiked: false, //todo: как бек добавит поправь
        product: el.product,
        product_url: el.product_url,
        review_photos: el.review_photos,
        review_videos: el.review_videos,
        created_at: dayjs(Api.language, el.created_at).format('DD MMMM YYYY'),
        updated_at: dayjs(Api.language, el.updated_at).format('DD MMMM YYYY'),
      });
    });
  };

  resultsCollector(data.product_reviews, 'product_reviews');
  resultsCollector(data.service_reviews, 'service_reviews');
  return results;
};

const justDateSerializer = (data = []) => {
  return data.map((el) => {
    return {
      ...el,
      original_date_create: el.created_at,
      original_date_update: el.updated_at,
      created_at: dayjs(Api.language, el.created_at).format('DD MMMM YYYY'),
      updated_at: dayjs(Api.language, el.updated_at).format('DD MMMM YYYY'),
    };
  });
};

export default { reviewsSerializer, justDateSerializer };
