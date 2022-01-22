import React, { useState } from 'react';
import { GxButton } from '@garpix/garpix-web-components-react'
import { withRouter } from "react-router-dom";
// import { GxForm, GxCol } from '@garpix/garpix-web-components-react';
// import Errros from '../../Views/errors';
import api from '../../api';
import * as Yup from "yup";
import {GxForm} from "@garpix/garpix-web-components-react";
import {Formik} from "formik";
// import Errors from "../Views/Errors";


const RestoreSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
});


const RestorePasswordSetPassword = ({ match, history }) => {
  const [message, setMessage] = useState("")
  // const { params } = match;
  // const { key } = params;

  const send = (params, { setSubmitting }) => {
    api.restorePassword(params)
      .then(({ status }) => {
        setSubmitting(false)
        if (status) {
          setMessage("Запрос успешно отправлен. Проверьте свою почту")
        } else {
          setMessage("Ошибка. Попробуйте позже")
        }
      })
      .catch(error => {
        // setErrors(error.response.data)
        console.log("RestorePasswordSetPassword.js", error)
        // setSend(false)
      });
  }

  return (
    <div className="register-account p-5">
      <div className="container">
        <div className="register-title">
          <h3 className="mb-10">ВОССТАНОВИТЬ ПАРОЛЬ</h3>
        </div>
        <Formik
          validationSchema={RestoreSchema}
          onSubmit={send}
          initialValues={{
            email: '',
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
            <GxForm noValidate onSubmit={handleSubmit} className="form-horizontal">
              <fieldset>
                <div className="form-group">
                  <label className="control-label" htmlFor="email">
                    <span className="require">*</span>Введите сюда свой email
                  </label>
                  <div className="col-10">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      onChange={handleChange}
                      value={values.email}
                      name={"email"}
                      placeholder="Введите свой email"
                    />
                    {errors.email && touched.email ? (
                      <Errors errors={errors.email} />
                    ) : null}
                  </div>
                </div>
              </fieldset>
              <div className="buttons newsletter-input">
                <div className="pull-left">
                  <div>{message}</div>
                  <GxButton className="return-customer-btn mr-2" type={"submit"}>Отправить</GxButton>
                </div>
              </div>
            </GxForm>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default React.memo(withRouter(RestorePasswordSetPassword));