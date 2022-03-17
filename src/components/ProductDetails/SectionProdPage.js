import React, { useState, useEffect, useRef } from 'react';
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
import Popupe from '../Popupe';
import {ROLE} from '../../const'

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
  productId,
  profileId,
  adding_type,
  breadcrumbs,
  reviews_statistic,
  reviewsCount,
  title,
  brand,
  prices,
  recommended_price,
  colors = [],
  sizes = [],
  review,
  is_new,
  in_stock_count,
  is_bestseller,
  is_in_stock,
  is_closeout,
  is_liked,
  media = [],
  in_cart_count,
  is_collection,
  collections,
  product_rc,
  role_configuration,
  site_configuration,
  product_sku,
  article,
  ...props
}) => {
  const history = useHistory();
  const { currenssies } = useStoreon('currenssies'); //currenssies
  const [modalStates, setmodalStates] = useState({ show: false });
  const { stateCountCart, dispatch } = useStoreon('stateCountCart');
  const { userPage } = useStoreon('userPage');
  const {role} = userPage.profile;
  const shereRef = useRef();
  const collectionRef = useRef();

  const [styleSocialItems, setStyleSocialItems] = useState(false)

   //------------------------------------------------------------------------
   const { stateCountWish } = useStoreon('stateCountWish')
   const { stateInPreveiwGoods } = useStoreon('stateInPreveiwGoods')
   const { reqestIdProduct } = useStoreon('reqestIdProduct')
   const { stateCountRestart } = useStoreon('stateCountRestart')
// 
  const [customModalStates, setCustomModalStates] = useState({
    show: false,
    addClass: 'modal-add_to_cart',
    content: null,
  });
  const [selectedCollection, setselectedCollection] = useState(false);

  const [colorsn, setColorsn] = useState([]);
  const [sizesn, setSizesn] = useState([]);
  const [collectionsHook, setCollectionsHook] = useState();//boolen
  const [listCollectionsHook, setListCollectionsHookHook] = useState([]);//Array data

 const [packHook, setPackHook] = useState([]);
  const [urlHook, setUrlHook] = useState([]);
  const [brandHook, setBrandHook] = useState([]);
  const [titleHook, setTitleHook] = useState();
  // const [contentHook, setСontentHook] = useState();
  const [recommended_priceHook, setRecommended_priceHook] = useState();
  const [pricesHook, setPricesHook] = useState();
  const [is_newHook, setIs_newHook] = useState(false);
  const [is_closeoutHook, setIs_closeoutHook] = useState(false);
  const [in_stock_countHook, setIn_stock_countHook] = useState(false);
  const [is_bestsellerHook, setIs_bestsellerHook] = useState(false);
  const [is_in_stockHook, setIs_in_stockHook] = useState(false);
  const [is_likedHook, setIs_likedHook] = useState(false);
  const [product_rcHook, setProduct_rcHook] = useState();
  const [in_cart_countHook, setIn_cart_countHook] = useState();
  const [reviews_statisticHook, setReviews_statisticHook] = useState();
  const [reviewsCountHook, setReviewsCountHook] = useState();
  const [reviewHook, setReviewHook] = useState();
  const [mediaHook, setMediaHook] = useState();
  const [mediaFirstHook, setMediaFirstHook] = useState();

  let newProduct_sku = [];//Array.from(product_sku);
  const [showPopapInfoColection, setShowPopapInfoColection] = useState({
    show: false,
    content: null
  })

  //   //заганяем начальные значения 
//отлавливаем клик вне блока поделится
  useEffect(() => {
    const clickOut = (e) => shereRef.current.contains(e.target) || setStyleSocialItems(false);
    document.addEventListener('click', clickOut);
    return () => document.removeEventListener('click', clickOut);
  }, []);
  
  // цвет
  useEffect(() => {
    let color = colors.filter(el => el.selected)
    colors.length ? setColorsn(color[0]) : null
  }, [colors.length])
  // размер
  useEffect(() => {
    let size = sizes.filter(el => el.selected)
    sizes.length ? setSizesn(size[0]) : null
  }, [sizes.length])
  // брэнд brand
  useEffect(() => {
    brand ? setBrandHook(brand) : null
  }, [brand])
  // количество в карзине товара in_cart_count
  useEffect(() => {
    in_cart_count ? setIn_cart_countHook(in_cart_count) : null
  }, [in_cart_count])
   // рекомендованая цена товара recommended_price
  useEffect(() => {
    recommended_price ? setRecommended_priceHook(recommended_price) : null
  }, [recommended_price])
    // ссылка на Url
    useEffect(() => {
      url? setUrlHook(url) : null
    }, [url])
  // титулка название товара Title
  useEffect(() => {
    title ? setTitleHook(title) : null
  }, [title])
  // прайс Prices ?????????????????????????????????
  useEffect(() => {
    prices ? setPricesHook(prices) : null
  }, [prices])
  // в категории новый Is_new
  useEffect(() => {
    setIs_newHook(is_new)
  }, [is_new])
 // Is_closeout
 useEffect(() => {
  setIs_closeoutHook(is_closeout)
}, [is_closeout])
  // количества товаров в наличии In_stock_count
  useEffect(() => {
    in_stock_count ? setIn_stock_countHook(in_stock_count) : null
  }, [in_stock_count])
  // бесцелер Is_bestseller
  useEffect(() => {
    setIs_bestsellerHook(is_bestseller)
  }, [is_bestseller])
  // являится ли товар в наличии Is_in_stock
  useEffect(() => {
    setIs_in_stockHook(is_in_stock)
  }, [is_in_stock])
 // описание продукта Product_rc
 useEffect(() => {
  product_rc ? setProduct_rcHook(product_rc) : null
}, [product_rc])
 // в мои желания Is_liked
 useEffect(() => {
  setIs_likedHook(is_liked)
}, [is_liked])
 //  Review reviews_statistic
 useEffect(() => {
  reviews_statistic ? setReviews_statisticHook(reviews_statistic) : null//????????????????????????
}, [reviews_statistic])
 //  Review reviewsCount
useEffect(() => {
  reviewsCount ? setReviewsCountHook(reviewsCount) : null//????????????????????????
}, [reviewsCount])
 //  Review
 useEffect(() => {
  review ? setReviewHook(review) : null//????????????????????????
}, [review])
 // фото товара Media
 useEffect(() => {
  media.length ? setMediaHook(media) : null
}, [media.length])

  useEffect(() => {
    setCollectionsHook(is_collection)
  }, [is_collection])
  useEffect(() => {
     setListCollectionsHookHook(collections)
  }, [collections])

  

  //    //создаём запрос для данных при изменении цвета или размера
  //    //****************************************************************** */
  useEffect(() => {
    let params = {
      color: colorsn.id,
      size: sizesn.id,
      productId: productId,
      collection : null,
      // pack ??????
    }

    colorsn.id || sizesn.id?(
    apiContent
      .getProduct(productId, params)
      .then((res) => {
        let color = res.colors.filter(el => el.selected)
        setColorsn(color[0])
        let size = res.sizes.filter(el => el.selected)
        setSizesn(size[0])
        setIn_cart_countHook(res.in_cart_count)
        setIs_likedHook(res.is_liked)
      })
      .catch(err => console.error(`ERROR getProduct(productId, params) ${err}`))
    ):null

  }, [colorsn.id, sizesn.id])
  // //****************************************************************** */
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
      console.log(`submitProduct`, data);
    };

  //   // проверено работает возможно надо допилить в случае ошибки обновление карточки подумаем ????
  //   //*************************************************************** */
  const addWishlistProduct = (productId, profileId) => {
    if (!is_likedHook) {
      apiProfile
        .postWishlist({
          product: productId,
          profile: profileId,
        })
        .then(res => {
          dispatch('stateCountWish/add', { ...stateCountWish, count: stateCountWish.count + 1 })
          
          dispatch('stateInPreveiwGoods/add', { id : productId , is_liked : !is_likedHook })
          
          setIs_likedHook(!is_likedHook)
        })
        .catch(err => {
          console.log(`err no add ${productId}`);
          console.log(`ERROR response ${err}`)
        });
    } else {
      apiProfile
        .deleteWishlist(productId, {
          product: productId,
          profile: profileId,
        })
        .then(res => {
          setIs_likedHook(!is_likedHook)
          dispatch('stateInPreveiwGoods/add', { id : productId , is_liked : !is_likedHook })
          dispatch('stateCountWish/add', { ...stateCountWish, count: stateCountWish.count - 1 })
        })
        .catch(err => {
          console.log(`err no dell wish ${productId}`);
          console.log(`ERROR response ${err}`)
        })
    }
  };

    const openModalSuccessAddToCart = (currentColor, currentSize, prices) => {
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
              priceOneProduct={recommended_priceHook}
              allPrice={pricesHook.old_price}
              currentPrice={pricesHook.price}
              image={mediaHook[0].image.includes('http://') ? mediaHook[0].image : mediaFirstHook[0].image}
              handleClose={closeCustomModal}
              />
          </ModalContentViews.ContentBlock>
        </ModalContentViews.ModalWrapper>
      )
    });
  };

// ******************************************************************************************************
  newProduct_sku = mediaHook;
  const getColorForMedia = (colorData) =>{
    setMediaFirstHook(media)
    let arr = Array.from(product_sku);
    let filterArr = arr.filter(item => item.color === colorData);
    setMediaHook(filterArr);
    // return newProduct_sku;
    // image: "http://91.218.229.240:8000/media/uploads/2021/9/ava.jpg"
    // image_thumb: "http://91.218.229.240:8000/media/uploads/2021/9/ava_225x300.jpg"
    // type: "image"

  }


// ******************************************************************************************************
  const [changeColorBtn, setChangeColorBtn] = useState({ red: false, green: false });
  const addToCart = ({ count = 1, openModalSucces,color,size }) => {

    let realColor = color ? color : colorsn.id;
    let realSize = size ? size : sizesn.id;
    console.log('is_collection', collectionsHook);
    // console.log('realSize', realSize);
    // console.log('color', color);
    // console.log('size', size);
    // console.log('colorsn', colorsn);
    // console.log('sizesn', sizesn);

    const params = {
      product: productId,//????????reqestIdProduct
      color: realColor,
      size: realSize,
      qty: count || 1,
      is_collection: collectionsHook,
      // is_pack: adding_type !== 'item',
    };
    console.log('params', params)

    apiCart
      .addToCart(params)
      .then((res) => {
        setChangeColorBtn({ red: false, green: false });
        setIn_cart_countHook(count)
        if (collectionsHook) dispatch('stateCountRestart/add', !stateCountRestart)
        

         if (openModalSucces && stateCountCart.in_cart === 0) {
          openModalSuccessAddToCart(colorsn, sizesn);
         }
      })
      .catch((err) => {
        // нужно сделать попап для ошибки добавления и удаления количества товара в превью
        const response = err.response;
        if (response) {
          if (response.status === ERROR_STATUS.FORBIDDEN) {
            return (history.push(site_configuration.page_type_reg));
          }
        }
        dispatch('stateCountRestart/add', !stateCountRestart)

      });
  };

  const addCollectionHandler = (sizesn, colorsn) => {
    console.log('productId', productId);
    console.log('sizesn', sizesn);
    console.log('colorsn', colorsn);
  };

  const lables = [
    {
      icon: labelSale,
      isVisible: is_closeoutHook,
    },
    {
      icon: labelNew,
      isVisible: is_newHook,
    },
    {
      icon: labelHit,
      isVisible: is_bestsellerHook,
    },
    {
      icon: labelOnsale,
      isVisible: is_in_stockHook,
      modifyClass: 'long',
    },
  ];

  const heandlerAddCollections = (qty = 1, openModalSucces = false, color, size,) => {

    let params = {
      color: color,
      size: size,
      productId: productId,
    }
    apiContent
      .getProduct(productId, params)
      .then((res) => {
        let count = res.in_cart_count + 1;
        addToCart({ count, openModalSucces, color, size })
      })
      .catch(err => console.error(`ERROR getProduct(productId, params) ${err}`))

  }

  const heandlerPopup = ( ) => {
    {
      setShowPopapInfoColection({
        ...showPopapInfoColection,
        show: true,
        content: <Popupe
          dataPopup={listCollectionsHook}
          title={titleHook}
          colorsn={colorsn}
          setShowPopapInfoColection={setShowPopapInfoColection}
          showPopapInfoColection={showPopapInfoColection}
          mediaHook={mediaHook}
          brandHook={brandHook}
          product_rcHook={product_rcHook}
          setIsOpen={setIsOpen}
          openTableModal={openTableModal}
          closeModal={closeModal}
          site_configuration = {site_configuration}
          modalStates={modalStates}
          styleModal={styleModal}
          AsyncWorldStandardSizesChart={AsyncWorldStandardSizesChart}
          AsyncLabels={AsyncLabels}
          lables={lables}
          AsyncPricesContainer={AsyncPricesContainer}
          pricesHook={pricesHook}
          role_configuration={role_configuration}
          currenssies={currenssies}
          recommended_priceHook={recommended_priceHook}
          in_cart_countHook={in_cart_countHook}
          heandlerAddCollections={heandlerAddCollections}
          styleSocialItems={styleSocialItems}
      >
      </Popupe>
    }) }
  }  

  const [isOpen, setIsOpen]=useState();
  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen])


  return (
    <Formik enableReinitialize onSubmit={submitProduct}>
      {({ handleSubmit, setFieldValue, handleChange, values, errors }) => {

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
                        // productTableVariant ????????????????????
                      />
                    </ModalContentViews.ContentBlock>
                  </ModalContentViews.ModalWrapper>
                </GxModal>

                {!modalView ? <Breadcrumbs breadcrumbs={breadcrumbs} /> : null}
                <ProductDetailsViews.DataProductRow modalView={modalView}>
                 {showPopapInfoColection.show?showPopapInfoColection.content:null}

                  <ProductDetailsViews.DataProductLeft>
                    <PreviewSlider
                      imageOrVideoSet={mediaHook}
                      defaultImage={defaultProductCard}
                      product_sku={product_sku}
                      colorsn={colorsn}
                    />
                  </ProductDetailsViews.DataProductLeft>
                  <ProductDetailsViews.DataProductRigth>
                    <ProductDetailsViews.RatingProduct
                      productId={productId}
                      profileId={profileId}
                      is_liked={is_likedHook}
                      addWishlistProduct={addWishlistProduct}
                      reviews_statistic={reviewHook}
                      title={titleHook}
                      site_configuration={site_configuration}
                      shereRef={shereRef}
                      setStyleSocialItems={setStyleSocialItems}
                      styleSocialItems={styleSocialItems}
                      media={mediaHook}
                    />
                    {
                      role === ROLE.RETAIL || role === ROLE.UNREGISTRED?
                      null
                    :<ProductDetailsViews.BrandName name={brandHook} />
                    }
                    {titleHook && titleHook !== 'title' ? (
                      <Title variant={'prodpage__title'} type={'h1'}>
                        {titleHook}
                      </Title>
                    ) : (
                      <SceletonBlock />
                    )}

                    <AsyncLabels items={lables} />
                    <AsyncPricesContainer
                      prices={pricesHook}
                      role_configuration={role_configuration}
                      currenssies={currenssies}
                      recommended_price={recommended_priceHook}
                      in_cart_count={in_cart_countHook}
                    />
                    <AsyncColorsButton
                      items={colors}
                      setColorsn={setColorsn}
                      colorsn={colorsn}
                      getColorForMedia={getColorForMedia}
                    />
                    <AsyncSizesButton
                      modalView={modalView}
                      openTableModal={openTableModal}
                      product_rc={product_rcHook}
                      in_stock_count={in_stock_countHook}
                      collections={collectionsHook}
                      sizes={sizes}
                      addCollectionHandler={addCollectionHandler}
                      listCollectionsHook={listCollectionsHook}
                      role_configuration={role_configuration}
                      setSizesn={setSizesn}
                      sizesn={sizesn}
                      colorsn={colorsn}
                      setShowPopapInfoColection={setShowPopapInfoColection}
                      showPopapInfoColection={showPopapInfoColection}
                      heandlerPopup={heandlerPopup}
                      setIsOpen={ setIsOpen}
                    />
                    <AsyncControlButtons
                      countProduct={in_stock_countHook}
                      in_cart_count={in_cart_countHook}
                      addToCart={addToCart}
                      modalView={modalView}
                      collections={collectionsHook}
                      listCollectionsHook={listCollectionsHook}
                      url={urlHook}
                      changeColorBtn={changeColorBtn}
                      setChangeColorBtn={setChangeColorBtn}
                    />
                    {!modalView ? (
                      <ProductDetailsViews.DeliveryInfo
                        role_configuration={role_configuration}
                        description={role_configuration.delivery_condition}
                      />
                    ) : null}
                    {/* <div><h5><strong>Артикул:</strong> {article}</h5></div>  */}
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
