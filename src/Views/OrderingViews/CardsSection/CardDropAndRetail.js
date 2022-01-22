import React, { useState, useEffect } from 'react';
import { categoryCard1, paperclip, send } from '../../../images';
import { GxButton, GxIcon, GxInput, GxTooltip } from '@garpix/garpix-web-components-react';
import Text from '../../../components/Text';
import CheckBox from '../../../Views/CheckBox';
import api from '../../../api';
import ImageUpload from '../../../components/ImageUpload';
import style from '../styles/index.module.scss';
import { Link } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import { ROLE } from '../../../const';


const apiCart = api.cartApi;
const CardDropAndRetail = ({currenssies,el, count}) => {
const { id } = el;
const fileInputRef = React.useRef(null);
const [ inputText, setInputText ] = useState('');
const [ amountFile, setAmountFile ] = useState(null);
const { userPage } = useStoreon('userPage');
const { role } = userPage.profile;
const [state, setstate] = useState({
  files: [],
});


    const fd = new FormData();
    
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

    (role !== ROLE.WHOLESALE)
      ?(
      <div className={style['ordering_card']}>
      <div className={style['ordering_card-left']}>
        <Link 
          to={el.url}
        >
        <img src={el.product.image} className={style['ordering_card__image']} />
        </Link>
        <div className={style['product__base_info']}>
          <div className={style['product__base_info__brand']}>{el.brand}</div>
          <div className={style['product__base_info__title']}>{el.title}</div>
          <div className={style['ordering_card__desc']}>
            <div className="ordering_card__wrapper">
              <div className="product__base_info__size">
                <Text text={'size'} />:<span className="product__base_info-black">{el.size}</span>
              </div>
              <div className={style['product__base_info__color']}>
                <Text text={'color'} />:
                <span className={style['product__base_info-black']}>{el.color}</span>
              </div>
            </div>
            <div className={style['ordering_card__wrapper']}>
              <div className={style['product__base_info__size']}>
                <Text text="count" />:
                <span className={style['product__base_info-black']}>{el.qty} шт.</span>
              </div>
              <div className={style['product__base_info__color']}>
                <Text text="price" />:
                <span className={style['product__base_info-red']}>
                  {el.price} {currenssies}
                </span>
                {el.old_price ? (
                  <span className={style['product__base_info-black_lt']}>
                    {el.old_price} {currenssies}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
          <div className={style['ordering_card__change']}>
            <GxTooltip
              content="Заменить товар можно только на такой же, но в другом цвете и/или размере с соблюдением условия выкупа. Не забудьте в комментарии к товару указать свой выбор."
              placement="top"
              className={style['ordering_card__tooltip']}
            >
              <CheckBox
                checked={state.change_agreement}
                onGx-change={changeAgreement}
                label={
                  <span className={style['ordering_card__change_text']}>Согласие на замену</span>
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
      ):(
      <div className={style['ordering_card']}>
        <div className={style['ordering_card-left']}>
          <Link 
            to={el.url}
          >
          <img src={el.image} className={style['ordering_card__image']} />
          </Link>
          <div className={style['product__base_info']}>
            <div className={style['product__base_info__brand']}>{el.brand}</div>
            <div className={style['product__base_info__title']}>{el.title}</div>
            <div className={style['ordering_card__desc']}>
              <div className="ordering_card__wrapper">
                <div className="product__base_info__size">
                  <Text text={'size'} />:<span className="product__base_info-black">{el.size}</span>
                </div>
                <div className={style['product__base_info__color']}>
                  <Text text={'color'} />:
                  <span className={style['product__base_info-black']}>{el.color}</span>
                </div>
              </div>
              <div className={style['ordering_card__wrapper']}>
                <div className={style['product__base_info__size']}>
                  <Text text="count" />:
                  <span className={style['product__base_info-black']}>{el.qty} шт.</span>
                </div>
                <div className={style['product__base_info__color']}>
                  <Text text="price" />:
                  <span className={style['product__base_info-red']}>
                    {el.price} {currenssies}
                  </span>
                  {el.old_price ? (
                    <span className={style['product__base_info-black_lt']}>
                      {el.old_price} {currenssies}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
            <div className={style['ordering_card__change']}>
              <GxTooltip
                content="Заменить товар можно только на такой же, но в другом цвете и/или размере с соблюдением условия выкупа. Не забудьте в комментарии к товару указать свой выбор."
                placement="top"
                className={style['ordering_card__tooltip']}
              >
                <CheckBox
                  checked={state.change_agreement}
                  onGx-change={changeAgreement}
                  label={
                    <span className={style['ordering_card__change_text']}>Согласие на замену</span>
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
    )

    
  );
};

export default React.memo(CardDropAndRetail);
//    <div className="ordering_card">
//       <div className="ordering_card-left">
//         <img src={categoryCard1} className="ordering_card__image" />
//         <div className="product__base_info">
//           <div className="product__base_info__brand">NAME BRAND</div>
//           <div className="product__base_info__title">Свитер такой-то</div>

//           <div className="ordering_card__desc">
//             <div className="ordering_card__wrapper">
//               <div className="product__base_info__size">
//                 <Text text={'size'} />:<span className="product__base_info-black">S</span>
//               </div>
//               <div className="product__base_info__color">
//                 <Text text={'color'} />:
//                 <span className="product__base_info-black">пепельно-розовый</span>
//               </div>
//             </div>
//             <div className="ordering_card__wrapper">
//               <div className="product__base_info__size">
//                 <Text text="count" />:<span className="product__base_info-black">1 шт.</span>
//               </div>
//               <div className="product__base_info__color">
//                 <Text text="price" />:<span className="product__base_info-red">45 zl</span>
//                 <span className="product__base_info-black_lt">120 zl</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="ordering_comment">
//         <div className="ordering_comment__field">
//           Здесь будет текст введенного комментария вроде как, но я точно не уверен. <br />
//           Qui magna minim occaecat nostrud consectetur et laboris incididunt occaecat magna aute
//           incididunt. Ad amet ut do do tempor eiusmod tempor nostrud sunt. Do et enim minim
//           excepteur laborum cillum incididunt amet adipisicing ut deserunt nostrud. Qui laborum
//           mollit adipisicing laborum consequat occaecat culpa mollit aliquip. Eu ea do velit veniam
//           pariatur elit Lorem. Id eu mollit proident aliquip. Et culpa incididunt voluptate proident
//           pariatur ut. Est anim elit incididunt dolore ex dolor fugiat cupidatat nisi velit
//           consectetur anim est. Sit nisi nisi labore elit duis anim commodo ex exercitation ex est.
//         </div>
//         <div className="ordering_comment__send">
//           <GxInput
//             placeholder="Оставить комментарий к товару"
//             className="ordering_comment__input"
//           ></GxInput>
//           <div className="ordering_comment__buttons">
//             <GxButton variant="text" size="sm" circle>
//               <GxIcon src={paperclip} />
//             </GxButton>
//             <GxButton variant="text" size="sm" circle>
//               <GxIcon src={send} />
//             </GxButton>
//           </div>
//         </div>
//       </div>
//     </div>
