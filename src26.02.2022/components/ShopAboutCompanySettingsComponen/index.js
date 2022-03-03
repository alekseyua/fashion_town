import React, { useEffect, useState } from 'react';
import MyShop from '../../Views/MyShopViews';
import Button from '../../Views/Button';
import { Formik } from 'formik';
import { GxForm } from '@garpix/garpix-web-components-react';
import api from '../../api';
import { ERROR_STATUS } from '../../const';

const shopApi = api.shopApi;

const ShopAboutCompanySettingsComponen = ({ content }) => {
  const [state, setstate] = useState({
    about_full_description: '',
    about_logo: null,
    about_photo: null,
    about_short_description: '',
  });
  const getConfigData = () => {
    shopApi.getShopConfig().then((res) => {
      setstate({
        about_full_description: res.about_full_description,
        about_logo: res.about_logo,
        about_photo: res.about_photo,
        about_short_description: res.about_short_description,
      });
    });
  };

  const onSaveFormData = (data, { setFieldError }) => {
    const fd = new FormData();
    fd.set('about_logo', data.about_logo);
    fd.set('about_photo', data.about_photo);
    fd.set('about_full_description', data.about_full_description);
    fd.set('about_short_description', data.about_short_description);
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
              <MyShop.Settings.Head>Контент {'>'} О компании</MyShop.Settings.Head>
              {content ? (
                <MyShop.Settings.TabInfo>
                  <div dangerouslySetInnerHTML={{ __html: content }}></div>
                </MyShop.Settings.TabInfo>
              ) : null}
              <MyShop.Settings.SectionContent>
                <MyShop.Settings.TabLogoUpload
                  about_full_description={values.about_full_description}
                  about_short_description={values.about_short_description}
                  about_logo={values.about_logo}
                  about_photo={values.about_photo}
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

export default React.memo(ShopAboutCompanySettingsComponen);
