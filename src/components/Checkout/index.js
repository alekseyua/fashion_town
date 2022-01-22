import React, {useState, useEffect} from 'react';
import { useStoreon } from 'storeon/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { GxGrid, GxRow, GxCol, GxButton, GxForm } from '@garpix/garpix-web-components-react';
// import Errors from '../../Views/Errors';
import Text from '../Text';
import api from "../../api"

const CheckoutSchema = Yup.object().shape({
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  phone: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
});

 const Checkout = () => {
//   const [totalCartPrice, setTotal] = useState(0);
//   const { cart } = useStoreon('cart');

//   useEffect(() => {
//     const getPrice = async () => setTotal(await api.getTotalPrice(cart));
//     getPrice();
//   }, []);

//   const send = (params) => {
//   };
  return (
    <>
      <div className='coupon-area mt-5'>
        <GxGrid>
          {/* Section Title Start */}
          <div className='section-title mb-4'>
            <h2>
              <Text text={'checkout'} />
            </h2>
          </div>
          {/* <div className="row">
            <div className="col-lg-12">
              <div className="coupon-accordion">
                <h3>Returning customer? <span id="showlogin">Click here to login</span></h3>
                <div id="checkout-login" className="coupon-content">
                  <div className="coupon-info">
                    <p className="coupon-text">Quisque gravida turpis sit amet nulla posuere lacinia. Cras sed est sit amet ipsum luctus.</p>
                    <form action="#">
                      <p className="form-row-first">
                        <label>Username or email <span className="required">*</span></label>
                        <input type="text" />
                      </p>
                      <p className="form-row-last">
                        <label>Password  <span className="required">*</span></label>
                        <input type="text" />
                      </p>
                      <p className="form-row">
                        <input type="submit" defaultValue="Login" />
                        <label>
                          <input type="checkbox" />
                    Remember me
                  </label>
                      </p>
                      <p className="lost-password">
                        <a href="#">Lost your password?</a>
                      </p>
                    </form>
                  </div>
                </div>
                <h3>Have a coupon? <span id="showcoupon">Click here to enter your code</span></h3>
                <div id="checkout_coupon" className="coupon-checkout-content">
                  <div className="coupon-info">
                    <form action="#">
                      <p className="checkout-coupon">
                        <input type="text" className="code" placeholder="Coupon code" />
                        <input type="submit" defaultValue="Apply Coupon" />
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </GxGrid>
      </div>
      {/* checkout-area start */}
      <div className='checkout-area pb-5'>
        <GxGrid>
          <Formik
            validationSchema={CheckoutSchema}
            onSubmit={send}
            initialValues={{
              first_name: '',
              last_name: '',
              email: '',
              phone: '',
              address: '',
            }}
          >
            {({
              handleSubmit,
              handleChange,
              // handleBlur,
              values,
              touched,
              // isValid,
              errors,
            }) => (
              <GxForm noValidate onSubmit={handleSubmit}>
                <GxRow>
                  <div className='col-lg-6 col-md-6'>
                    <div className='checkbox-form'>
                      <h3>
                        <Text text={'billing_details'} />
                      </h3>
                      <GxRow>
                        <GxCol md={6}>
                          <div className='checkout-form-list'>
                            <label>
                              <Text text={'firstname'} />{' '}
                              <span className='required'>*</span>
                            </label>
                            <input
                              type='text'
                              onChange={handleChange}
                              value={values.first_name}
                              name={'first_name'}
                            />
                            {errors.first_name && touched.first_name ? (
                              <Errors errors={errors.first_name} />
                            ) : null}
                          </div>
                        </GxCol>
                        <GxCol md={6}>
                          <div className='checkout-form-list mb-3'>
                            <label>
                              <Text text={'lastname'} />{' '}
                              <span className='required'>*</span>
                            </label>
                            <input
                              type='text'
                              onChange={handleChange}
                              value={values.last_name}
                              name={'last_name'}
                              required
                            />
                            {errors.last_name && touched.last_name ? (
                              <Errors errors={errors.last_name} />
                            ) : null}
                          </div>
                        </GxCol>
                        <GxCol md={12}>
                          <div className='checkout-form-list mb-3'>
                            <label>
                              <Text text={'address'} />{' '}
                              <span className='required'>*</span>
                            </label>
                            <input
                              type='text'
                              placeholder='Street address'
                              onChange={handleChange}
                              value={values.address}
                              name={'address'}
                            />
                            {errors.address && touched.address ? (
                              <Errors errors={errors.address} />
                            ) : null}
                          </div>
                        </GxCol>
                        <GxCol md={6}>
                          <div className='checkout-form-list mb-3'>
                            <label>
                              <Text text={'email_address'} />{' '}
                              <span className='required'>*</span>
                            </label>
                            <input
                              type='email'
                              onChange={handleChange}
                              value={values.email}
                              name={'email'}
                            />
                            {errors.email && touched.email ? (
                              <Errors errors={errors.email} />
                            ) : null}
                          </div>
                        </GxCol>
                        <GxCol md={6}>
                          <div className='checkout-form-list mb-3'>
                            <label>
                              <Text text={'tel'} />{' '}
                              <span className='required'>*</span>
                            </label>
                            <input
                              type='text'
                              onChange={handleChange}
                              value={values.phone}
                              name={'phone'}
                            />
                            {errors.phone && touched.phone ? (
                              <Errors errors={errors.phone} />
                            ) : null}
                          </div>
                        </GxCol>
                      </GxRow>
                    </div>
                  </div>
                  <GxCol lg={6} md={6}>
                    <div className='your-order'>
                      <h3>
                        <Text text={'your_order'} />
                      </h3>
                      <div className='your-order-table table-responsive'>
                        <table>
                          <thead>
                            <tr>
                              <th className='product-name'>
                                <Text text={'product'} />
                              </th>
                              <th className='product-total'>
                                <Text text={'total'} />
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.values(cart).map((item) => {
                              const { product, params } = item;
                              return (
                                <tr key={product.id} className='cart_item'>
                                  <td className='product-name'>
                                    {product.title}{' '}
                                    <strong className='product-quantity'>
                                      {' '}
                                      × {params.count}
                                    </strong>
                                  </td>
                                  <td className='product-total'>
                                    <span className='amount'>
                                      {params.count * Number(product.price)}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                          <tfoot>
                            <tr className='order-total'>
                              <th>
                                <Text text={'order_total'} />
                              </th>
                              <td>
                                <strong>
                                  <span className='amount'>
                                    ${totalCartPrice}
                                  </span>
                                </strong>
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                      <div className='payment-method'>
                        <div className='payment-accordion'>
                          <div
                            className='panel-group'
                            id='accordion'
                            role='tablist'
                            aria-multiselectable='true'
                          >
                            <div className='panel panel-default'>
                              <div
                                className='panel-heading'
                                role='tab'
                                id='headingOne'
                              >
                                <h4 className='panel-title'>
                                  <a
                                    role='button'
                                    data-toggle='collapse'
                                    data-parent='#accordion'
                                    href='#collapseOne'
                                    aria-expanded='true'
                                    aria-controls='collapseOne'
                                  >
                                    <Text text={'direct_bank_transfer'} />
                                  </a>
                                </h4>
                              </div>
                              <div
                                id='collapseOne'
                                className='panel-collapse collapse  in show'
                                role='tabpanel'
                                aria-labelledby='headingOne'
                              >
                                <div className='panel-body'>
                                  <p>
                                    Make your payment directly into our bank
                                    account. Please use your Order ID as the
                                    payment reference. Your order won’t be
                                    shipped until the funds have cleared in our
                                    account.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className='panel panel-default'>
                              <div
                                className='panel-heading'
                                role='tab'
                                id='headingTwo'
                              >
                                <h4 className='panel-title'>
                                  <a
                                    className='collapsed'
                                    role='button'
                                    data-toggle='collapse'
                                    data-parent='#accordion'
                                    href='#collapseTwo'
                                    aria-expanded='false'
                                    aria-controls='collapseTwo'
                                  >
                                    <Text text={'cheque_payment'} />
                                  </a>
                                </h4>
                              </div>
                              <div
                                id='collapseTwo'
                                className='panel-collapse collapse'
                                role='tabpanel'
                                aria-labelledby='headingTwo'
                              >
                                <div className='panel-body'>
                                  <p>
                                    Please send your cheque to Store Name, Store
                                    Street, Store Town, Store State / County,
                                    Store Postcode.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className='panel panel-default'>
                              <div
                                className='panel-heading'
                                role='tab'
                                id='headingThree'
                              >
                                <h4 className='panel-title'>
                                  <a
                                    className='collapsed'
                                    role='button'
                                    data-toggle='collapse'
                                    data-parent='#accordion'
                                    href='#collapseThree'
                                    aria-expanded='false'
                                    aria-controls='collapseThree'
                                  >
                                    PayPal
                                  </a>
                                </h4>
                              </div>
                              <div
                                id='collapseThree'
                                className='panel-collapse collapse'
                                role='tabpanel'
                                aria-labelledby='headingThree'
                              >
                                <div className='panel-body'>
                                  <p>
                                    Pay via PayPal; you can pay with your credit
                                    card if you don’t have a PayPal account.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='order-button-payment'>
                            <GxButton type='submit'>
                              <Text text={'place_order'} />
                            </GxButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GxCol>
                </GxRow>
              </GxForm>
            )}
          </Formik>
        </GxGrid>
      </div>
      {/* checkout-area end */}
    </>
  );
};

export default React.memo(Checkout);
