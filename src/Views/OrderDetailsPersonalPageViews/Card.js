import React, { useCallback, useEffect, useState } from 'react';
import {
  productCard1,
  change,
  bayicon,
  shoppingBag,
  errorCanceled,
  paperclip,
  send,
} from '../../images';
import { GxButton, GxForm, GxIcon, GxInput } from '@garpix/garpix-web-components-react';
import Text from '../../components/Text';
import style from './styles/index.module.scss';
import { useStoreon } from 'storeon/react';
import ImageUpload from '../../components/ImageUpload';
import api from '../../api';
import ModalContentViews from '../../Views/ModalContentViews';
import { Formik } from 'formik';
import OrderDetailsPersonalPageViews from '../OrderDetailsPersonalPageViews/';
import classNames from 'classnames';

const Card = ({
  title,
  size,
  color,
  change_agreement,
  comment,
  commentImage = 'http://91.218.229.240:8000/media/uploads/2022/2/photo-2022-02-19-12-07-11-iiata_225x300.jpg',
  order,
  prices,
  image,
  brand,
  status,
  deleteElementOrder,
  id,
  setModalStates,
}) => {
  const apiCart = api.cartApi;
  const orderApi = api.orderApi;

  const { stateValuePoly, dispatch } = useStoreon('stateValuePoly');
  const fileInputRef = React.useRef(null);
  const { userPage } = useStoreon('userPage');
  const { currenssies } = useStoreon('currenssies');
  const [inputText, setInputText] = useState({
    id: 1,
    text: null,
  });
  const [idGoods, setIdGoods] = useState();
  const [textComment, setTextComment] = useState({ comment: comment, image: commentImage });
  const [amountFile, setAmountFile] = useState(null);
  const fd = new FormData();
  const [stateFile, setStateFile] = useState({
    id: 1,
    files: null,
  });

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

  const closeModal = () => {
    setModalStates({
      content: null,
      show: false,
      addClass: null,
    });
  };
  const openModalImage = (image) => {
    setModalStates({
      content: (
        <ModalContentViews.ModalWrapper>
          <ModalContentViews.CloseBtn closeModal={closeModal} />
          <ModalContentViews.ContentBlock>
            <ModalContentViews.CenterPosition>
              <ModalContentViews.ViewsImage image={image} />
            </ModalContentViews.CenterPosition>
          </ModalContentViews.ContentBlock>
        </ModalContentViews.ModalWrapper>
      ),
      show: true,
      addClass: 'modal-review',
    });
  };

  const [correspondenceState, setcorrespondenceState] = useState([]);
  const [valuesState, setvaluesState] = useState({
    text_field: '',
    file_list: [],
  });
  const getChatData = () => {
    orderApi.getCorrespondence_order_item({ order_item_id: id }).then((res) => {
      setcorrespondenceState(res);
    });
  };
  const sendCommentFromTextField = (order_id) => {
    fd.set('order_item_id', order_id);
    fd.set('message', valuesState.text_field);
    fd.set('files', valuesState.file_list);

    orderApi.postCorrespondence_order_item(fd).then((res) => {
      getChatData();
      setAmountFile(null);
      setvaluesState({
        text_field: '',
        file_list: [],
      });
    });
  };
  const handleChange = (key, value) => {
    setvaluesState({
      ...valuesState,
      [key]: value,
    });
  };

  useEffect(() => {
    getChatData();
  }, []);
const [upDownBtn, setUpDownBtn] = useState(true);
console.log(`correspondenceState`, !!correspondenceState.length)
const clickOpenCommit = () => {
  console.log(`click`)
  setUpDownBtn(c=>!c)
}
  return (
    <div className={style['cabinet_orders_details__card']}>
      <div className={style['cabinet_orders_details__wrapper-block']}>
        <div onClick={() => openModalImage(image)}>
          <img src={image} className={style['cabinet_orders_details__image_thumb']} />
        </div>
        <div className={style['cabinet_orders_details__base_info']}>
          <div className={style['cabinet_orders_details__base_info__brand']}>{brand}</div>
          <div className={style['cabinet_orders_details__base_info__title']}>{title}</div>
          <div className={style['cabinet_orders_details__base_info__wrapper']}>
            <div className={style['cabinet_orders_details__base_info__col']}>
              <div className={style['cabinet_orders_details__base_info__desc']}>
                <Text text={'size'} />
                :&nbsp;
                <span className={style['cabinet_orders_details__base_info__desc-black']}>
                  {size}
                </span>
              </div>
              <div className={style['cabinet_orders_details__base_info__desc']}>
                <Text text={'color'} />
                :&nbsp;
                <span className={style['cabinet_orders_details__base_info__desc-black']}>
                  {color}
                </span>
              </div>
              <div className={style['cabinet_orders_details__base_info__desc']}>
                Замена:&nbsp;
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
                <div>
                  <b>Цена:&nbsp;</b>
                </div>
                {}
                <span className={style['cabinet_orders_details__base_info__desc-red']}>
                  {prices.price} {currenssies}&nbsp;
                </span>
                {/* <span className={style['cabinet_orders_details__base_info__desc-black']}>
                  ({prices.price} {currenssies}/шт.)
                </span> */}
              </div>
              <div className={style['cabinet_orders_details__base_info__desc']}>
                <div className={style['cabinet_orders_details__base_info__desc--status-main']}>
                  {status.id !== 'payment_waiting' &&
                  status.id !== 'paid' &&
                  status.id !== 'packaging' &&
                  status.id !== 'sended' ? (
                    <GxIcon
                      slot="icon-left"
                      src={getIconFromStatus(status.id)}
                      className={style['cabinet_orders_details__base_info__icon']}
                    />
                  ) : status.id === 'payment_waiting' ? (
                    <span className={style['cabinet_orders_icon-payment']}>💳</span>
                  ) : status.id === 'paid' ? (
                    <span className={style['cabinet_orders_icon-paid']}>✔️</span>
                  ) : status.id === 'packaging' ? (
                    <span className={style['cabinet_orders_icon-packaging']}>🛍</span>
                  ) : status.id === 'sended' ? (
                    <span className={style['cabinet_orders_icon-sended']}>🛫</span>
                  ) : null}
                  {/* id: "ordered" title: "Товар заказан" */}
                  <span className={style['cabinet_orders_details__base_info__desc--status']}>
                    {status.title}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={style['btn__order-item--block-canceled']}>
            {status.id === 'payment_waiting' ||
            status.id === 'collection' ||
            status.id === 'paid' ? (
              <button
                variant="default"
                className={style['btn__order-item--canceled']}
                key={id}
                onClick={() => deleteElementOrder(id, order)}
              >
                отменить
              </button>
            ) : null}
            {/* 🗑️ отменить */}
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
// classNames
          return (
            <div className={style['ordering_comment']}>
              <div
              onClick={clickOpenCommit}
              className = {classNames({
                  [style['ordering_comment__field']]:true,
                  [style['active']]: upDownBtn
              })} 
                >
                <div
                  className={style['ordering_comment__field-comment']}
                  // onClick={(e)=>console.log("sss",e.current.value)}
                >
                  {correspondenceState.map((el, i) => {
                    if (el.is_me) {
                      return (
                        <OrderDetailsPersonalPageViews.ChatFieldUser
                          openModalImage={openModalImage}
                          // openModalVideo={openModalVideo}
                          key={i}
                          {...el}
                        />
                      );
                    } else {
                      return (
                        <OrderDetailsPersonalPageViews.ChatFieldAdmin
                          openModalImage={openModalImage}
                          // openModalVideo={openModalVideo}
                          key={i}
                          {...el}
                        />
                      );
                    }
                  })}
                </div>
                <div className={style['ordering_comment__field-files']}>
                  {/* {state.files[id] && renderImageSet(state.files[id], serializeFileList)} */}
                </div>

               {!!correspondenceState.length? <div className={style['ordering_comment__up-down']}></div>:null}
              </div>
              <div className={style['ordering_comment__send']}>
                <GxInput
                  onGx-change={(e) =>
                    setvaluesState({ text_field: e.target.value, file_list: valuesState.file_list })
                  }
                  placeholder={'Оставить комментарий к товару'}
                  className={style['ordering_comment__input']}
                  value={valuesState.text_field}
                ></GxInput>
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
                        setAmountFile(event.currentTarget.files.length);
                        setvaluesState({ text_field: valuesState.text_field, file_list: files[0] });
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
