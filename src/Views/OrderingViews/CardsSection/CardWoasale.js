import React, { useState, useEffect } from 'react';
import { categoryCard1, paperclip, send } from '../../../images';
import { GxButton, GxIcon, GxInput, GxTooltip } from '@garpix/garpix-web-components-react';
import Text from '../../../components/Text';
import CheckBox from '../../../Views/CheckBox';
import CartViews from '../../../Views/CartViews';
import ImageUpload from '../../../components/ImageUpload';
import api from '../../../api';
import style from '../styles/index.module.scss';
import { useStoreon } from 'storeon/react';
import { Link } from 'react-router-dom';

const apiCart = api.cartApi;

const CardWoasale = ({ currenssies, title, is_performed, condition, items, isVisibleLine }) => {
  const { stateValuePoly, dispatch } = useStoreon('stateValuePoly');
  const fileInputRef = React.useRef(null);
  const [ inputText, setInputText ] = useState('');
  const [ amountFile, setAmountFile ] = useState(null);
  const fd = new FormData();
  const [state, setstate] = useState({
    files: [],
  });
  
  const sendCommentFromTextField = (id) => {
    fd.set('comment', inputText);
    fd.set('id', id);
    apiCart
      .cartAddComment(fd)
      .then(res=>{
        console.log(`RESAULT cartAddComment "sendCommentFromTextField" CardWoasale ${res}`);
        dispatch('stateValuePoly/change',{
          stateCart : true,
        });
      })
      .catch(err=>{
        console.error(`ERROR cartAddComment CardWoasale err`,err);
      });
  };

  const sendFilesFromFileField = (id, data) => {
    fd.set('id', id);
    fd.set('files', data);
    apiCart
      .cartAddComment(fd)
      .then(res=>{
        console.log(`RESAULT updateCartData "sendFilesFromFileField" CardWoasale ${res}`);
      })
      .catch(err=>{
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
      .then(res=>{
        console.log(`RESAULT updateCartData "changeAgreement" CardWoasale ${res}`);
      })
      .catch(err=>{
        console.error(`ERROR updateCartData CardWoasale`,err);
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


  useEffect(()=>{
      setAmountFile(state.files.length)
  },[state])


  return (
    <div className={style['wrapper-woosale']}>
     
      {/* <Link>
          <CartViews.Text type={'text-brand'}>{title}</CartViews.Text>
        <div>
          Кличества товара :  
          :{items.length}
        </div>
      </Link> */}
      <CartViews.SuccesMinOrder success={is_performed} messenge={condition} />
      {items.map((el) => {
        
        const {
          brand,
          change_agreement,
          color,
          comment,
          discount,
          id,
          image,
          is_pack,
          old_price,
          price,
          qty,
          size,
          title,
          total_price,
          url,
        } = el;
        return (
          <div className={style['ordering_card']} key={id}>
            <div className={style['ordering_card-left']}>
              <Link
                to={url}
              >
              <img src={image} alt={'order cart image'} className={style['ordering_card__image']} />
              </Link>
              <div className={style['product__base_info']}>
                <div className={style['product__base_info__brand']}>{brand}</div>
                <div className={style['product__base_info__title']}>{title}</div>
                <div className={style['ordering_card__desc']}>
                  <div className={style['ordering_card__wrapper']}>
                    <div className={style['product__base_info__size']}>
                      <Text text={'size'} />:
                      <span className={style['product__base_info-black']}>{size}</span>
                    </div>
                    <div className={style['product__base_info__color']}>
                      <Text text={'color'} />:
                      <span className={style['product__base_info-black']}>{color}</span>
                    </div>
                  </div>
                  <div className={style['ordering_card__wrapper']}>
                    <div className={style['product__base_info__size']}>
                      <Text text="count" />:
                      <span className={style['product__base_info-black']}>{qty} шт.</span>
                    </div>
                    <div className={style['product__base_info__color']}>
                      <Text text="price" />:
                      <span className={style['product__base_info-red']}>
                        {total_price} {currenssies}
                      </span>
                      {old_price ? (
                        <span className={style['product__base_info-black_lt']}>
                          {old_price} {currenssies}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>{' '}
                <div className={style['ordering_card__change']}>
                  <GxTooltip
                    content="Заменить товар можно только на такой же, но в другом цвете и/или размере с соблюдением условия выкупа. Не забудьте в комментарии к товару указать свой выбор."
                    placement="top"
                    className={style['ordering_card__tooltip']}
                  >
                    <CheckBox
                      checked={change_agreement}
                      onGx-change={(e) => {
                        changeAgreement(e, id);
                      }}
                      label={
                        <span className={style['ordering_card__change_text']}>
                          Согласие на замену
                        </span>
                      }
                    />
                  </GxTooltip>
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
                      <div className={style['ordering_comment__field-comment']}  onClick={(e)=>console.log("sss",e.current.value)} >
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
      })}
      {isVisibleLine && <CartViews.Line />}
    </div>
  );
};

export default React.memo(CardWoasale);




  
  // dispatch('stateValuePoly/change',{
  //   stateCart : true,
  // });

