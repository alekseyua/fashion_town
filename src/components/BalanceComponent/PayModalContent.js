import React, { useState } from 'react';
import { GxForm, GxButton, GxIcon } from '@garpix/garpix-web-components-react';
import ModalContentViews from '../../Views/ModalContentViews';
import Input from '../../Views/Input';
import { paperclip } from '../../images';
import { Formik, ErrorMessage } from 'formik';
import { payModalScheme } from '../../utils/schemesFormic';
import ErrorField from '../../Views/ErrorField';
import Error from '../../Views/Error';
import Button from '../../Views/Button';
import Text from '../../components/Text';
import api from '../../api';
import { doc } from 'prettier';
import { useHistory } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import InfoBalanse from './InfoBalance/InfoBalanse';


const orderApi = api.orderApi;

const PayModalContent = ({
  closeModal,
  requisites = '',
  callbackSubmit = () => { },
  order_id = false,
  total_price,
  now_balance,
  currenssies,
}) => {
  const initialValues = {
    fio: null,
    cost: null,
    comment: null,
    receipt: null,
  };


  const { userPage, dispatch } = useStoreon('userPage');
  const [stateClickSend, setStateClickSend] = useState(false)
  const history = useHistory();
  const { slug } = userPage


  const errorsMessenge = {
    symbol: 'symbol',
    requiredField: Text({ text: 'requiredField' }),
    shortComments: Text({ text: 'short.comments' }),
    longComments: Text({ text: 'long.comments' }),
  };



  const onSubmit = (data, { setFieldError }) => {
    if (!order_id) console.warn('order_id');
    const fdPayments = new FormData();
    fdPayments.set('requisites_id', requisites.id);
    fdPayments.set('order_id', order_id ? 11 : order_id);
    fdPayments.set('cost', data.cost);
    fdPayments.set('name', data.fio);
    fdPayments.set('comment', data.comment);
    fdPayments.set('receipt', data.receipt);

    // const fdPayments = {
    //   requisites_id : requisites.id,
    //   order_id : order_id,
    //   cost : data.cost,
    //   name : data.fio,
    //   comment : data.comment,
    //  // receipt: data.receipt
    // }
    setStateClickSend(true)
    orderApi
      .createPayments(fdPayments)
      .then((res) => {
        dispatch('stateValuePoly/change', { statePayment: true })
        !slug === 'balance' ? history.push('/orders') : history.push('/balance');
        closeModal();
        callbackSubmit();
        console.log('CORRECT PAYMENT');
        // history.push('????')
      })
      .catch((err) => {
        if (err.response) {
          console.log("PayModalContent.js ERROR", err)
          setStateClickSend(false)
          const data = err.response.data;
          for (const key in data) {
            const element = Array.isArray(data[key]) ? data[key][0] : data[key];
            if (initialValues.hasOwnProperty(key)) {
              setFieldError(key, element);
            }
          }
        }
        !(slug === "balance") ? history.push('/cart') : history.push('/balance');
        closeModal();
      });

  };


  return (
    <ModalContentViews.ModalWrapper customClassName={'modal-payments'}>
      <ModalContentViews.CloseBtn
        closeModal={closeModal}

      />
      <ModalContentViews.HeaderBlock mb={'20px'} title={'???????????????????? ?????????????? ?????? ????????????'} />
      {<>
        {

          (total_price)
            ? (<>
              <InfoBalanse
                total_price={total_price}
                now_balance={now_balance}
                currenssies={currenssies}
              />


            </>
            )
            : null
        }
      </>
      }
      <ModalContentViews.WarningBlock>
        <ModalContentViews.SubTitle>?????????????????? ?????? ???????????????????? ??????????????:</ModalContentViews.SubTitle>
        <div dangerouslySetInnerHTML={{ __html: requisites.requisites }}></div>
        ???????????????????? ?????????????? ???????????????? ???????????? ?????? ?????????????? ????????, ???????????????????????????? ?? ???????????????? .jpg (jpeg),
        .png, bmp, .zip, .rar, .pdf. ?????? ???????????????? ???????????????????? ????????????, ?????????????????? ?????????? (zip, rar) ??
        ???????? ??????????.
      </ModalContentViews.WarningBlock>
      <ModalContentViews.ContentBlock>
        <ModalContentViews.ContentBlock>
          <Formik
            validationSchema={payModalScheme(errorsMessenge)}
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, handleChange, values, errors, setFieldValue, touched }) => {

              return (
                <GxForm noValidate onGx-submit={handleSubmit}>
                  <Input
                    value={values.cost}
                    type={'number'}
                    variant={'largeCustomLabel'}
                    className={'input-mt_20'}
                    name={'cost'}
                    autocomplete={'off'}
                    onGx-input={handleChange}
                    helpText={errors.cost && touched ? <ErrorField message={errors.cost} /> : null}
                    label={'?????????? ?? ????????????????????*'}
                  />
                  <Input
                    value={values.fio}
                    variant={'largeCustomLabel'}
                    className={'input-mt_20'}
                    name={'fio'}
                    autocomplete={'off'}
                    onGx-input={handleChange}
                    helpText={errors.fio && touched ? <ErrorField message={errors.fio} /> : null}
                    label={'?????? ??????????????????????*'}
                  />
                  <Input
                    value={values.comment}
                    variant={'largeCustomLabel'}
                    className={'input-mt_20'}
                    name={'comment'}
                    autocomplete={'off'}
                    onGx-input={handleChange}
                    helpText={
                      errors.comment && touched ? <ErrorField message={errors.comment} /> : null
                    }
                    label={'??????????????????????'}
                  />
                  <ModalContentViews.FileInputCustom
                    label={'???????????????????? ??????:'}
                    setFieldValue={setFieldValue}
                  />
                  {errors.receipt ? <Error message={errors.receipt} /> : null}

                  <Button type={'submit'} stateClickSend={stateClickSend} full variant={'black_btn'}>
                    ????????????????
                  </Button>
                </GxForm>
              );
            }}
          </Formik>
        </ModalContentViews.ContentBlock>
        <ModalContentViews.CenterPosition></ModalContentViews.CenterPosition>
      </ModalContentViews.ContentBlock>
    </ModalContentViews.ModalWrapper>
  );
};

export default React.memo(PayModalContent);





// import React, {useState} from 'react';
// import { GxForm, GxButton, GxIcon } from '@garpix/garpix-web-components-react';
// import ModalContentViews from '../../Views/ModalContentViews';
// import Input from '../../Views/Input';
// import { paperclip } from '../../images';
// import { Formik, ErrorMessage } from 'formik';
// import { payModalScheme } from '../../utils/schemesFormic';
// import ErrorField from '../../Views/ErrorField';
// import Error from '../../Views/Error';
// import Button from '../../Views/Button';
// import Text from '../../components/Text';
// import api from '../../api';
// import { doc } from 'prettier';

// const orderApi = api.orderApi;

// const PayModalContent = ({
//   closeModal,
//   requisites = '',
//   callbackSubmit = () => {},
//   order_id = false,
// }) => {
//   const initialValues = {
//     fio: null,
//     cost: null,
//     comment: null,
//     receipt: null,
//   };

//   const [stateClickSend, setStateClickSend] = useState(false)

//   const errorsMessenge = {
//     symbol: 'symbol',
//     requiredField: Text({ text: 'requiredField' }),
//     shortComments: Text({ text: 'short.comments' }),
//     longComments: Text({ text: 'long.comments' }),
//   };
//   const onSubmit = (data, { setFieldError }) => {
//     if (!order_id) console.warn('order_id');
//     const fdPayments = new FormData();
//     console.log('requisites.id',requisites.id || "");
//     fdPayments.set('requisites_id', requisites.id);
//     fdPayments.set('order_id',  10);
//     fdPayments.set('cost', data.cost);
//     fdPayments.set('name', data.fio);
//     fdPayments.set('comment', data.comment);
//     fdPayments.set('receipt', data.receipt);

//     setStateClickSend(true)
//     orderApi
//       .createPayments(fdPayments)
//       .then((res) => {
//         closeModal();
//         callbackSubmit();
//       })
//       .catch((err) => {
//         if (err.response) {
//           console.log("PayModalContent.js ERROR". err)
//           const data = err.response.data;
//           for (const key in data) {
//             const element = Array.isArray(data[key]) ? data[key][0] : data[key];
//             if (initialValues.hasOwnProperty(key)) {
//               setFieldError(key, element);
//             }
//           }
//         }
//       });

//   };

//    if (order_id !== null){
//     //  slot="close-button"
//     //  className="modal-closebtn"
//     //?????????????? ?????? ???????????? ?? ?????????????? ?????? ????????????
//     //  document.querySelector('.modal-closebtn').addEventListener('click', (e)=>{
//     //   document.location.href = "/orders";
//     //  })


//    }

//   return (
//     <ModalContentViews.ModalWrapper customClassName={'modal-payments'}>
//       <ModalContentViews.CloseBtn 
//         closeModal={closeModal} 

//       />
//       <ModalContentViews.HeaderBlock mb={'20px'} title={'???????????????????? ?????????????? ?????? ????????????'} />
//       <ModalContentViews.WarningBlock>
//         <ModalContentViews.SubTitle>?????????????????? ?????? ???????????????????? ??????????????:</ModalContentViews.SubTitle>
//         <div dangerouslySetInnerHTML={{ __html: requisites.requisites }}></div>
//         ???????????????????? ?????????????? ???????????????? ???????????? ?????? ?????????????? ????????, ???????????????????????????? ?? ???????????????? .jpg (jpeg),
//         .png, bmp, .zip, .rar, .pdf. ?????? ???????????????? ???????????????????? ????????????, ?????????????????? ?????????? (zip, rar) ??
//         ???????? ??????????.
//       </ModalContentViews.WarningBlock>
//       <ModalContentViews.ContentBlock>
//         <ModalContentViews.ContentBlock>
//           <Formik
//             validationSchema={payModalScheme(errorsMessenge)}
//             initialValues={initialValues}
//             onSubmit={onSubmit}
//           >
//             {({ handleSubmit, handleChange, values, errors, setFieldValue, touched }) => {

//               if( stateClickSend ){
//                 document.querySelector('.hydrated').addEventListener('click', (e)=>{
//                   document.querySelector('.BlackBtn-module__btn___27ItO').style = "pointer-events: none";
//                 });
//               }
//               return (
//                 <GxForm noValidate onGx-submit={handleSubmit}>
//                   <Input
//                     value={values.cost}
//                     type={'number'}
//                     variant={'largeCustomLabel'}
//                     className={'input-mt_20'}
//                     name={'cost'}
//                     autocomplete={'off'}
//                     onGx-input={handleChange}
//                     helpText={errors.cost && touched ? <ErrorField message={errors.cost} /> : null}
//                     label={'?????????? ?? ????????????????????*'}
//                   />
//                   <Input
//                     value={values.fio}
//                     variant={'largeCustomLabel'}
//                     className={'input-mt_20'}
//                     name={'fio'}
//                     autocomplete={'off'}
//                     onGx-input={handleChange}
//                     helpText={errors.fio && touched ? <ErrorField message={errors.fio} /> : null}
//                     label={'?????? ??????????????????????*'}
//                   />
//                   <Input
//                     value={values.comment}
//                     variant={'largeCustomLabel'}
//                     className={'input-mt_20'}
//                     name={'comment'}
//                     autocomplete={'off'}
//                     onGx-input={handleChange}
//                     helpText={
//                       errors.comment && touched ? <ErrorField message={errors.comment} /> : null
//                     }
//                     label={'??????????????????????'}
//                   />
//                   <ModalContentViews.FileInputCustom
//                     label={'???????????????????? ??????:'}
//                     setFieldValue={setFieldValue}
//                   />
//                   {errors.receipt ? <Error message={errors.receipt} /> : null}

//                   <Button type={'submit'} full variant={'black_btn'}>
//                     ????????????????
//                   </Button>
//                 </GxForm>
//               );
//             }}
//           </Formik>
//         </ModalContentViews.ContentBlock>
//         <ModalContentViews.CenterPosition></ModalContentViews.CenterPosition>
//       </ModalContentViews.ContentBlock>
//     </ModalContentViews.ModalWrapper>
//   );
// };

// export default React.memo(PayModalContent);

