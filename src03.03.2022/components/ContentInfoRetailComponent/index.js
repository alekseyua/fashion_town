import React, { useEffect, useState } from 'react';
import { GxTabGroup, GxTab, GxTabPanel, GxForm } from '@garpix/garpix-web-components-react';
import Button from '../../Views/Button';
import MyShop from '../../Views/MyShopViews';
import { Formik } from 'formik';
import api from '../../api';
import { ERROR_STATUS } from '../../const';

const shopApi = api.shopApi;

const ContentInfoRetailComponent = ({ content }) => {
  const [state, setstate] = useState({
    info_delivery: null,
    info_delivery_photo: null,
    info_exchange: null,
    info_exchange_photo: null,
    info_juridical: null,
    info_juridical_photo: null,
    info_payment: null,
    info_payment_photo: null,
  });

  const getConfigData = () => {
    shopApi.getShopConfig().then((res) => {
      setstate({
        info_delivery: res.info_delivery,
        info_delivery_photo: res.info_delivery_photo,
        info_exchange: res.info_exchange,
        info_exchange_photo: res.info_exchange_photo,
        info_juridical: res.info_juridical,
        info_juridical_photo: res.info_juridical_photo,
        info_payment: res.info_payment,
        info_payment_photo: res.info_payment_photo,
      });
    });
  };

  const getAboutPhoto = (data) => {
    if (data instanceof File) {
      return URL.createObjectURL(data);
    }
    return data;
  };

  const onSaveFormData = (data, { setFieldError }) => {
    const fd = new FormData();
    for (const key in data) {
      const element = data[key];
      if (element) {
        fd.set(key, element);
      }
    }
    if (typeof data.info_delivery_photo === 'string') {
      fd.delete('info_delivery_photo');
    }
    if (typeof data.info_exchange_photo === 'string') {
      fd.delete('info_exchange_photo');
    }
    if (typeof data.info_juridical_photo === 'string') {
      fd.delete('info_juridical_photo');
    }
    if (typeof data.info_payment_photo === 'string') {
      fd.delete('info_payment_photo');
    }
    shopApi.updateShopConfig(fd).catch((err) => {
      if (err.response.status === ERROR_STATUS.BAD_REQUEST) {
        for (const key in err.response.data) {
          const element = err.response.data[key];
          setFieldError(key, element);
        }
      }
    });
  };

  useEffect(() => {
    getConfigData();
  }, []);

  return (
    <Formik enableReinitialize initialValues={state} onSubmit={onSaveFormData}>
      {({ handleSubmit, handleChange, setFieldValue, values, errors }) => {
        // console.log(
        //   `info_delivery
        // info_delivery_photo
        // info_exchange
        // info_exchange_photo
        // info_juridical
        // info_juridical_photo
        // info_payment
        // info_payment_photo`,
        //   values,
        // );
        return (
          <GxForm noValidate onGx-submit={handleSubmit}>
            <MyShop.Settings.WrapperSection>
              <MyShop.Settings.Head>Контент {'>'} Информация для покупателя</MyShop.Settings.Head>
              <MyShop.Settings.SectionContent>
                <GxTabGroup placement="bottom">
                  <div className="cabinet_myshop__tabs">
                    <GxTab class="cabinet_myshop__tab" slot="nav" panel="delivery">
                      ДОСТАВКА
                    </GxTab>
                    <GxTab class="cabinet_myshop__tab" slot="nav" panel="pay">
                      ОПЛАТА
                    </GxTab>
                    <GxTab class="cabinet_myshop__tab" slot="nav" panel="change">
                      ОБМЕН И ВОЗВРАТ
                    </GxTab>
                    <GxTab class="cabinet_myshop__tab" slot="nav" panel="info">
                      ЮРИДИЧЕСКАЯ ИНФОРМАЦИЯ
                    </GxTab>
                  </div>
                  {content ? (
                    <MyShop.Settings.TabInfo>
                      <div dangerouslySetInnerHTML={{ __html: content }}></div>
                    </MyShop.Settings.TabInfo>
                  ) : null}
                  <GxTabPanel name="delivery">
                    <MyShop.Settings.DeliveryTabPanel
                      info_delivery={values.info_delivery}
                      info_delivery_photo={values.info_delivery_photo}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                      getAboutPhoto={getAboutPhoto}
                    />
                  </GxTabPanel>
                  <GxTabPanel name="pay">
                    <MyShop.Settings.PayTabPanel
                      info_payment={values.info_payment}
                      info_payment_photo={values.info_payment_photo}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                      getAboutPhoto={getAboutPhoto}
                    />
                  </GxTabPanel>
                  <GxTabPanel name="change">
                    <MyShop.Settings.ChangeTabPanel
                      info_exchange={values.info_exchange}
                      info_exchange_photo={values.info_exchange_photo}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                      getAboutPhoto={getAboutPhoto}
                    />
                  </GxTabPanel>
                  <GxTabPanel name="info">
                    <MyShop.Settings.InfoTabPanel
                      info_juridical={values.info_juridical}
                      info_juridical_photo={values.info_juridical_photo}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                      getAboutPhoto={getAboutPhoto}
                    />
                  </GxTabPanel>
                </GxTabGroup>
                <MyShop.Settings.WrapperButtonSave>
                  <Button
                    type={'submit'}
                    variant={'cabinet_default'}
                    className="cabinet_myshop__tab_btn"
                  >
                    Применить
                  </Button>
                </MyShop.Settings.WrapperButtonSave>
              </MyShop.Settings.SectionContent>
            </MyShop.Settings.WrapperSection>
          </GxForm>
        );
      }}
    </Formik>
  );
};

export default React.memo(ContentInfoRetailComponent);
