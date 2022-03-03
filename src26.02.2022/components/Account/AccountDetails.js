import React, { useState } from 'react';
import { Formik } from 'formik';
import { useStoreon } from 'storeon/react';
import { GxCol, GxForm, GxButton } from '@garpix/garpix-web-components-react';
import * as Yup from 'yup';
import api from '../../api';
import Text from '../Text';
// import Errors from '../Views/Errors';
import { useIntl } from "react-intl";
// import DatePicker from "react-datepicker";


const AccountSchema = Yup.object().shape({
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  phone: Yup.string().required('Required'),
});


const AccountDetails = () => {
  const { dispatch, currentUser } = useStoreon('currentUser')

  const send = (params, { setSubmitting }) => {
    api.updateUser(currentUser.id, params)
      .then(res => {
        dispatch('user/get', {
          callback: () => setSubmitting(false)
        })
      })
      .catch(error => {
         console.log(error, 'error AccountDetails.js')
      })
  }
  const { formatMessage } = useIntl()
  return (
    <div>
      <h3> <Text text={'account_details'}/> </h3>
      <div className="register-form login-form clearfix">
        <Formik
          validationSchema={AccountSchema}
          onSubmit={send}
          initialValues={{
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
            email: currentUser.email,
            phone: currentUser.phone ? currentUser.phone : '',
          }}
        >
          {({
            handleSubmit,
            handleChange,
            // handleBlur,
            values,
            touched,
            // isValid,
            isSubmitting,
            errors,
          }) => (
              <GxForm noValidate onSubmit={handleSubmit}>
                <div className="form-group row">
                  <label htmlFor="f-name" className="col-lg-3 col-md-4 col-form-label"><Text text={'firstname'}/></label>
                  <GxCol lg={6} md={8}>
                    <input
                      type="text"
                      className="form-control"
                      id="f-name"
                      onChange={handleChange}
                      value={values.first_name}
                      name={'first_name'}
                      placeholder={formatMessage({id: 'firstname'})}
                    />
                    {errors.first_name && touched.first_name ? (
                      <Errors errors={errors.first_name} />
                    ) : null}
                  </GxCol>
                </div>
                <div className="form-group row">
                  <label htmlFor="l-name" className="col-lg-3 col-md-4 col-form-label"><Text text={'lastname'}/></label>
                  <GxCol lg={6} md={8}>
                    <input
                      type="text"
                      className="form-control"
                      id="l-name"
                      onChange={handleChange}
                      value={values.last_name}
                      name={'last_name'}
                      placeholder={formatMessage({id: 'lastname'})}
                    />
                    {errors.last_name && touched.last_name ? (
                      <Errors errors={errors.last_name} />
                    ) : null}
                  </GxCol>
                </div>
                <div className="form-group row">
                  <label htmlFor="email" className="col-lg-3 col-md-4 col-form-label">Email address</label>
                  <GxCol lg={6} md={8}>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      onChange={handleChange}
                      value={values.email}
                      name={"email"}
                      placeholder={formatMessage({id: 'enter_your_email_here'})}
                    />
                    {errors.email && touched.email ? (
                      <Errors errors={errors.email} />
                    ) : null}
                  </GxCol>
                </div>
                <div className="form-group row">
                  <label htmlFor="email" className="col-lg-3 col-md-4 col-form-label"><Text text={'tel'}/></label>
                  <GxCol lg={6} md={8}>
                    <input
                      type="text"
                      className="form-control"
                      id="number"
                      onChange={handleChange}
                      value={values.phone}
                      name={"phone"}
                    />
                    {errors.phone && touched.phone ? (
                      <Errors errors={errors.phone} />
                    ) : null}
                  </GxCol>
                </div>
                <div className="form-group row">
                  <label htmlFor="birth" className="col-lg-3 col-md-4 col-form-label"><Text text={'birthdate'}/></label>
                  <GxCol lg={6} md={8}>
                    <input type="text" className="form-control" id="birth" placeholder="DD.MM.YYYY" />
                  </GxCol>
                </div>
                <div className="register-box mt-4">
                  <GxButton disabled={isSubmitting} type="submit" className="return-customer-btn f-right"><Text text={'save'}/></GxButton>
                </div>
              </GxForm>
            )}
        </Formik>
      </div>
    </div>
  )
}


export default React.memo(AccountDetails);