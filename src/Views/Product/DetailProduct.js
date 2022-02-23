import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { GxForm, GxButton, GxRating } from '@garpix/garpix-web-components-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Errors from '../Errors';
import ProductPrice from '../../components/ProductPrice';
import Text from '../../components/Text';
import WishlistButton from '../../components/WishlistButton';
import { Link } from 'react-router-dom';

const CartSchema = Yup.object().shape({
  count: Yup.number().min(1, 'Too Short!').max(99, 'Too Long!').required('Required'),
});

const DetailProduct = ({ product, addToCart, addToWishlist, removeFromWishlist } = {}) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  let slider1Ref = null;
  let slider2Ref = null;

  useEffect(() => {
    setNav1(slider1Ref);
    setNav2(slider2Ref);
  }, []);

  const submitAddToCart = (params) => {
    debugger;
    addToCart(params);
  };

  const {
    id,
    title,
    // image,
    images,
    // slug,
    content,
    price,
    old_price,
    stock,
  } = product;

  return (
    <div>
      {/* Product Thumbnail Start */}
      <div className="main-product-thumbnail p-5">
        <div className="container">
          <div className="row">
            {/* Main Thumbnail Image Start */}
            <div className="col-lg-5">
              {/* Thumbnail Large Image start */}
              <div className="tab-content">
                <Slider asNavFor={nav2} ref={(slider) => (slider1Ref = slider)}>
                  {images.map((item, index) => {
                    return (
                      <div key={index} id="thumb1" className="tab-pane">
                        <img className="primary-img" src={item.image} alt="product-view" />
                      </div>
                    );
                  })}
                </Slider>
              </div>
              {/* Thumbnail Large Image End */}
              {/* Thumbnail Image End */}
              {images.length > 1 ? (
                <div className="product-thumbnail">
                  <div className="thumb-menu">
                    <Slider
                      asNavFor={nav1}
                      ref={(slider) => (slider2Ref = slider)}
                      slidesToShow={images.length > 3 ? 4 : images.length}
                      swipeToSlide={true}
                      focusOnSelect={true}
                    >
                      {images.map((item, index) => {
                        return (
                          <div key={index}>
                            <img className="small-img" src={item.image} alt="product-thumbnail" />
                          </div>
                        );
                      })}
                    </Slider>
                  </div>
                </div>
              ) : null}
              {/* Thumbnail image end */}
            </div>
            {/* Main Thumbnail Image End */}
            {/* Thumbnail Description Start */}
            <div className="col-lg-7">
              <div className="thubnail-desc fix">
                <h3 className="product-header">{title}</h3>
                <div className="rating-summary fix m-1">
                  <div className="rating f-left">
                    <GxRating name="rate1" starCount={5} value={5} />
                  </div>
                  <div className="rating-feedback f-left">
                    <Link to="#">(1 review)</Link>
                    <Link to="#">
                      <Text text={'add_to_ypur_review'} />
                    </Link>
                  </div>
                </div>
                <div className="pro-price mb-10">
                  <ProductPrice price={price} oldPrice={old_price} />
                </div>
                <div className="pro-ref mb-15">
                  <p>
                    <span className="in-stock">
                      <Text text={'on_stock'} />
                    </span>
                    <span className="sku">{stock}</span>
                  </p>
                </div>
                <div className="box-quantity"></div>
                <div className="product-link">
                  <ul className="list-inline">
                    <li>
                      <WishlistButton
                        productId={id}
                        addToWishlist={addToWishlist}
                        removeFromWishlist={removeFromWishlist}
                      />
                    </li>
                    <li>
                      <Link to="compare.html">
                        <Text text={'add_to_compare'} />
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="p-2">
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
              </div>
            </div>
            {/* Thumbnail Description End */}
          </div>
          {/* GxRow End */}
        </div>
        {/* GxGrid End */}
      </div>
      {/* Product Thumbnail End */}
      {/* Product Thumbnail Description Start */}
      <div className="thumnail-desc pb-60">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <ul className="main-thumb-desc nav">
                <li>
                  <Link 
                  className="active" 
                  data-toggle="tab" 
                  to="#dtail">
                    <Text text={'details'} />
                  </Link>
                </li>
                <li>
                  <Link 
                  data-toggle="tab" 
                  to="#review">
                    Reviews 1
                  </Link>
                </li>
              </ul>
              {/* Product Thumbnail Tab Content Start */}
              <div className="tab-content thumb-content border-default">
                <div id="dtail" className="tab-pane in active">
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
                <div id="review" className="tab-pane">
                  {/* Reviews Start */}
                  <div className="review">
                    <div className="group-title">
                      <h2>
                        <Text text={'customer_review'} />
                      </h2>
                    </div>
                    <h4 className="review-mini-title">Jantrik</h4>
                    <ul className="review-list">
                      {/* Single Review List Start */}
                      <li>
                        <span>
                          <Text text={'quality'} />
                        </span>
                        <GxRating name="rate1" starCount={5} value={5} />
                        <label>Jantrik</label>
                      </li>
                      {/* Single Review List End */}
                      {/* Single Review List Start */}
                      <li>
                        <span>
                          <Text text={'price'} />
                        </span>
                        <GxRating name="rate1" starCount={5} value={5} />
                        <label>
                          Review by <Link to="https://themeforest.net/user/Jantrik">Jantrik</Link>
                        </label>
                      </li>
                      {/* Single Review List End */}
                      {/* Single Review List Start */}
                      <li>
                        <span>
                          <Text text={'value'} />
                        </span>
                        <GxRating name="rate1" starCount={5} value={5} />
                        <label>Posted on 7/20/18</label>
                      </li>
                      {/* Single Review List End */}
                    </ul>
                  </div>
                  {/* Reviews End */}
                  {/* Reviews Start */}
                  <div className="review border-default universal-padding mt-30">
                    <h2 className="review-title mb-30">
                      You're reviewing: <br />
                      <span>Go-Get'r Pushup Grips</span>
                    </h2>
                    <p className="review-mini-title">
                      <Text text={'your_rating'} />
                    </p>
                    <ul className="review-list">
                      {/* Single Review List Start */}
                      <li>
                        <span>
                          <Text text={'quality'} />
                        </span>
                        <GxRating name="rate1" starCount={5} value={5} />
                      </li>
                      {/* Single Review List End */}
                      {/* Single Review List Start */}
                      <li>
                        <span>
                          <Text text={'price'} />
                        </span>
                        <GxRating name="rate1" starCount={5} value={5} />
                      </li>
                      {/* Single Review List End */}
                      {/* Single Review List Start */}
                      <li>
                        <span>
                          <Text text={'value'} />
                        </span>
                        <GxRating name="rate1" starCount={5} value={5} />
                      </li>
                      {/* Single Review List End */}
                    </ul>
                    {/* Reviews Field Start */}
                    <div className="riview-field mt-40">
                      <form autoComplete="off" action="#">
                        <div className="form-group">
                          <label className="req" htmlFor="sure-name">
                            <Text text={'username'} />
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="sure-name"
                            required="required"
                          />
                        </div>
                        <div className="form-group">
                          <label className="req" htmlFor="subject">
                            <Text text={'summary'} />
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="subject"
                            required="required"
                          />
                        </div>
                        <div className="form-group">
                          <label className="req" htmlFor="comments">
                            <Text text={'review'} />
                          </label>
                          <textarea
                            className="form-control"
                            rows={5}
                            id="comments"
                            required="required"
                            defaultValue={''}
                          />
                        </div>
                        <button type="submit" className="btn-submit">
                          <Text text={'submit_review'} />
                        </button>
                      </form>
                    </div>
                    {/* Reviews Field Start */}
                  </div>
                  {/* Reviews End */}
                </div>
              </div>
              {/* Product Thumbnail Tab Content End */}
            </div>
          </div>
          {/* GxRow End */}
        </div>
        {/* GxGrid End */}
      </div>
      {/* Product Thumbnail Description End */}
    </div>
  );
};

export default React.memo(DetailProduct);
