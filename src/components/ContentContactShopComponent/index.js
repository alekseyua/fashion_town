import React, { useState, useEffect } from 'react';
import Button from '../../Views/Button';
import { GxForm } from '@garpix/garpix-web-components-react';
import { Formik } from 'formik';
import MyShop from '../../Views/MyShopViews';
import api from '../../api';
import { ERROR_STATUS } from '../../const';

const shopApi = api.shopApi;
const orderApi = api.orderApi;

const ContentContactShopComponent = ({ content }) => {
  const [state, setstate] = useState({
    contacts_city: null,
    contacts_country: null,
    contacts_domofon: null,
    contacts_email: null,
    contacts_phone: null,
    contacts_post_code: null,
    contacts_social_fb: null,
    contacts_social_insta: null,
    contacts_social_vk: null,
    contacts_street: null,
    contacts_text: null,
    contacts_title: null,
  });
  const [counryOptions, setcounryOptions] = useState([]);

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
    console.log('формируем getConfigData список стран');

    orderApi.getCountry().then((countrys) => {
      setcounryOptions(countrys);
      shopApi.getShopConfig().then((res) => {
        setstate({
          contacts_city: res.contacts_city,
          contacts_country: getCountryValue(res.contacts_country, countrys),
          contacts_domofon: res.contacts_domofon,
          contacts_email: res.contacts_email,
          contacts_phone: res.contacts_phone,
          contacts_post_code: res.contacts_post_code,
          contacts_social_fb: res.contacts_social_fb,
          contacts_social_insta: res.contacts_social_insta,
          contacts_social_vk: res.contacts_social_vk,
          contacts_street: res.contacts_street,
          contacts_text: res.contacts_text,
          contacts_title: res.contacts_title,
        });
      });
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
              <MyShop.Settings.Head>Контент {'>'} Контакты</MyShop.Settings.Head>
              {content ? (
                <MyShop.Settings.TabInfo>
                  <div dangerouslySetInnerHTML={{ __html: content }}></div>
                </MyShop.Settings.TabInfo>
              ) : null}

              <MyShop.Settings.SectionContent>
                <MyShop.Settings.TabWrapper>
                  <MyShop.Settings.NameAndEmail
                    errors={errors}
                    contacts_title={values.contacts_title}
                    contacts_phone={values.contacts_phone}
                    contacts_email={values.contacts_email}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                  />
                  <MyShop.Settings.AddresFieldsContacts
                    errors={errors}
                    counryOptions={counryOptions}
                    contacts_city={values.contacts_city}
                    contacts_country={values.contacts_country}
                    contacts_domofon={values.contacts_domofon}
                    contacts_street={values.contacts_street}
                    contacts_post_code={values.contacts_post_code}
                    handleChange={handleChange}
                  />
                  <MyShop.Settings.SocialLinksContacts
                    errors={errors}
                    contacts_social_fb={values.contacts_social_fb}
                    contacts_social_insta={values.contacts_social_insta}
                    contacts_social_vk={values.contacts_social_vk}
                    contacts_text={values.contacts_text}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
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

export default React.memo(ContentContactShopComponent);
