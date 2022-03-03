import React, { useEffect, useState } from 'react';
import MyShop from '../../Views/MyShopViews';
import Button from '../../Views/Button';
import { Formik } from 'formik';
import { GxForm } from '@garpix/garpix-web-components-react';
import api from '../../api';
import { ERROR_STATUS } from '../../const';

const shopApi = api.shopApi;
const orderApi = api.orderApi;

const ShopFooterSettingsComponent = ({ content }) => {
  const [state, setstate] = useState({
    footer_city: null,
    footer_country: null,
    footer_domofon: null,
    footer_email: null,
    footer_logo: null,
    footer_phone: null,
    footer_policy: null,
    footer_post_code: null,
    footer_social_fb: null,
    footer_social_insta: null,
    footer_social_vk: null,
    footer_street: null,
  });
  const [counryOptions, setcounryOptions] = useState([]);

  const getCountryValue = (country, options) => {
    for (let i = 0; i < options.length; i++) {
      const element = options[i];
      if (element.title === country) {
        return element.id;
      }
    }
    return country;
  };

  const getConfigData = () => {
    orderApi.getCountry().then((countrys) => {
      setcounryOptions(countrys);
      shopApi.getShopConfig().then((res) => {
        setstate({
          footer_city: res.footer_city,
          footer_country: getCountryValue(res.footer_country, countrys),
          footer_domofon: res.footer_domofon,
          footer_email: res.footer_email,
          footer_logo: res.footer_logo,
          footer_phone: res.footer_phone,
          footer_policy: res.footer_policy,
          footer_post_code: res.footer_post_code,
          footer_social_fb: res.footer_social_fb,
          footer_social_insta: res.footer_social_insta,
          footer_social_vk: res.footer_social_vk,
          footer_street: res.footer_street,
        });
      });
    });
  };

  const onSaveFormData = (data, { setFieldError }) => {
    const fd = new FormData();
    fd.set('footer_city', data.footer_city);
    fd.set('footer_country', data.footer_country);
    fd.set('footer_domofon', data.footer_domofon);
    fd.set('footer_email', data.footer_email);
    fd.set('footer_phone', data.footer_phone);
    fd.set('footer_post_code', data.footer_post_code);
    fd.set('footer_social_fb', data.footer_social_fb);
    fd.set('footer_social_insta', data.footer_social_insta);
    fd.set('footer_social_vk', data.footer_social_vk);
    fd.set('footer_street', data.footer_street);

    if (typeof data.footer_policy !== 'string') {
      fd.set('footer_policy', data.footer_policy);
    }
    if (typeof data.footer_logo !== 'string') {
      fd.set('footer_logo', data.footer_logo);
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
              <MyShop.Settings.Head>Контент {'>'} Футер сайта</MyShop.Settings.Head>
              {content ? (
                <MyShop.Settings.TabInfo>
                  <div dangerouslySetInnerHTML={{ __html: content }}></div>
                </MyShop.Settings.TabInfo>
              ) : null}
              <MyShop.Settings.SectionContent>
                <MyShop.Settings.TabWrapper>
                  <MyShop.Settings.LogoAndPolit
                    errors={values.errors}
                    footer_logo={values.footer_logo}
                    footer_policy={values.footer_policy}
                    setFieldValue={setFieldValue}
                  />
                  <MyShop.Settings.AddresFields
                    errors={errors}
                    counryOptions={counryOptions}
                    footer_city={values.footer_city}
                    footer_country={values.footer_country}
                    footer_domofon={values.footer_domofon}
                    footer_street={values.footer_street}
                    footer_post_code={values.footer_post_code}
                    handleChange={handleChange}
                  />
                  <MyShop.Settings.PhoneAndEmail
                    errors={errors}
                    footer_phone={values.footer_phone}
                    footer_email={values.footer_email}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                  <MyShop.Settings.SocialLinks
                    errors={errors}
                    footer_social_vk={values.footer_social_vk}
                    footer_social_insta={values.footer_social_insta}
                    footer_social_fb={values.footer_social_fb}
                    handleChange={handleChange}
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

export default React.memo(ShopFooterSettingsComponent);
