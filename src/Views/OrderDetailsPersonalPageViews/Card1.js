import React, { useEffect, useState } from 'react';
import { productCard1, change, bayicon, shoppingBag, errorCanceled, paperclip, send } from '../../images';
import { GxButton, GxIcon, GxInput } from '@garpix/garpix-web-components-react';
import Text from '../../components/Text';
import style from './styles/index.module.scss';
import { useStoreon } from 'storeon/react';
import ImageUpload from '../../components/ImageUpload';
import api from '../../api';

const Card = ({
  title,
  size,
  color,
  change_agreement,
  comment,
  order, 
  prices,
  image,
  brand,
  status,
  deleteElementOrder,
  id,
}) => {

  const apiCart = api.cartApi;
  const { stateValuePoly, dispatch } = useStoreon('stateValuePoly');
  const fileInputRef = React.useRef(null);
  const [inputText, setInputText] = useState('');
  const [amountFile, setAmountFile] = useState(null);
  const fd = new FormData();
  const [state, setstate] = useState({
    files: [],
  });

  const sendCommentFromTextField = (id) => {
    fd.set('comment', inputText);
    fd.set('id', id);
    apiCart
      .cartAddComment(fd)
      .then(res => {
        console.log(`RESAULT cartAddComment "sendCommentFromTextField" CardWoasale ${res}`);
        dispatch('stateValuePoly/change', {
          stateCart: true,
        });
      })
      .catch(err => {
        console.error(`ERROR cartAddComment CardWoasale err`, err);
      });
  };

  const sendFilesFromFileField = (id, data) => {
    fd.set('id', id);
    fd.set('files', data);
    apiCart
      .cartAddComment(fd)
      .then(res => {
        console.log(`RESAULT updateCartData "sendFilesFromFileField" CardWoasale ${res}`);
      })
      .catch(err => {
        console.error(`ERROR updateCartData CardWoasale ${err}`);
      });
  };
  //добавляем в массив загруженые файлы
  const changeFilesAddField = (id, data) => {
    setstate({
      ...state,
      files: data,
    });
  };

  // меняем текст коммента
  const changeCommentTextField = (e, id) => {
    setInputText(e.target.value)
  };

  const changeAgreement = (e, id) => {
    const checked = e.target.checked;
    apiCart
      .updateCartData([
        {
          id: id,
          change_agreement: checked,
        },
      ])
      .then(res => {
        console.log(`RESAULT updateCartData "changeAgreement" CardWoasale ${res}`);
      })
      .catch(err => {
        console.error(`ERROR updateCartData CardWoasale`, err);
      });
  };



  const renderImageSet = (data, serializeFileList) => {
    const image = serializeFileList(data);
    return image.map((el, i) => {
      return (
        <img
          key={i}
          crossOrigin="anonymous"
          className={style['ordering_comment__field-files-img']}
          src={el}
        />
      );
    });
  };


  useEffect(() => {
    setAmountFile(state.files.length)
  }, [state])


  // 1 Товар выкуплен
  // 2 Товар заказан
  // 3 Замена товара
  // 4 Отмена товара
  // '''
  // ORDER_ITEM_STATUS_REDEEMED = 'redeemed'#1 Товар выкуплен
  // ORDER_ITEM_STATUS_ORDERED = 'ordered'#2 Товар заказан
  // ORDER_ITEM_STATUS_REPLACEMENT = 'replacement'#3 Замена товара
  // ORDER_ITEM_STATUS_CANCELED = 'canceled'#4 Отмена товара
  const { userPage } = useStoreon('userPage');
  const { currenssies } = useStoreon('currenssies');

  const getIconFromStatus = (id) => {
    const statusIcons = {
      ordered: shoppingBag,
      redeemed: bayicon,
      replacement: change,
      canceled: errorCanceled,
      default: '#',
    };

    if (statusIcons.hasOwnProperty(id)) {
      return statusIcons[id];
    } else {
      return statusIcons.default;
    }
  };
  return (
    <div className={style['cabinet_orders_details__card']}>
      <div className={style['cabinet_orders_details__wrapper-block']}>
        <img src={image} className={style['cabinet_orders_details__image_thumb']} />
        <div className={style['cabinet_orders_details__base_info']}>
          <div className={style['cabinet_orders_details__base_info__brand']}>{brand}</div>
          <div className={style['cabinet_orders_details__base_info__title']}>{title}</div>
          <div className={style['cabinet_orders_details__base_info__wrapper']}>
            <div className={style['cabinet_orders_details__base_info__col']}>
              <div className={style['cabinet_orders_details__base_info__desc']}>
                <Text text={'size'} />:
                <span className={style['cabinet_orders_details__base_info__desc-black']}>
                  {size}
                </span>
              </div>
              <div className={style['cabinet_orders_details__base_info__desc']}>
                <Text text={'color'} />:
                <span className={style['cabinet_orders_details__base_info__desc-black']}>
                  {color}
                </span>
              </div>
              <div className={style['cabinet_orders_details__base_info__desc']}>
                Замена:
                <span className={style['cabinet_orders_details__base_info__desc-black']}>
                  {change_agreement ? 'разрешена' : 'не разрешена'}
                </span>
              </div>
            </div>
            <div className={style['cabinet_orders_details__base_info__col']}>
              <div className={style['cabinet_orders_details__base_info__desc']}>
                Кол-во:&nbsp;
                <span className={style['cabinet_orders_details__base_info__desc-black']}>
                  1 шт.
                </span>
              </div>
              <div className={style['cabinet_orders_details__base_info__desc']}>
                <div><b>Цена:&nbsp;</b></div>
                { }
                <span className={style['cabinet_orders_details__base_info__desc-red']}>
                  {prices.price} {currenssies}&nbsp;
                </span>
                {/* <span className={style['cabinet_orders_details__base_info__desc-black']}>
                  ({prices.price} {currenssies}/шт.)
                </span> */}
              </div>
              <div className={style['cabinet_orders_details__base_info__desc']}>
                {status.id !== 'payment_waiting' ?
                  <GxIcon
                    slot="icon-left"
                    src={getIconFromStatus(status.id)}
                    className={style['cabinet_orders_details__base_info__icon']}
                  />
                  : null
                }
                {/* id: "ordered" title: "Товар заказан" */}
                <span className={style["cabinet_orders_details__base_info__desc-status"]}>
                  {status.title}
                </span>
                {status.id !== 'canceled' ?
                  (<button
                    variant="default"
                    className={style['btn__order-item--canceled']}
                    key={id}
                    onClick={() => deleteElementOrder(id, order)}
                  >отменить</button>
                  ) : null
                }
              </div>
            </div>
          </div>

        </div>
      </div>
      <ImageUpload>
        {({
          preview,
          onSelectFile,
          onSelectFiles,
          selectedFile,
          isDragActive,
          getRootProps,
          serializeFileList,
        }) => {
          if (!Array.isArray(preview) && preview) {
            preview = [preview];
          }

          return (
            <div className={style['ordering_comment']}>
              <div className={style['ordering_comment__field']}>
                <div
                  className={style['ordering_comment__field-comment']}
                // onClick={(e)=>console.log("sss",e.current.value)} 
                >
                  {inputText}
                  {/* {state.comment_render[id]} */}
                </div>
                <div className={style['ordering_comment__field-files']}>
                  {/* {state.files[id] && renderImageSet(state.files[id], serializeFileList)} */}
                </div>
              </div>
              <div className={style['ordering_comment__send']}>
                <GxInput
                  onGx-change={(e) => changeCommentTextField(e, id)}
                  placeholder={"Оставить комментарий к товару"}
                  className={style['ordering_comment__input']}
                >
                </GxInput>
                <div className={style['ordering_comment__buttons']}>
                  <GxButton
                    variant="text"
                    id={id}
                    size="sm"
                    circle
                    onClick={(e) => {
                      if (e.target.childNodes.length) {
                        e.target.childNodes[0].click();
                      }
                    }}
                  >
                    <input
                      multiple
                      ref={fileInputRef}
                      className={'hidden'}
                      id="image"
                      type="file"
                      accept=".png, .jpg, .jpeg, .mp4"
                      name={'image'}
                      onChange={(event) => {
                        const files = event.currentTarget.files;
                        changeFilesAddField(id, files);
                        sendFilesFromFileField(id, files);
                      }}
                    />
                    <GxIcon src={paperclip} />
                    {amountFile ? (
                      <gx-badge type="warning" pill>
                        {amountFile}
                      </gx-badge>
                    ) : null}
                    {/* <GxIcon src={paperclip} /> */}
                  </GxButton>
                  <GxButton
                    onClick={() => sendCommentFromTextField(id)}
                    variant="text"
                    size="sm"
                    circle
                  >
                    <GxIcon src={send} />
                  </GxButton>
                </div>
              </div>
            </div>
          );
        }}
      </ImageUpload>
    </div>
  );
};

export default React.memo(Card);

//      {/* Card 1 end */}
//      <div className="cabinet_orders_details__card">
//      <div className="cabinet_orders_details__wrapper-block">
//        <img src={productCard1} className="cabinet_orders_details__image_thumb" />
//        <div className="cabinet_orders_details__base_info">
//          <div className="cabinet_orders_details__base_info__brand">NAME BRAND</div>
//          <div className="cabinet_orders_details__base_info__title">Свитер такой-то</div>
//          <div className="cabinet_orders_details__base_info__wrapper">
//            <div className="cabinet_orders_details__base_info__col">
//              <div className="cabinet_orders_details__base_info__desc">
//                <Text text={'size'} />:{' '}
//                <span className="cabinet_orders_details__base_info__desc-black">S</span>
//              </div>
//              <div className="cabinet_orders_details__base_info__desc">
//                <Text text={'color'} />:{' '}
//                <span className="cabinet_orders_details__base_info__desc-black">
//                  пепельно-розовый
//                </span>
//              </div>
//              <div className="cabinet_orders_details__base_info__desc">
//                Замена:{' '}
//                <span className="cabinet_orders_details__base_info__desc-black">
//                  разрешена
//                </span>
//              </div>
//            </div>
//            <div className="cabinet_orders_details__base_info__col">
//              <div className="cabinet_orders_details__base_info__desc">
//                Кол-во:{' '}
//                <span className="cabinet_orders_details__base_info__desc-black">1 шт.</span>
//              </div>
//              <div className="cabinet_orders_details__base_info__desc">
//                Цена:{' '}
//                <span className="cabinet_orders_details__base_info__desc-red">90 zl </span>
//                <span className="cabinet_orders_details__base_info__desc-black">
//                  (45 ZL/шт.)
//                </span>
//              </div>
//              <div className="cabinet_orders_details__base_info__desc">
//                <GxIcon
//                  slot="icon-left"
//                  src={change}
//                  className="cabinet_orders_details__base_info__icon"
//                />
//                <span className="cabinet_orders_details__base_info__desc-status">
//                  Замена
//                </span>
//              </div>
//            </div>
//          </div>
//          <div className="cabinet_orders_details__base_info__desc">
//            Комментарий:{' '}
//            <span className="cabinet_orders_details__base_info__desc-black">
//              какой-то текст в несколько строк возможен здесь какой-то текст в несколько
//              строк возможен здесь
//            </span>
//          </div>
//        </div>
//      </div>
//    </div>
//    {/* Card 2 end */}
//    <div className="cabinet_orders_details__card">
//      <div className="cabinet_orders_details__wrapper-block">
//        <img src={productCard1} className="cabinet_orders_details__image_thumb" />
//        <div className="cabinet_orders_details__base_info">
//          <div className="cabinet_orders_details__base_info__brand">NAME BRAND</div>
//          <div className="cabinet_orders_details__base_info__title">Свитер такой-то</div>
//          <div className="cabinet_orders_details__base_info__wrapper">
//            <div className="cabinet_orders_details__base_info__col">
//              <div className="cabinet_orders_details__base_info__desc">
//                <Text text={'size'} />:{' '}
//                <span className="cabinet_orders_details__base_info__desc-black">S</span>
//              </div>
//              <div className="cabinet_orders_details__base_info__desc">
//                <Text text={'color'} />:{' '}
//                <span className="cabinet_orders_details__base_info__desc-black">
//                  пепельно-розовый
//                </span>
//              </div>
//              <div className="cabinet_orders_details__base_info__desc">
//                Замена:{' '}
//                <span className="cabinet_orders_details__base_info__desc-black">
//                  разрешена
//                </span>
//              </div>
//            </div>
//            <div className="cabinet_orders_details__base_info__col">
//              <div className="cabinet_orders_details__base_info__desc">
//                Кол-во:{' '}
//                <span className="cabinet_orders_details__base_info__desc-black">1 шт.</span>
//              </div>
//              <div className="cabinet_orders_details__base_info__desc">
//                Цена:{' '}
//                <span className="cabinet_orders_details__base_info__desc-red">90 zl </span>
//                <span className="cabinet_orders_details__base_info__desc-black">
//                  (45 ZL/шт.)
//                </span>
//              </div>
//              <div className="cabinet_orders_details__base_info__desc">
//                <GxIcon
//                  slot="icon-left"
//                  src={change}
//                  className="cabinet_orders_details__base_info__icon"
//                />
//                <span className="cabinet_orders_details__base_info__desc-status">
//                  Замена
//                </span>
//              </div>
//            </div>
//          </div>
//          <div className="cabinet_orders_details__base_info__desc">
//            Комментарий:{' '}
//            <span className="cabinet_orders_details__base_info__desc-black">
//              какой-то текст в несколько строк возможен здесь какой-то текст в несколько
//              строк возможен здесь
//            </span>
//          </div>
//        </div>
//      </div>
//    </div>
//    {/* card 3 end */}
//    <div className="cabinet_orders_details__card">
//      <div className="cabinet_orders_details__wrapper-block">
//        <img src={productCard1} className="cabinet_orders_details__image_thumb" />
//        <div className="cabinet_orders_details__base_info">
//          <div className="cabinet_orders_details__base_info__brand">NAME BRAND</div>
//          <div className="cabinet_orders_details__base_info__title">Свитер такой-то</div>
//          <div className="cabinet_orders_details__base_info__wrapper">
//            <div className="cabinet_orders_details__base_info__col">
//              <div className="cabinet_orders_details__base_info__desc">
//                <Text text={'size'} />:{' '}
//                <span className="cabinet_orders_details__base_info__desc-black">S</span>
//              </div>
//              <div className="cabinet_orders_details__base_info__desc">
//                <Text text={'color'} />:{' '}
//                <span className="cabinet_orders_details__base_info__desc-black">
//                  пепельно-розовый
//                </span>
//              </div>
//              <div className="cabinet_orders_details__base_info__desc">
//                Замена:{' '}
//                <span className="cabinet_orders_details__base_info__desc-black">
//                  разрешена
//                </span>
//              </div>
//            </div>
//            <div className="cabinet_orders_details__base_info__col">
//              <div className="cabinet_orders_details__base_info__desc">
//                Кол-во:{' '}
//                <span className="cabinet_orders_details__base_info__desc-black">1 шт.</span>
//              </div>
//              <div className="cabinet_orders_details__base_info__desc">
//                Цена:{' '}
//                <span className="cabinet_orders_details__base_info__desc-red">90 zl </span>
//                <span className="cabinet_orders_details__base_info__desc-black">
//                  (45 ZL/шт.)
//                </span>
//              </div>
//              <div className="cabinet_orders_details__base_info__desc">
//                <GxIcon
//                  slot="icon-left"
//                  src={change}
//                  className="cabinet_orders_details__base_info__icon"
//                />
//                <span className="cabinet_orders_details__base_info__desc-status">
//                  Замена
//                </span>
//              </div>
//            </div>
//          </div>
//          <div className="cabinet_orders_details__base_info__desc">
//            Комментарий:{' '}
//            <span className="cabinet_orders_details__base_info__desc-black">
//              какой-то текст в несколько строк возможен здесь какой-то текст в несколько
//              строк возможен здесь
//            </span>
//          </div>
//        </div>
//      </div>
//    </div>
