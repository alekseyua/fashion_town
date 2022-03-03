import React from 'react';
import { Formik, GxForm, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});




class Start extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Edit <code>src/App.js</code> and save to reload.</p>
          <Link
            className="App-link"
            to="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
                    </Link>
        </header>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {

          }}
        >
          {({ errors, touched }) => (
            <GxForm>
              <Field name="firstName" />
              {errors.firstName && touched.firstName ? (
                <div>{errors.firstName}</div>
              ) : null}
              <Field name="lastName" />
              {errors.lastName && touched.lastName ? (
                <div>{errors.lastName}</div>
              ) : null}
              <Field name="email" type="email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              <button type="submit">Submit</button>
            </GxForm>
          )}
        </Formik>
      </div>
    )
  }
}
export default React.memo(Start);