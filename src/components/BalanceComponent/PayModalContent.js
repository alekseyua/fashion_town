import React, { useState } from 'react';
import { GxForm } from '@garpix/garpix-web-components-react';
import ModalContentViews from '../../Views/ModalContentViews';
import Input from '../../Views/Input';
import { Formik, ErrorMessage } from 'formik';
import { payModalScheme } from '../../utils/schemesFormic';
import ErrorField from '../../Views/ErrorField';
import Error from '../../Views/Error';
import Button from '../../Views/Button';
import Text from '../../components/Text';
import api from '../../api';
import { useHistory, Prompt } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import InfoBalanse from './InfoBalance/InfoBalanse';
import ErrMessageForm from '../Popupe/ErrMessageForm';

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
  const { stateUpdateBalance } = useStoreon('stateUpdateBalance');

  const [stateClickSend, setStateClickSend] = useState(false)
  const [errClickSend, setErrClickSend] = useState(false)

  const history = useHistory();
  const { slug } = userPage


  const errorsMessenge = {
    symbol: 'symbol',
    requiredField: Text({ text: 'requiredField' }),
    shortComments: Text({ text: 'short.comments' }),
    longComments: Text({ text: 'long.comments' }),
    receipt:  "не добавлен файл"
  };



  const onSubmit = (data, { setFieldError }) => {
    const fdPayments = new FormData();
    fdPayments.set('requisites_id', requisites.id);
    fdPayments.set('order_id', order_id ? 11 : order_id);
    fdPayments.set('cost', data.cost);
    fdPayments.set('name', data.fio);
    fdPayments.set('comment', data.comment);
    fdPayments.set('receipt', data.receipt);
    if (fdPayments.get('receipt') === 'null'){
      setErrClickSend(true)
      resulcConfirm ? null : history.location.pathname === '/balance' ? closeModal() : history.push('balance')
    }else{
    setStateClickSend(true)
    orderApi
      .createPayments(fdPayments)
      .then((res) => {
        dispatch('stateUpdateBalance/update', !stateUpdateBalance)

        !(slug === 'balance') ? history.push('orders') : history.push('balance');
        closeModal();
        callbackSubmit();
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
        !(slug === "balance") ? history.push('cart') : history.push('balance');
        closeModal();
      });
    }
  };

  const setHistory=(path)=>{
    history.push(path)
  }

  return (
    <ModalContentViews.ModalWrapper customClassName={'modal-payments'}>
      <ModalContentViews.CloseBtn
        closeModal={closeModal}

      />
      <ModalContentViews.HeaderBlock mb={'20px'} title={'Пополнение баланса для оплаты'} />
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

      {errClickSend ? <ErrMessageForm setErrClickSend={setErrClickSend} setHistory={setHistory}/>:null}

      <ModalContentViews.WarningBlock>
        <ModalContentViews.SubTitle>Реквизиты для пополнения баланса:</ModalContentViews.SubTitle>
        <div dangerouslySetInnerHTML={{ __html: requisites.requisites }}></div>
        Пополнение баланса возможно только при наличии чека, прикрепленного в форматах .jpg (jpeg),
        .png, bmp, .zip, .rar, .pdf. Для отправки нескольких файлов, приложите архив (zip, rar) в
        этой форме.
      </ModalContentViews.WarningBlock>
      <ModalContentViews.ContentBlock>
        <ModalContentViews.ContentBlock>
          <Formik
            validationSchema={payModalScheme(errorsMessenge)}
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, handleChange, values, errors, setFieldValue, touched, handleBlur }) => {

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
                    onBlur={handleBlur}
                    helpText={errors.cost && touched ? <ErrorField message={errors.cost} /> : null}
                    label={'Сумма к зачислению*'}
                  />
                  <Input
                    value={values.fio}
                    variant={'largeCustomLabel'}
                    className={'input-mt_20'}
                    name={'fio'}
                    autocomplete={'off'}
                    onGx-input={handleChange}
                    onBlur={handleBlur}
                    helpText={errors.fio && touched ? <ErrorField message={errors.fio} /> : null}
                    label={'ФИО отправителя*'}
                  />
                  <Input
                    value={values.comment}
                    variant={'largeCustomLabel'}
                    className={'input-mt_20'}
                    name={'comment'}
                    autocomplete={'off'}
                    onBlur={handleBlur}
                    onGx-input={handleChange}
                    helpText={
                      errors.comment && touched ? <ErrorField message={errors.comment} /> : null
                    }
                    label={'Комментарий'}
                  />
                  <ModalContentViews.FileInputCustom
                    label={'Прикрепить чек:'}
                    setFieldValue={setFieldValue}
                  />
                  {errors.receipt && touched? <Error message={errors.receipt} /> : null}

                  <Button type={'submit'} stateClickSend={stateClickSend} full variant={'black_btn'}>
                    ОПЛАТИТЬ
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


