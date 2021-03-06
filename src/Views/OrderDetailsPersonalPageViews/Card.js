import React, { useCallback, useEffect, useState } from 'react';
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

  const [inputText, setInputText] = useState({
    id: 1,
    text: null
  });
  const [idGoods, setIdGoods] = useState();
  const [textComment, setTextComment] = useState("test text");

  const [amountFile, setAmountFile] = useState(null);
  const fd = new FormData();
  const [stateFile, setStateFile] = useState({
    id: 1,
    files: null
  });

  const sendCommentFromTextField = (id) => {
    setTextComment(inputText.text)

    fd.set('order_id', inputText.id);

    if (inputText.text) {
      fd.set('comment', inputText.text);
    }

    console.log('stateFile', stateFile.files)
    console.log('stateFile.files.length', stateFile.files)

    if (stateFile.files) {
      fd.set('order_id', stateFile.id);
      fd.set('files', stateFile.files);
    }
    console.log('stateFile', fd);
    // api.orderApi
    //   .orderAddComment(fd)
    //   .then(res => {
    //     setTextComment(res.answer)
    //     console.log(`RESAULT orderAddComment "sendFilesFromFileField"${res}`, res);
    //     setStateFile({
    //       id: 1,
    //       files: null
    //     });
    //   })
    //   .catch(err => {
    //     console.error(`ERROR orderAddComment CardWoasale ${err}`);
    //   });
      

    //   setInputText({
    //     id : inputText.id,
    //     text : ""
    //   })
  };

  const sendFilesFromFileField = useCallback((id, data) => {
    console.log('data', data);
    setStateFile({
      id: id,
      files: data
    })
  }, []);

  // ???????????? ?????????? ????????????????

  // const changeCommentTextField = useCallback((e, id) => {

  //   setInputText({
  //     ...inputText,
  //     text : e.target.value,
  //     id : id
  //   })
  // },[inputText.text]);

  // const handleOnChange = useCallback(event => {
  //   const { name, value } = event.target;
  //   setInputValues({ ...inputValues, [name]: value });
  // });




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
    console.log('wirk');
    !stateFile ? setAmountFile(1) : null
  }, [stateFile])


  // 1 ?????????? ????????????????
  // 2 ?????????? ??????????????
  // 3 ???????????? ????????????
  // 4 ???????????? ????????????
  // '''
  // ORDER_ITEM_STATUS_REDEEMED = 'redeemed'#1 ?????????? ????????????????
  // ORDER_ITEM_STATUS_ORDERED = 'ordered'#2 ?????????? ??????????????
  // ORDER_ITEM_STATUS_REPLACEMENT = 'replacement'#3 ???????????? ????????????
  // ORDER_ITEM_STATUS_CANCELED = 'canceled'#4 ???????????? ????????????
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
                ????????????:
                <span className={style['cabinet_orders_details__base_info__desc-black']}>
                  {change_agreement ? '??????????????????' : '???? ??????????????????'}
                </span>
              </div>
            </div>
            <div className={style['cabinet_orders_details__base_info__col']}>
              <div className={style['cabinet_orders_details__base_info__desc']}>
                ??????-????:&nbsp;
                <span className={style['cabinet_orders_details__base_info__desc-black']}>
                  1 ????.
                </span>
              </div>
              <div className={style['cabinet_orders_details__base_info__desc']}>
                <div><b>????????:&nbsp;</b></div>
                { }
                <span className={style['cabinet_orders_details__base_info__desc-red']}>
                  {prices.price} {currenssies}&nbsp;
                </span>
                {/* <span className={style['cabinet_orders_details__base_info__desc-black']}>
                  ({prices.price} {currenssies}/????.)
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
                {/* id: "ordered" title: "?????????? ??????????????" */}
                <span className={style["cabinet_orders_details__base_info__desc-status"]}>
                  {status.title}
                </span>
                {status.id !== 'canceled' ?
                  (<button
                    variant="default"
                    className={style['btn__order-item--canceled']}
                    key={id}
                    onClick={() => deleteElementOrder(id, order)}
                  >????????????????</button>
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
                  {textComment}
                  {/* {state.comment_render[id]} */}
                </div>
                <div className={style['ordering_comment__field-files']}>
                  {/* {state.files[id] && renderImageSet(state.files[id], serializeFileList)} */}
                </div>
              </div>
              <div className={style['ordering_comment__send']}>
                <GxInput
                  onGx-change={(e) => setInputText({ id: id, text: e.target.value })}
                  placeholder={"???????????????? ?????????????????????? ?? ????????????"}
                  className={style['ordering_comment__input']}
                  value={inputText.text}

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
                      // multiple
                      ref={fileInputRef}
                      className={'hidden'}
                      id="image"
                      type="file"
                      accept=".png, .jpg, .jpeg, .mp4"
                      name={'image'}
                      onChange={(event) => {
                        const files = event.currentTarget.files;
                        // changeFilesAddField(files);
                        sendFilesFromFileField(id, files[0]);
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
//          <div className="cabinet_orders_details__base_info__title">???????????? ??????????-????</div>
//          <div className="cabinet_orders_details__base_info__wrapper">
//            <div className="cabinet_orders_details__base_info__col">
//              <div className="cabinet_orders_details__base_info__desc">
//                <Text text={'size'} />:{' '}
//                <span className="cabinet_orders_details__base_info__desc-black">S</span>
//              </div>
//              <div className="cabinet_orders_details__base_info__desc">
//                <Text text={'color'} />:{' '}
//                <span className="cabinet_orders_details__base_info__desc-black">
//                  ????????????????-??????????????
//                </span>
//              </div>
//              <div className="cabinet_orders_details__base_info__desc">
//                ????????????:{' '}
//                <span className="cabinet_orders_details__base_info__desc-black">
//                  ??????????????????
//                </span>
//              </div>
//            </div>
//            <div className="cabinet_orders_details__base_info__col">
//              <div className="cabinet_orders_details__base_info__desc">
//                ??????-????:{' '}
//                <span className="cabinet_orders_details__base_info__desc-black">1 ????.</span>
//              </div>
//              <div className="cabinet_orders_details__base_info__desc">
//                ????????:{' '}
//                <span className="cabinet_orders_details__base_info__desc-red">90 zl </span>
//                <span className="cabinet_orders_details__base_info__desc-black">
//                  (45 ZL/????.)
//                </span>
//              </div>
//              <div className="cabinet_orders_details__base_info__desc">
//                <GxIcon
//                  slot="icon-left"
//                  src={change}
//                  className="cabinet_orders_details__base_info__icon"
//                />
//                <span className="cabinet_orders_details__base_info__desc-status">
//                  ????????????
//                </span>
//              </div>
//            </div>
//          </div>
//          <div className="cabinet_orders_details__base_info__desc">
//            ??????????????????????:{' '}
//            <span className="cabinet_orders_details__base_info__desc-black">
//              ??????????-???? ?????????? ?? ?????????????????? ?????????? ???????????????? ?????????? ??????????-???? ?????????? ?? ??????????????????
//              ?????????? ???????????????? ??????????
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
//          <div className="cabinet_orders_details__base_info__title">???????????? ??????????-????</div>
//          <div className="cabinet_orders_details__base_info__wrapper">
//            <div className="cabinet_orders_details__base_info__col">
//              <div className="cabinet_orders_details__base_info__desc">
//                <Text text={'size'} />:{' '}
//                <span className="cabinet_orders_details__base_info__desc-black">S</span>
//              </div>
//              <div className="cabinet_orders_details__base_info__desc">
//                <Text text={'color'} />:{' '}
//                <span className="cabinet_orders_details__base_info__desc-black">
//                  ????????????????-??????????????
//                </span>
//              </div>
//              <div className="cabinet_orders_details__base_info__desc">
//                ????????????:{' '}
//                <span className="cabinet_orders_details__base_info__desc-black">
//                  ??????????????????
//                </span>
//              </div>
//            </div>
//            <div className="cabinet_orders_details__base_info__col">
//              <div className="cabinet_orders_details__base_info__desc">
//                ??????-????:{' '}
//                <span className="cabinet_orders_details__base_info__desc-black">1 ????.</span>
//              </div>
//              <div className="cabinet_orders_details__base_info__desc">
//                ????????:{' '}
//                <span className="cabinet_orders_details__base_info__desc-red">90 zl </span>
//                <span className="cabinet_orders_details__base_info__desc-black">
//                  (45 ZL/????.)
//                </span>
//              </div>
//              <div className="cabinet_orders_details__base_info__desc">
//                <GxIcon
//                  slot="icon-left"
//                  src={change}
//                  className="cabinet_orders_details__base_info__icon"
//                />
//                <span className="cabinet_orders_details__base_info__desc-status">
//                  ????????????
//                </span>
//              </div>
//            </div>
//          </div>
//          <div className="cabinet_orders_details__base_info__desc">
//            ??????????????????????:{' '}
//            <span className="cabinet_orders_details__base_info__desc-black">
//              ??????????-???? ?????????? ?? ?????????????????? ?????????? ???????????????? ?????????? ??????????-???? ?????????? ?? ??????????????????
//              ?????????? ???????????????? ??????????
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
//          <div className="cabinet_orders_details__base_info__title">???????????? ??????????-????</div>
//          <div className="cabinet_orders_details__base_info__wrapper">
//            <div className="cabinet_orders_details__base_info__col">
//              <div className="cabinet_orders_details__base_info__desc">
//                <Text text={'size'} />:{' '}
//                <span className="cabinet_orders_details__base_info__desc-black">S</span>
//              </div>
//              <div className="cabinet_orders_details__base_info__desc">
//                <Text text={'color'} />:{' '}
//                <span className="cabinet_orders_details__base_info__desc-black">
//                  ????????????????-??????????????
//                </span>
//              </div>
//              <div className="cabinet_orders_details__base_info__desc">
//                ????????????:{' '}
//                <span className="cabinet_orders_details__base_info__desc-black">
//                  ??????????????????
//                </span>
//              </div>
//            </div>
//            <div className="cabinet_orders_details__base_info__col">
//              <div className="cabinet_orders_details__base_info__desc">
//                ??????-????:{' '}
//                <span className="cabinet_orders_details__base_info__desc-black">1 ????.</span>
//              </div>
//              <div className="cabinet_orders_details__base_info__desc">
//                ????????:{' '}
//                <span className="cabinet_orders_details__base_info__desc-red">90 zl </span>
//                <span className="cabinet_orders_details__base_info__desc-black">
//                  (45 ZL/????.)
//                </span>
//              </div>
//              <div className="cabinet_orders_details__base_info__desc">
//                <GxIcon
//                  slot="icon-left"
//                  src={change}
//                  className="cabinet_orders_details__base_info__icon"
//                />
//                <span className="cabinet_orders_details__base_info__desc-status">
//                  ????????????
//                </span>
//              </div>
//            </div>
//          </div>
//          <div className="cabinet_orders_details__base_info__desc">
//            ??????????????????????:{' '}
//            <span className="cabinet_orders_details__base_info__desc-black">
//              ??????????-???? ?????????? ?? ?????????????????? ?????????? ???????????????? ?????????? ??????????-???? ?????????? ?? ??????????????????
//              ?????????? ???????????????? ??????????
//            </span>
//          </div>
//        </div>
//      </div>
//    </div>
