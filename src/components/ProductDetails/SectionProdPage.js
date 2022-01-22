import React, { useState, useEffect } from 'react';
import { labelHit, labelNew, labelSale, labelOnsale, defaultProductCard } from '../../images/index';
import { Formik } from 'formik';
import Container from '../../Views/Container';
import ProductDetailsViews from '../../Views/ProductDetailsViews';
import ControlButtons from '../../Views/ProductDetailsViews/ProductData/ColorsItems';
import Breadcrumbs from '../../Views/Breadcrumbs';
import ModalContentViews from '../../Views/ModalContentViews';
import PreviewSlider from '../PreviewSlider';
import SceletonBlock from '../../Views/SceletonBlock';
import Title from '../../Views/Title';
import classNames from 'classnames';
import { GxModal, GxForm } from '@garpix/garpix-web-components-react';
import api from '../../api';
import { ERROR_STATUS } from '../../const';
import { useStoreon } from 'storeon/react';
import AsyncComponent from '../AsyncComponent';
import { v4 } from 'uuid';
import styleModal from '../../Views/ModalCreator/modalCreator.module.scss';
import { useHistory } from 'react-router-dom';

const AsyncWorldStandardSizesChart = AsyncComponent(() => {
  return import('../../Views/WorldStandardSizesChart');
});
const AsyncControlButtons = AsyncComponent(() => {
  return import('../../Views/ProductDetailsViews/ProductData/ControlButtons');
});
const AsyncColorsButton = AsyncComponent(() => {
  return import('../../Views/ProductDetailsViews/ProductData/ColorsItems');
});
const AsyncSizesButton = AsyncComponent(() => {
  return import('../../Views/ProductDetailsViews/ProductData/SizesItems');
});
const AsyncPricesContainer = AsyncComponent(() => {
  return import('../../Views/ProductDetailsViews/ProductData/PriceContainer');
});
const AsyncLabels = AsyncComponent(() => {
  return import('../../Views/ProductDetailsViews/ProductData/Labels');
});

const apiProfile = api.profileApi;
const apiContent = api.contentApi;
const apiCart = api.cartApi;
const apiOrder = api.orderApi;

const SectionProdPage = ({
  modalView,
  url,
  brand,
  productId,
  profileId,
  breadcrumbs,
  title,
  prices: pricesProp,
  recommended_price,
  colors: colorsProp,
  sizes: sizesProp,
  is_new,
  in_stock_count: in_stock_countProp,
  is_bestseller,
  adding_type,
  is_in_stock,
  product_rc: product_rcProp,
  is_closeout,
  role_configuration,
  is_liked: is_likedProp,
  in_cart_count: in_cart_countProp,
  review,
  media: mediaProp,
  site_configuration,
  collections = false,
  ...props
}) => {
  const history = useHistory();
  const { currenssies }                                         = useStoreon('currenssies'); //currenssies
  const [modalStates, setmodalStates]                           = useState({ show: false });
  const { cartAl, dispatch }                                   = useStoreon('cartAl')
  const [customModalStates, setCustomModalStates] = useState({
    show: false,
    addClass: 'modal-add_to_cart',
    content: null,
  });
  const [selectedCollection, setselectedCollection] = useState(false);
  const [productRequiredData, setproductRequiredData] = useState({
    prices: pricesProp,
    in_stock_count: in_stock_countProp,
    is_liked: is_likedProp,
    in_cart_count: in_cart_countProp,
    media: mediaProp,
    product_rc: product_rcProp,
    collections: collections,
  });
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  const updateProdDataPage = (params = {}) => {
    disabledAllFilters();
    apiContent
      .getProduct(productId, params)
      .then((res) => {
        setSizes(res.sizes);
        setColors(res.colors);
        setproductRequiredData({
          ...productRequiredData,
          prices: res.prices,
          in_stock_count: res.in_stock_count,
          is_liked: res.is_liked,
          in_cart_count: res.in_cart_count,
          media: res.media,
          product_rc: res.product_rc,
          // collections: res.collections,
        });
        setinitialValues({
          selectedColor: getDefaultSelectedSky(res.colors),
          selectedSize: getDefaultSelectedSky(res.sizes),
          countProduct: res.in_stock_count,
        });
      })
      .catch(err=>console.error(`ERROR getProduct(productId, params) ${err}`));
  };

  const getDefaultSelectedSky = (data) => {
    let result;
    data.forEach((element) => {
      if (element.selected) {
        result = element;
      }
    });
    return result;
  };

  const [initialValues, setinitialValues] = useState({
    selectedColor: getDefaultSelectedSky(colorsProp),
    selectedSize: getDefaultSelectedSky(sizesProp),
    countProduct: 0,
    selectedCollection: null,
  });

  const lables = [
    {
      icon: labelSale,
      isVisible: is_closeout,
    },
    {
      icon: labelNew,
      isVisible: is_new,
    },
    {
      icon: labelHit,
      isVisible: is_bestseller,
    },
    {
      icon: labelOnsale,
      isVisible: is_in_stock,
      modifyClass: 'long',
    },
  ];

  const openTableModal = () => {
    setmodalStates({
      ...modalStates,
      show: true,
    });
  };

  const closeModal = () => {
    setmodalStates({
      ...modalStates,
      show: false,
    });
  };

  const closeCustomModal = () => {
    setCustomModalStates({
      ...customModalStates,
      show: false,
    });
  };

  const submitProduct = (data) => {
    // console.log(`data`, data);
  };

  const addWishlistProduct = (productId, profileId) => {
    if (!productRequiredData.is_liked) {

      apiProfile
        .postWishlist({
          product: productId,
          profile: profileId,
        })
        .then(res=>{
          dispatch('stateValuePoly/change',{stateWish : true})
          console.log(`ADD postWishlist ${res}`)
        })
        .catch(err=>console.log(`ERROR response ${err}`) );
    } else {
      apiProfile
        .deleteWishlist(productId, {
          product: productId,
          profile: profileId,
        })
        .then(res=>{
          dispatch('stateValuePoly/change',{stateWish : true})
          console.log(`DEL postWishlist ${res}`)
        })
        .catch(err=>console.log(`ERROR response ${err}`))
    }
  };

  const openModalSuccessAddToCart = (currentColor, currentSize) => {
    setCustomModalStates({
      ...customModalStates,
      show: true,
      content: (
        <ModalContentViews.ModalWrapper>
          <ModalContentViews.CloseBtn closeModal={closeCustomModal} />
          <ModalContentViews.ContentBlock>
            <ModalContentViews.AddToCartBlock
              title={title}
              size={`Размер: ${currentSize.title}`}
              priceOneProduct={recommended_price}
              allPrice={productRequiredData.prices.old_price}
              currentPrice={productRequiredData.prices.price}
              // sale
              image={productRequiredData.media[0].image_thumb}
              handleClose={closeCustomModal}
            />
          </ModalContentViews.ContentBlock>
        </ModalContentViews.ModalWrapper>
      ),
    });
  };
  const [ changeColorBtn, setChangeColorBtn ] = useState({red : false, green : false});
  const addToCart = ({ count, currentSize, currentColor, successCallback, openModalSucces }) => {
    
    const params = {
      product: productId,
      color: currentColor.id ?? null,
      size: currentSize.id ?? null,
      qty: count,
      // is_pack: adding_type !== 'item',
    };

    apiCart
      .addToCart(params)
      .then((res) => {
        apiContent.getProduct(productId, params).then((res) => {
        });
        //******************************** */
        dispatch('stateValuePoly/change',{stateColorIncrement : false})
        dispatch('stateValuePoly/change',{stateColorDiscrement : false})
        dispatch('stateValuePoly/change',{stateCart : true});
        setChangeColorBtn({red : false, green : false});
        successCallback(res);
        if (openModalSucces && cartAl.in_cart===0) {
          // successCallback(res);
          openModalSuccessAddToCart(currentColor, currentSize);
        }
      })
      .catch((err) => {
        const response = err.response;
        if (response) {
          if (response.status === ERROR_STATUS.FORBIDDEN) {
            return (history.push(site_configuration.page_type_reg));
          }
        }
      });
  };

  useEffect(()=>{
    
  },[])

  const disabledAllFilters = () => {};

  const updateDetailsProdSection = (selectedSize, selectedColor, selectedCollection) => {
    if (selectedCollection) {
      return updateProdDataPage({
        collection: selectedCollection.id,
      });
    }
    if (selectedSize && !selectedColor) {
      updateProdDataPage({
        size: selectedSize.id,
      });
    }
    if (selectedColor && !selectedSize) {
      // setselectedCollection(false);
      updateProdDataPage({
        color: selectedColor.id,
      });
    }
    if (selectedColor && selectedSize) {
      updateProdDataPage({
        color: selectedColor.id,
        size: selectedSize.id,
      });
    }
  };

  const setSizesFromCollection = (data) => {
    if (data.is_grid) {
      data.items = data.items.map((el) => {
        return el.map((elLi) => {
          return {
            ...elLi,
            size: {
              ...elLi.size,
              uuid: v4(),
            },
          };
        });
      });
    } else {
      data.items = data.items.map((el) => {
        return {
          ...el,
          size: {
            ...el.size,
            uuid: v4(),
          },
        };
      });
    }
    setselectedCollection(data);
  };

  const addCollectionHandler = (selectedSize, selectedColor) => {
    const fd = new FormData();
    fd.set('product', productId);
    fd.set('size', selectedSize.id);
    fd.set('color', selectedColor.id);
    apiOrder.createFakeEmptyCollection(fd).then((res) => {
      const newCollections = productRequiredData.collections;
      productRequiredData.collections.push(res.data);
      setproductRequiredData({
        ...productRequiredData,
        collections: newCollections,
      });
    });
  };

  useEffect(() => {
    setSizes(sizesProp);
    setColors(colorsProp);
    setinitialValues({
      ...initialValues,
      selectedColor: getDefaultSelectedSky(colorsProp),
      selectedSize: getDefaultSelectedSky(sizesProp),
    });
  }, [colorsProp, sizesProp]);

  useEffect(() => {
    setproductRequiredData({
      ...productRequiredData,
      prices: pricesProp,
      in_stock_count: in_stock_countProp,
      is_liked: is_likedProp,
      in_cart_count: in_cart_countProp,
      media: mediaProp,
      product_rc: product_rcProp,
      collections: collections,
    });
  }, [
    pricesProp,
    in_stock_countProp,
    is_likedProp,
    in_cart_countProp,
    mediaProp,
    product_rcProp,
    collections,
  ]);

  useEffect(() => {
    if (productRequiredData.collections && !selectedCollection) {
      if (productRequiredData.collections.length)
        setSizesFromCollection(productRequiredData.collections[0]);
    }
  }, [productRequiredData.collections]);

  useEffect(() => {
    // openModalSuccessAddToCart();
  }, []);











  return (
    <Formik enableReinitialize initialValues={initialValues} onSubmit={submitProduct}>
      {({ handleSubmit, setFieldValue, handleChange, values, errors }) => {
        const selectColorHandle = (data) => {
          setFieldValue('selectedColor', data);
          updateDetailsProdSection(undefined, data);
        };

        const selectSizesHandle = (data) => {
          setFieldValue('selectedSize', data);
          updateDetailsProdSection(data, values.selectedColor);
        };

        const successCallback = (dataResponse) => {
          updateDetailsProdSection(values.selectedSize, values.selectedColor);
        };

        const selectСollection = (data) => {
          setSizesFromCollection(data);
        };
        return (
          <GxForm noValidate onGx-submit={handleSubmit}>
            <ProductDetailsViews.SectionProdPage modalView={modalView}>
              <GxModal
                onGx-after-hide={closeCustomModal}
                open={customModalStates.show}
                className={classNames({
                  [styleModal['modal_creator']]: true,
                  [styleModal[customModalStates.addClass]]: true,
                })}
              >
                {customModalStates.content}
              </GxModal>
              <Container>
                <GxModal
                  onGx-after-hide={closeModal}
                  open={modalStates.show}
                  className={classNames({
                    [styleModal['modal_creator']]: true,
                    [styleModal['modal-how_to']]: true,
                  })}
                >
                  <ModalContentViews.ModalWrapper>
                    <ModalContentViews.CloseBtn closeModal={closeModal} />
                    <ModalContentViews.ContentBlock>
                      <AsyncWorldStandardSizesChart
                        site_configuration={site_configuration}
                        productTableVariant
                      />
                    </ModalContentViews.ContentBlock>
                  </ModalContentViews.ModalWrapper>
                </GxModal>
                {!modalView ? <Breadcrumbs breadcrumbs={breadcrumbs} /> : null}
                <ProductDetailsViews.DataProductRow modalView={modalView}>
                  <ProductDetailsViews.DataProductLeft>
                    <PreviewSlider
                      imageOrVideoSet={productRequiredData.media}
                      defaultImage={defaultProductCard}
                    />
                  </ProductDetailsViews.DataProductLeft>
                  <ProductDetailsViews.DataProductRigth>
                    <ProductDetailsViews.RatingProduct
                      productId={productId}
                      profileId={profileId}
                      is_liked={productRequiredData.is_liked}
                      addWishlistProduct={addWishlistProduct}
                      reviews_statistic={review}
                      title={title}
                    />
                    <ProductDetailsViews.BrandName name={brand} />
                    {title && title !== 'title' ? (
                      <Title variant={'prodpage__title'} type={'h1'}>
                        {title}
                      </Title>
                    ) : (
                      <SceletonBlock />
                    )}

                    <AsyncLabels items={lables} />
                    <AsyncPricesContainer
                      prices={productRequiredData.prices}
                      role_configuration={role_configuration}
                      currenssies={currenssies}
                      recommended_price={recommended_price}
                      in_cart_count={productRequiredData.in_cart_count}
                    />
                    <AsyncColorsButton
                      selectColorHandle={selectColorHandle}
                      selectedColor={values.selectedColor}
                      items={colors}
                    />
                    <AsyncSizesButton
                      modalView={modalView}
                      selectSizesHandle={selectSizesHandle}
                      selectedSize={values.selectedSize}
                      selectedColor={values.selectedColor}
                      openTableModal={openTableModal}
                      product_rc={productRequiredData.product_rc}
                      in_stock_count={productRequiredData.in_stock_count}
                      collections={productRequiredData.collections}
                      selectedCollection={selectedCollection}
                      selectСollection={selectСollection}
                      sizes={sizes}
                      addCollectionHandler={addCollectionHandler}
                      role_configuration={role_configuration}
                    />
                    <AsyncControlButtons
                      countProduct={values.countProduct}
                      currentSize={values.selectedSize}
                      currentColor={values.selectedColor}
                      in_cart_count={productRequiredData.in_cart_count}
                      successCallback={successCallback}
                      addToCart={addToCart}
                      modalView={modalView}
                      collections={productRequiredData.collections}
                      url={url}
                      changeColorBtn={changeColorBtn}
                      setChangeColorBtn={setChangeColorBtn}
                    />
                    {!modalView ? (
                      <ProductDetailsViews.DeliveryInfo
                        role_configuration={role_configuration}
                        description={role_configuration.delivery_condition}
                      />
                    ) : null}
                  </ProductDetailsViews.DataProductRigth>
                </ProductDetailsViews.DataProductRow>
              </Container>
            </ProductDetailsViews.SectionProdPage>
          </GxForm>
        );
      }}
    </Formik>
  );
};

export default SectionProdPage;
