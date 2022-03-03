import React, { useState } from 'react';
import MyShopViews from '../../Views/MyShopViews/MyShop';
import { newPhoto } from '../../images';
import api from '../../api';

const shopApi = api.shopApi;

const MyShopSettingBlock = ({ domain, logo, shop_title, shop_id }) => {
  const [stateShopSetting, setstateShopSetting] = useState({
    logo: logo,
  });
  const updateLogo = (logo) => {
    const fd = new FormData();
    fd.set('logo', logo);
    shopApi.updateShop(shop_id, fd).then((res) => {
      setFieldValue('logo', res.logo);
    });
  };

  const handleClickDeleteLogo = () => {
    updateLogo(null);
  };

  const setFieldValue = (key, value) => {
    setstateShopSetting({ [key]: value });
    updateLogo(value);
  };

  return (
    <MyShopViews.MainBlock>
      <MyShopViews.Header name={'Настройки'} />
      <MyShopViews.ContentBlock>
        <MyShopViews.Wrapper>
          <MyShopViews.SettingBlock
            title={'Логотип'}
            value={'Удалить'}
            button={true}
            defaultImageMarketInfo={stateShopSetting.logo}
            newPhoto={newPhoto}
            setFieldValue={setFieldValue}
            handleClick={handleClickDeleteLogo}
          />
          <MyShopViews.SettingBlock title={'Название интернет-магазина'} value={shop_title} />
          <MyShopViews.SettingBlock title={'Доменное имя сайта'} value={domain} />
        </MyShopViews.Wrapper>
      </MyShopViews.ContentBlock>
    </MyShopViews.MainBlock>
  );
};

export default React.memo(MyShopSettingBlock);
