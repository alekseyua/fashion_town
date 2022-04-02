import AbstractBaseApi from '../AbstractBaseApi';
import { productSerializer } from '../serializers';
import reviewsSerializer from '../serializers/reviewsSerializer';
import {
  serializeCatalogProduct,
  newsCardSerializer,
  livePhotosCardSerializer,
  serializeCatalogParams,
  paramsReviewSerializer,
  exportCatalogSerializer,
  allProductShopSerializer,
} from './serializers';
export default class ContentApi extends AbstractBaseApi {
  getCatalogData = async (params = {}) => {
    params = serializeCatalogParams(params);
    const res = await this.get('/catalog/product/', params);  
    return serializeCatalogProduct(res.data);
  };
  postLikes = async (params = {}) => {
    const res = await this.post('/content/likes/', params);
    return res;
  };
  postQuestion = async (params = {}) => {
    const res = await this.post('/content/faq_user_answer/', params);
    return res.data;
  };
  putLikes = async (id, params = {}) => {
    const res = await this.put(`/content/likes/${id}/`, params);
    return res;
  };
  getNews = async (params = {}) => {
    const res = await this.get('/content/news/', params);
    return newsCardSerializer(res.data);
  };
  getNewsDetails = async (id, params = {}) => {
    const res = await this.get(`/content/news/${id}/`, params);
    return res.data;
  };
  getLivePhotos = async (params = {}) => {
    const res = await this.get('/catalog/live_photo_album/', params);
    return livePhotosCardSerializer(res.data);
  };
  getLivePhotosAlbum = async (id, params = {}) => {
    const res = await this.get(`/catalog/live_photo_album/${id}/`, params);
    return livePhotosCardSerializer(res.data);
  };
  getCategory = async (params = {}) => {
    const res = await this.get('/catalog/category/', params);
    return res.data;
  };
  getBrands = async (params = {}) => {
    const res = await this.get('/catalog/brand/', params);
    return res.data;
  };

  getAnswers = async (params = {}) => {

    const res = await this.get('/content/faq/', params);
    return res.data;
  };
  getCategoryAnswer = async (params = {}) => {
    const res = await this.get('/content/question_category/', params);
    return res.data;
  };
  postAnswer = async (params = {}) => {
    const res = await this.post('/content/faq_user_question/', params);
    return res.data;
  };
  getColors = async (params = {}) => {
    const res = await this.get('/catalog/color/', params);
    return res.data;
  };
  getProductByIds = async (params = {}) => {
    params.ids = params.ids.join();
    const res = await this.get('/catalog/product/list_by_ids/', params);
    return res.data;
  };
  getReviews = async (params = {}) => {
    const res = await this.get('/content/review/', params);
    res.data.results = reviewsSerializer.justDateSerializer(res.data.results);
    return res.data;
  };
  postReviews = async (params = {}) => {
    const res = await this.post('/content/review/', paramsReviewSerializer(params));
    return res.data;
  };

  getProduct = async (id, params = {}) => {
    const res = await this.get(`/catalog/product/${id}/`, params);
    return res.data;
  };
  getMyReviewList = async (params = {}) => {
    const res = await this.get(`/content/review/cabinet_reviews_list/`, params);
    return res.data;
  };
  getPhotosListForExportCatalog = async (params = {}) => {
    const res = await this.get(`/catalog/product/photos_list/`, params);
    return exportCatalogSerializer(res.data);
  };
  getArchivePhotosFromExportCatalog = async (params = {}) => {
    const res = await this.post(`/catalog/product/download_photos/`, params);
    return res.data;
  };
  getShopAllProdut = async (params = {}) => {
    const res = await this.get(`/catalog/shop_product/main_catalog/`, params);
    return allProductShopSerializer(res.data);
  };
  addProdutInShop = async (params = {}) => {
    const res = await this.post(`/catalog/shop_product/`, params);
    return res.data;
  };
  getShopCategoryMarkup = async (params = {}) => {
    const res = await this.get(`/catalog/shop_category_markup/`, params);
    return res.data;
  };
  getMyProducFromMyShop = async (params = {}) => {
    const res = await this.get(`/catalog/shop_product/my_catalog/`, params);
    return res.data;
  };
  updateShopCategoryMarkup = async (id, params = {}) => {
    const res = await this.put(`/catalog/shop_category_markup/${id}/`, params);
    return res.data;
  };
  updateMyProductFromMyShop = async (id, params = {}) => {
    const res = await this.put(`/catalog/shop_product/${id}/`, params);
    return res.data;
  };
  deleteFromMyCatalog = async (params = {}) => {
    const res = await this.delete(`/catalog/shop_product/delete/`, params);
    return res.data;
  };
  postLivePhotoFeedback = async (params = {}) => {
    const res = await this.post(`/catalog/live_photo_feedback/`, params);
    return res.data;
  };
  getShopLivePhoto = async (params = {}) => {
    const res = await this.get(`/catalog/shop_live_photo/`, params);
    return res.data;
  };
  updateShopLivePhoto = async (params = {}) => {
    const res = await this.post(`/catalog/shop_live_photo/select_unselect_photos/`, params);
    return res.data;
  };
  getProblemArea = async (params = {}) => {
    const res = await this.get(`/content/problem_area/`, params);
    return res.data;
  };
  postFeedback = async (params = {}) => {
    const res = await this.post(`/content/common_feedback/`, params);
    return res.data;
  };
}
 