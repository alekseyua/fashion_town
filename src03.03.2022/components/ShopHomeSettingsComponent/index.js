import React, { useEffect, useState } from 'react';
import MyShop from '../../Views/MyShopViews';
import Button from '../../Views/Button';
import { Formik } from 'formik';
import { GxForm } from '@garpix/garpix-web-components-react';
import api from '../../api';
import { ERROR_STATUS } from '../../const';

const shopApi = api.shopApi;

const ShopHomeSettingsComponent = ({ content }) => {
  const [state, setstate] = useState({
    main_banner_1: null,
    main_banner_2: null,
    main_banner_3: null,
    main_first_background: null,
    main_first_text: null,
  });
  const getConfigData = () => {
    shopApi.getShopConfig().then((res) => {
      setstate({
        main_banner_1: res.main_banner_1,
        main_banner_2: res.main_banner_2,
        main_banner_3: res.main_banner_3,
        main_first_background: res.main_first_background,
        main_first_text: res.main_first_text,
      });
    });
  };

  const onSaveFormData = (data, { setFieldError }) => {
    const fd = new FormData();
    fd.set('main_banner_1', data.main_banner_1);
    fd.set('main_banner_2', data.main_banner_2);
    fd.set('main_banner_3', data.main_banner_3);
    fd.set('main_first_background', data.main_first_background);
    fd.set('main_first_text', data.main_first_text);

    if (typeof data.main_first_background === 'string' || !data.main_first_background) {
      fd.delete('main_first_background');
    }
    if (typeof data.main_banner_1 === 'string' || !data.main_banner_1) {
      fd.delete('main_banner_1');
    }
    if (typeof data.main_banner_2 === 'string' || !data.main_banner_2) {
      fd.delete('main_banner_2');
    }
    if (typeof data.main_banner_3 === 'string' || !data.main_banner_3) {
      fd.delete('main_banner_3');
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

        return (
          <GxForm noValidate onGx-submit={handleSubmit}>
            <MyShop.Settings.WrapperSection>
              <MyShop.Settings.Head>Контент {'>'} Главная</MyShop.Settings.Head>
              {content ? (
                <MyShop.Settings.TabInfo>
                  <div dangerouslySetInnerHTML={{ __html: content }}></div>
                </MyShop.Settings.TabInfo>
              ) : null}
              <MyShop.Settings.SectionContent>
                <MyShop.Settings.HomeFormData
                  main_banner_1={values.main_banner_1}
                  main_banner_2={values.main_banner_2}
                  main_banner_3={values.main_banner_3}
                  main_first_background={values.main_first_background}
                  main_first_text={values.main_first_text}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
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

export default React.memo(ShopHomeSettingsComponent);
