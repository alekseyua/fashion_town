import AbstractBaseApi from '../AbstractBaseApi';
import { serializeParamsisNull } from './serializers'

export default class ShopApi extends AbstractBaseApi {
  createShop = async (params = {}) => {
    const res = await this.post('/shop/shop/', params);
    return res;
  };
  updateShop = async (id, params = {}) => {
    const res = await this.put(`/shop/shop/${id}/`, params);
    return res;
  };
  getShopConfig = async (params = {}) => {
    const res = await this.get(`/shop/shop_config/`, params);
    return res.data;
  };
  updateShopConfig = async (params = {}) => {
    params = serializeParamsisNull(params);
    const res = await this.put(`/shop/update_shop_config/`, params);
    return res;
  };

  getShopPromocode = async (params = {}) => {
    const res = await this.get(`/shop/promocode/`, params);
    return res.data;
  };
  getShopPromocodeDetails = async (id, params = {}) => {
    const res = await this.get(`/shop/promocode/${id}/`, params);
    return res.data;
  };
  updateShopPromocode = async (id, params = {}) => {
    const res = await this.put(`/shop/promocode/${id}/`, params);
    return res.data;
  };
  createShopPromocode = async (params = {}) => {
    const res = await this.post(`/shop/promocode/`, params);
    return res.data;
  };
  deleteShopPromocode = async (id, params = {}) => {
    const res = await this.delete(`/shop/promocode/${id}/`, params);
    return res.data;
  };
}
