import React, { useState, useEffect } from 'react';
import ProductDetailsViews from '../../Views/ProductDetailsViews';
import SectionProdPage from './SectionProdPage';
import SectionDescription from './SectionDescription';
import SectionReviews from './SectionReviews';
import RecomendetProduct from '../RecomendetProduct';
import YouMayLike from '../YouMayLike';
import ModalContentViews from '../../Views/ModalContentViews';
import { GxModal } from '@garpix/garpix-web-components-react';
import Text from '../Text';
import Button from '../../Views/Button';
import api from '../../api';
import classNames from 'classnames';
import modalStyle from '../../Views/ModalCreator/modalCreator.module.scss';
import Container from '../../Views/Container';
import AsyncComponent from '../AsyncComponent';
import { useStoreon } from 'storeon/react';
import { useHistory } from 'react-router-dom';

const apiContent = api.contentApi;

const AsyncYouHaveAlreadyWatched = AsyncComponent(() => {
  return import('../YouHaveAlreadyWatched');
});

const AsyncRecomendetProduct = AsyncComponent(() => {
  return import('../RecomendetProduct');
});

const AsyncYouMayLike = AsyncComponent(() => {
  return import('../YouMayLike');
});

const ProductPreview = ({ 
  breadcrumbs = [],
  productId = 0,
  title = 'title',
  article = 'test article',
  brand,
  prices = { more_3_item_price: 0, more_5_item_price: 0, old_price: 0, price: 0 },
  recommended_price = 0,
  is_new = false,
  is_bestseller = false,
  is_in_stock = false,
  is_closeout = false,
  is_liked = false,
  in_stock_count,
  colors = [],
  sizes = [],
  location,
  in_category,
  recommended,
  in_cart_count = 0,
  profileId,
  reviews_statistic,
  role_configuration,
  adding_type,
  site_configuration,
}) => {
  const { updateCurrenssies } = useStoreon('updateCurrenssies');
  const { updateWish } = useStoreon('updateWish');
  const { stateValuePoly,dispatch } = useStoreon('stateValuePoly');
  const { dataProductFromId } = useStoreon('dataProductFromId');
  const [ newProductId, setNewProductId ] = useState(productId)
  const [modalStates, setModalStates] = useState({
    show: false,
    resultAddReviewModal: false,
    successAddReview: false,
    content: null,
  });
  const [prodSectionsProp, setprodSectionsProp] = useState({
    title: title,
    brand: brand,
    prices: prices,
    colors: colors,
    sizes: sizes,
    is_new: is_new,
    in_stock_count: in_stock_count,
    in_cart_count: in_cart_count,
    is_bestseller: is_bestseller,
    is_in_stock: is_in_stock,
    is_closeout: is_closeout,
    is_liked: is_liked,
    media: [],
    content: null,
    extra: null,
    product_rc: '',
    review: { all_count: 0, all_count_percent: 0, max_stars_count: 0, stars_count: 0 },
    collections: [],
    is_collection: false,
  });

  const history = useHistory();

  const closeModal = () => {
    setModalStates({
      ...modalStates,
      show: false,
      resultAddReviewModal: false,
    });
  };

  const getCollections = (data) => {

    if (data) {
      if (data.length) {
        data = data.map((el) => {
          return {
            ...el,
            active: false,
          };
        });
        data[0].active = true;
      }
    }
 
    return data;
  };

  const canselationCallback = () => {

  };

  const openModalFinalyAddReview = (type, content) => {
    setModalStates({
      ...modalStates,
      show: false,
      content: content,
      //content: null,
      successAddReview: type,
      resultAddReviewModal: true,
    });
  };
      /**
       * создаём переменную для получения Id
       * переход с AsyncRecomendetProduct (проверено)
       * переход с AsyncYouHaveAlreadyWatched (проверено)
       * переход с AsyncYouMayLike (не проверено) закомили блок необновляется цена
       */
  const [cardIdproductFromSlider, setCardIdproductFromSlider] = useState();
  useEffect(()=>{
    cardIdproductFromSlider ? setNewProductId(cardIdproductFromSlider):null
    },[updateCurrenssies, cardIdproductFromSlider])

//title1: prodSectionsProp.title,
  useEffect(() => {
    apiContent
      .getProduct(newProductId)
      .then((res) => {
        setprodSectionsProp({
          ...prodSectionsProp,
          title: res.title,
          brand: res.brand,
          prices: res.prices,
          colors: res.colors,
          sizes: res.sizes,
          is_new: res.is_new,
          in_stock_count: res.in_stock_count,
          is_bestseller: res.is_bestseller,
          is_in_stock: res.is_in_stock,
          is_closeout: res.is_closeout,
          is_liked: res.is_liked,
          in_cart_count: res.in_cart_count,
          media: res.media, 
          content: res.content,
          extra: res.extra,
          product_rc: res.product_rc,
          review: res.review,
          collections: getCollections(res.collections),
          is_collection: res.is_collection,
          product_sku: res?.product_sku,
          article: res?.article ? res?.article : res.id,
        });
      })
      .catch(err=>console.error(`ERROR getProduct(newProductId) ${err}`));
    
  }, [
    updateCurrenssies,
    updateWish,

    // stateValuePoly.stateProductId,
    newProductId,
  ]);
    return (
    <ProductDetailsViews.Wrapper>
      <GxModal
        className={modalStyle['modal_creator']}
        onGx-after-hide={closeModal}
        open={modalStates.show}
      >
        {modalStates.content}
      </GxModal>
      <GxModal
        onGx-after-hide={closeModal}
        open={modalStates.resultAddReviewModal}
        className={classNames({
          [modalStyle['modal_creator']]: true,
          [modalStyle['modal-success_error']]: true,
        })}
      >
        <ModalContentViews.ModalWrapper>
          <ModalContentViews.CloseBtn closeModal={closeModal} />
          <ModalContentViews.ContentBlock>
            <ModalContentViews.CenterPosition>
              <ModalContentViews.SuccessOrError
                closeModal={closeModal}
                content={modalStates.content}
                success={modalStates.successAddReview}
              />
            </ModalContentViews.CenterPosition>
          </ModalContentViews.ContentBlock>
        </ModalContentViews.ModalWrapper>
      </GxModal>
      <SectionProdPage
        productId={newProductId}
        profileId={profileId}
        adding_type={adding_type}
        breadcrumbs={breadcrumbs}
        review={prodSectionsProp.review}
        reviewsCount={reviews_statistic.all_count}
        title={prodSectionsProp.title}
        brand={prodSectionsProp.brand}
        prices={prodSectionsProp.prices}
        recommended_price={recommended_price}
        colors={prodSectionsProp.colors}
        sizes={prodSectionsProp.sizes}
        is_new={prodSectionsProp.is_new}
        in_stock_count={prodSectionsProp.in_stock_count}
        is_bestseller={prodSectionsProp.is_bestseller}
        is_in_stock={prodSectionsProp.is_in_stock}
        product_rc={prodSectionsProp.product_rc}
        is_closeout={prodSectionsProp.is_closeout}
        is_liked={prodSectionsProp.is_liked}
        media={prodSectionsProp.media}
        in_cart_count={prodSectionsProp.in_cart_count}
        role_configuration={role_configuration}
        site_configuration={site_configuration}
        collections={prodSectionsProp.collections}
        is_collection={prodSectionsProp.is_collection}
        product_sku={prodSectionsProp.product_sku}
        article={prodSectionsProp?.article}
      />
      {prodSectionsProp.content || prodSectionsProp.extra ? (
        <SectionDescription content={prodSectionsProp.content} extra={prodSectionsProp.extra} />
      ) : null}
      <SectionReviews
        reviews_statistic={reviews_statistic}
        reviews_count={reviews_statistic.all_count}
        productId={newProductId}
        profileId={profileId}
        canselationCallback={canselationCallback}
        openModalFinalyAddReview={openModalFinalyAddReview}
      />
        <AsyncRecomendetProduct products={recommended} setCardIdproductFromSlider={setCardIdproductFromSlider}/>
      <AsyncYouHaveAlreadyWatched setCardIdproductFromSlider={setCardIdproductFromSlider} />
        {/* <AsyncYouMayLike in_category={in_category} setCardIdproductFromSlider={setCardIdproductFromSlider}/> */}
      <Container>
        <ProductDetailsViews.WrapperBtn>
          {/* <Button variant={'cancel-black-full'}>
            {'<'} <Text text={'backTo'} />
          </Button> */}
        </ProductDetailsViews.WrapperBtn>
      </Container>
    </ProductDetailsViews.Wrapper>
  );
};

export default { ProductPreview };
