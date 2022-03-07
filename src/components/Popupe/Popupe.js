import React, { useEffect, useState } from 'react';
import style from './popupe.module.scss';
import { motion } from 'framer-motion';
import { GxButton, GxIcon, GxModal } from '@garpix/garpix-web-components-react';
import { hanger } from '../../images';
import ModalContentViews from '../../Views/ModalContentViews';
import classNames from 'classnames';
import Text from '../Text';
import { useStoreon } from 'storeon/react';

const Popupe = ({ 
  dataPopup,
  title,
  setShowPopapInfoColection,
  showPopapInfoColection,
  mediaHook,
  brandHook,
  product_rcHook,
  setIsOpen,
  openTableModal,//размерный ряд
  closeModal,
  site_configuration,
  modalStates,
  styleModal,
  AsyncWorldStandardSizesChart,
  AsyncLabels,
  AsyncPricesContainer,
  lables,
  pricesHook,
  role_configuration,
  currenssies,
  recommended_priceHook,
  in_cart_countHook,
  heandlerAddCollections,
}) => {
const [ collectionsGoods, setCollectionsGoods ] = useState();
const [sizeCollection, setSizeCollection] = useState(0);
  const { stateCountCart, dispatch } = useStoreon('stateCountCart');
useEffect(()=>{
  setCollectionsGoods(dataPopup)
}, [dataPopup])

const testCollection = (collections) =>{
 let res = collections.items.sort((a, b) => (a.size.id > b.size.id) ? 1 : -1)
    return res

}



  return (
    <motion.div 
      initial={{
        opacity:0
      }}
      animate={{
        opacity:1,
        transition:{duration:.5}
      }}
      className={style['popup']}     
    >     
      <motion.div 
        initial={{
          scale: 0,
          perspective: 0,
          rotateX: 0
        }}
        animate={{
          scale: 1,
          transition: { duration: 1.5 },
        }}

        className={style['popup__container']}
      > 
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
        <div className={style['popup__main']}>
          <button
              type="button"
              className={style['popup__close']}
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false)
                setShowPopapInfoColection({
                  ...showPopapInfoColection,
                  show: false,
                  content: null,
                });
              }}
            >
              X
            </button>
          <ul 
            className={style['popup__list']}
          >
            
            {dataPopup.map((collections, index) => {
              let res = dataPopup[index].items.map(redeemed => redeemed.redeemed)
               let enableBtn = res.filter(item=>item===false?true:false)
              let colec = testCollection(collections)
              return(
              <li 
                key={collections.id} 
                className={style['popup__item']}
               
              >
                  <div className={style['item-title__text']}>
                    <h1>
                      Сбор <strong>{index + 1}</strong>
                    </h1>
                    <h3 className={style['item-title__text-title']}>{title}</h3>
                  </div>
              
                <div className={style['popup__body-collectiion body-collectiion']}>
                    <div className={style['popup__item-title item-title-body']}>
                    <div className={style['popup__item-title item-title']}>
                      <div className={style['item-title__image']}>
                          <div style={{backgroundImage: `url(${collections?.items[0]?.size?.image})`}} className={style['popup__image']} />
                      </div>
                    </div>
                      <AsyncLabels items={lables} />
                      <AsyncPricesContainer
                        prices={pricesHook}
                        role_configuration={role_configuration}
                        currenssies={currenssies}
                        recommended_price={recommended_priceHook}
                        in_cart_count={in_cart_countHook}
                      />
                      <div className={style['prodpage-colors']}>
                        <p className={style['prodpage-colors__name']}>
                          <>
                            <span>
                              <Text text="color" />: &nbsp;
                            </span>
                            {collections?.items[0]?.size?.color_name}
                            <div
                              className={style['body-collectiion__condition']}
                              style={{
                                width: '20px',
                                height: '20px',
                                margin: '5px 0',
                                border: '1px solid #000',
                                borderRadius: '2px',
                                backgroundColor: collections?.items[0]?.size?.color,
                              }}
                            >.</div>
                          </>
                        </p>
                      </div>
                    <div className={style['body-collectiion__goods']}>
                      <div className={style['body-collection__size']}>

                          <GxButton
                            onClick={openTableModal}
                            className={style['prodpage-sizes__btn']}
                            variant="text"
                          >
                            <GxIcon
                              slot="icon-left"
                              src={hanger}
                              className={style['prodpage-sizes__icon']}
                            ></GxIcon>
                            Таблица размеров
                          </GxButton>
                          <ul
                            className={classNames({
                              [style['prodpage-sizes__items']]: true
                            })}
                          >
                            {colec.map((el, i) => {

                              return (
                                <li key={el.size.uuid} className={style['prodpage-sizes__item']}>
                                  <GxButton
                                    disabled={el.redeemed}
                                    onClick={() => {
                                      setSizeCollection(el.size.id)
                                    }}
                                    className={classNames({
                                      [style['prodpage-sizes__size-button']]: true,
                                      // [style['active']]: selectedSizeList === el.size.uuid,
                                    })}
                                  >
                                    {el.size.title}
                                  </GxButton>
                                </li>
                              );
                            })}
                          </ul>

                      </div>
                    </div>
                  </div>
                  <div className={style['body-collectiion__control']}>
                    <button 
                      type="button" 
                        className={enableBtn.length ? style['body-collectiion__btn-apply'] : style['body-collectiion__btn-apply--disable']}
                        disabled={enableBtn.length?'':'true'}
                        onClick={() => {
                          if (sizeCollection) { 
                            let countCart = stateCountCart.in_cart + 1;
                          dispatch('stateCountCart/add', { ...stateCountCart, in_cart: countCart })
                            heandlerAddCollections(1, false, collections?.items[0]?.size?.color_id, sizeCollection)
                          }else{
                            alert('Вы не указали размер заказа')
                          }
                        }
                        }                        
                    >
                        {enableBtn.length ?'Участвовать в сборе':'Сбор собран'}
                    </button>

                 </div>
                </div>
              </li>
            )}
            )}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Popupe;
