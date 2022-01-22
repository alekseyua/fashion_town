import React, { useState, useEffect } from 'react';
import api from '../../api';
import PersonalPageViews from '../../Views/PersonalPageViews';
import { GxForm, GxSelect, GxMenuItem, GxIcon } from '@garpix/garpix-web-components-react';
import Input from '../../Views/Input';
import Select from '../../Views/Select';
import { Formik } from 'formik';
import { changeAddAddressSchema } from '../../utils/schemesFormic';
import Text from '../Text';
import ErrorField from '../../Views/ErrorField';

const apiOrder = api.orderApi;
const defaultParamsInitData = {
  city: null,
  country: null,
  first_name: null,
  flat: null,
  id: null,
  last_name: null,
  middle_name: null,
  phone: null,
  post_code: null,
  profile: null,
  street: null,
  house: null,
};
const ModalAddAddress = ({
  initialData = defaultParamsInitData,
  closeModal,
  profileId,
  typeModal,
  updateAddressRenderData,
  closeAdress,
  
}) => {

  const [isSaved, setIsSaved] = useState(true);
  const [initialValues, setInititalValues] = useState(defaultParamsInitData);
  const [countryOptions, setCountryOptions] = useState([
    {
      title: 'Российская федерация',
      value: 1,
    },
    {
      title: 'Беларусия',
      value: 2,
    },
    {
      title: 'Украина',
      value: 3,
    },
    {
      title: 'Казахстан',
      value: 4,
    },
  ]);
  const errorsMessenge = {
    shortLastName: Text({ text: 'short.last.name' }),
    longLastName: Text({ text: 'longLastName' }),
    requiredField: Text({ text: 'requiredField' }),
    longFirstname: Text({ text: 'long.first.name' }),
    longPatronymic: Text({ text: 'long.patronymic' }),
    phone: Text({ text: 'invalid.phone' }),
    postcode: Text({ text: 'invalid.postcode' }),
    maxLengthField: Text({ text: 'max.length.field' }),
  };
  const createAddress = (data) => {
    apiOrder
      .postOrderAddressDeliviry(data, profileId)
      .then((res) => {
        closeModal();
        setIsSaved(true);
        setInititalValues(defaultParamsInitData);
        updateAddressRenderData();
      })
      .catch(err=>console.error(`ERROR createAddress`,err));
  };
  const updateAddress = (data) => {
    apiOrder
      .putByIdOrderAddressDeliviry(initialData.id, data)
      .then((res) => {
        setIsSaved(true);
        setInititalValues(defaultParamsInitData);
        updateAddressRenderData();
        closeModal();
      })
      .catch(err=>console.error(`ERROR updateAddress`,err));
  };
  const onSubmit = (data) => {
    if (typeModal === 'create') {
      return createAddress(data);
    } else if (typeModal === 'change') {
      return updateAddress(data);
    }
  };

  useEffect(() => {
    setInititalValues({
      lastname: initialData.last_name,
      firstname: initialData.first_name,
      patronymic: initialData.middle_name,
      phone: initialData.phone,
      country: initialData.country,
      postcode: initialData.post_code,
      city: initialData.city,
      street: initialData.street,
      houseNumber: initialData.house,
      apartamentNumber: initialData.flat,
    });
  }, [initialData]);

  useEffect(() => {
    apiOrder.getCountry().then((res) => {
      //console.log('формируем список стран',res);
      setCountryOptions(
        res.map((el) => {
          return {
            value: el.id,
            title: el.title,
          };
        }),
      );
    })
    .catch(err=>console.error(`ERROR getCountry`,err));
  }, []);
  
  return (
    <Formik
      enableReinitialize
      validationSchema={changeAddAddressSchema(errorsMessenge)}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, handleChange, values, errors, setFieldValue, touched }) => {
        return (
          <GxForm novalidate onGx-submit={handleSubmit}>
            <PersonalPageViews.ModalAddressWrapper isSaved={isSaved} closeModal={closeModal}>
              <PersonalPageViews.FormRow>
                <PersonalPageViews.FormColl>
                  <PersonalPageViews.FormGroup>
                    <Input
                      value={values.lastname}
                      name={'lastname'}
                      onGx-input={handleChange}
                      className={errors.lastname && touched.lastname ? 'error' : ''}
                      helpText={
                        errors.lastname && touched.lastname ? (
                          <ErrorField message={errors.lastname} />
                        ) : null
                      }
                      label={Text({ text: 'lastname' })}
                      placeholder={Text({ text: 'enterLastName' })}
                      data-cy={'modal_add_address_lastname'}
                    />
                  </PersonalPageViews.FormGroup>
                  <PersonalPageViews.FormGroup>
                    <Input
                      value={values.firstname}
                      name={'firstname'}
                      onGx-input={handleChange}
                      className={errors.firstname && touched.firstname ? 'error' : ''}
                      helpText={
                        errors.firstname && touched.firstname ? (
                          <ErrorField message={errors.firstname} />
                        ) : null
                      }
                      label={Text({ text: 'firstname' })}
                      placeholder={Text({ text: 'enterFirstName' })}
                      data-cy={'modal_add_address_firstname'}
                    />
                  </PersonalPageViews.FormGroup>
                  <PersonalPageViews.FormGroup>
                    <Input
                      value={values.patronymic}
                      name={'patronymic'}
                      onGx-input={handleChange}
                      className={errors.patronymic && touched.patronymic ? 'error' : ''}
                      helpText={
                        errors.patronymic && touched.patronymic ? (
                          <ErrorField message={errors.patronymic} />
                        ) : null
                      }
                      label={Text({ text: 'patronymic' })}
                      placeholder={Text({ text: 'enterPatronymic' })}
                      data-cy={'modal_add_address_patronymic'}
                    />
                  </PersonalPageViews.FormGroup>
                  <PersonalPageViews.FormGroup>
                    <Input
                      value={values.phone}
                      name={'phone'}
                      autocomplete={'off'}
                      onGx-input={handleChange}
                      className={errors.phone && touched.phone ? 'error' : ''}
                      helpText={
                        errors.phone && touched.phone ? <ErrorField message={errors.phone} /> : null
                      }
                      label={Text({ text: 'mobPhone' })}
                      placeholder={Text({ text: 'enterPhone' })}
                      data-cy={'modal_add_address_phone'}
                    />
                  </PersonalPageViews.FormGroup>
                </PersonalPageViews.FormColl>
                <PersonalPageViews.FormColl>
                  <PersonalPageViews.FormGroup>
                    {/* <GxSelect>
                      {countryOptions.map((el, i) => {
                        const { title, value } = el;
                        return (
                          <GxMenuItem key={i} value={value}>
                            {title}
                          </GxMenuItem>
                        );
                      })}
                    </GxSelect> */}
                    <Select
                      className={'select-default'}
                      value={values.country}
                      variant={'largeCustomLabel'}
                      name={'country'}
                      placeholder={Text({ text: 'enter.country' })}
                      label={Text({ text: 'country' })}
                      onGx-change={(e) => setFieldValue('country', e.target.value)}
                      options={countryOptions}
                      data-cy={'modal_add_address_country'}
                    >
                      {errors.country && touched.country ? (
                        <ErrorField slot={'help-text'} message={errors.country} />
                      ) : null}
                    </Select>
                  </PersonalPageViews.FormGroup>
                  <PersonalPageViews.FormGroup>
                    <Input
                      value={values.postcode}
                      name={'postcode'}
                      onGx-input={handleChange}
                      className={errors.postcode && touched.postcode ? 'error' : ''}
                      helpText={
                        errors.postcode && touched.postcode ? (
                          <ErrorField message={errors.postcode} />
                        ) : null
                      }
                      label={Text({ text: 'postcode' })}
                      placeholder={Text({ text: 'enter.postcode' })}
                      data-cy={'modal_add_address_postcode'}
                    />
                  </PersonalPageViews.FormGroup>
                  <PersonalPageViews.FormGroup>
                    <Input
                      value={values.city}
                      name={'city'}
                      onGx-input={handleChange}
                      className={errors.city && touched.city ? 'error' : ''}
                      helpText={
                        errors.city && touched.city ? <ErrorField message={errors.city} /> : null
                      }
                      label={Text({ text: 'city' })}
                      placeholder={Text({ text: 'enter.city' })}
                      data-cy={'modal_add_address_city'}
                    />
                  </PersonalPageViews.FormGroup>
                  <PersonalPageViews.FormGroup>
                    <Input
                      value={values.street}
                      name={'street'}
                      onGx-input={handleChange}
                      className={errors.street && touched.street ? 'error' : ''}
                      helpText={
                        errors.street && touched.street ? (
                          <ErrorField message={errors.street} />
                        ) : null
                      }
                      label={Text({ text: 'street' })}
                      placeholder={Text({ text: 'enter.street' })}
                      data-cy={'modal_add_address_street'}
                    />
                  </PersonalPageViews.FormGroup>
                  <PersonalPageViews.FormRow>
                    <PersonalPageViews.FormColl>
                      <PersonalPageViews.FormGroup>
                        <Input
                          value={values.houseNumber}
                          name={'houseNumber'}
                          onGx-input={handleChange}
                          className={errors.houseNumber && touched.houseNumber ? 'error' : ''}
                          helpText={
                            errors.houseNumber && touched.houseNumber ? (
                              <ErrorField message={errors.houseNumber} />
                            ) : null
                          }
                          label={Text({ text: 'house.number' })}
                          placeholder={Text({ text: 'enter.house.number' })}
                          data-cy={'modal_add_address_house_number'}
                        />
                      </PersonalPageViews.FormGroup>
                    </PersonalPageViews.FormColl>
                    <PersonalPageViews.FormColl>
                      <PersonalPageViews.FormGroup>
                        <Input
                          value={values.apartamentNumber}
                          name={'apartamentNumber'}
                          onGx-input={handleChange}
                          className={
                            errors.apartamentNumber && touched.apartamentNumber ? 'error' : ''
                          }
                          helpText={
                            errors.apartamentNumber && touched.apartamentNumber ? (
                              <ErrorField message={errors.apartamentNumber} />
                            ) : null
                          }
                          label={Text({ text: 'apartament.number' })}
                          placeholder={Text({ text: 'enter.apartaments.number' })}
                          data-cy={'modal_add_address_apartament_number'}
                        />
                      </PersonalPageViews.FormGroup>
                    </PersonalPageViews.FormColl>
                  </PersonalPageViews.FormRow>
                </PersonalPageViews.FormColl>
              </PersonalPageViews.FormRow>
            </PersonalPageViews.ModalAddressWrapper>
          </GxForm>
        );
      }}
    </Formik>
  );
};
export default React.memo(ModalAddAddress);
