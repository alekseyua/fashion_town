import React, { useEffect, useState } from 'react';
import MyShop from '../../Views/MyShopViews';
import Button from '../../Views/Button';
import { Formik } from 'formik';
import { GxForm, GxInput } from '@garpix/garpix-web-components-react';
import api from '../../api';
import { ERROR_STATUS } from '../../const';

const shopApi = api.shopApi;
const ShopDeliverySettingsComponent = ({ content }) => {
  const [state, setstate] = useState({
    delivery_method_1_price: null,
    delivery_method_1_title: null,
    delivery_method_2_price: null,
    delivery_method_2_title: null,
    delivery_method_3_price: null,
    delivery_method_3_title: null,
  });

  const getConfigData = () => {
    shopApi.getShopConfig().then((res) => {
      setstate({
        delivery_method_1_price: res.delivery_method_1_price,
        delivery_method_1_title: res.delivery_method_1_title,
        delivery_method_2_price: res.delivery_method_2_price,
        delivery_method_2_title: res.delivery_method_2_title,
        delivery_method_3_price: res.delivery_method_3_price,
        delivery_method_3_title: res.delivery_method_3_title,
      });
    });
  };

  const onSaveFormData = (data, { setFieldError }) => {
    shopApi.updateShopConfig(data).catch((err) => {
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

        return (
          <GxForm noValidate onGx-submit={handleSubmit}>
            <MyShop.Settings.WrapperSection>
              <MyShop.Settings.Head>Контент {'>'} Способы доставки</MyShop.Settings.Head>
              {content ? (
                <MyShop.Settings.TabInfo>
                  <div dangerouslySetInnerHTML={{ __html: content }}></div>
                </MyShop.Settings.TabInfo>
              ) : null}
              <MyShop.Settings.SectionContent>
                <MyShop.Settings.TabWrapper>
                  <MyShop.Settings.DeliveryVariant
                    handleChange={handleChange}
                    nameTitle={'delivery_method_1_title'}
                    namePrice={'delivery_method_1_price'}
                    valueTitle={values.delivery_method_1_title}
                    valuePrice={values.delivery_method_1_price}
                    title={'Способ Доставки №1'}
                  />
                  <MyShop.Settings.DeliveryVariant
                    handleChange={handleChange}
                    nameTitle={'delivery_method_2_title'}
                    namePrice={'delivery_method_2_price'}
                    valueTitle={values.delivery_method_2_title}
                    valuePrice={values.delivery_method_2_price}
                    title={'Способ Доставки №2'}
                  />
                  <MyShop.Settings.DeliveryVariant
                    handleChange={handleChange}
                    nameTitle={'delivery_method_3_title'}
                    namePrice={'delivery_method_3_price'}
                    valueTitle={values.delivery_method_3_title}
                    valuePrice={values.delivery_method_3_price}
                    title={'Способ Доставки №3'}
                  />
                </MyShop.Settings.TabWrapper>
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

export default React.memo(ShopDeliverySettingsComponent);
