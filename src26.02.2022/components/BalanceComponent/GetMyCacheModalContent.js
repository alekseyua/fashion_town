import React from 'react';
import { GxForm, GxButton, GxIcon } from '@garpix/garpix-web-components-react';
import { Link } from 'react-router-dom';
import ModalContentViews from '../../Views/ModalContentViews';
import Input from '../../Views/Input';
import { paperclip } from '../../images';
import { Formik, ErrorMessage } from 'formik';
import { payModalScheme } from '../../utils/schemesFormic';
import ErrorField from '../../Views/ErrorField';
import Button from '../../Views/Button';
import Text from '../../components/Text';
import api from '../../api';

const GetMyCacheModalContent = ({ closeModal }) => {
  const initialValues = {
    fio: null,
    amount: null,
    beneficiaryBankAccountNumber: null,
    beneficiaryBankBIC: null,
    file: null,
  };
  const errorsMessenge = {
    symbol: 'symbol',
    requiredField: Text({ text: 'requiredField' }),
    shortComments: Text({ text: 'short.comments' }),
    longComments: Text({ text: 'long.comments' }),
  };
  const onSubmit = () => {
    //!
  };
  return (
    <ModalContentViews.ModalWrapper customClassName={'modal-payments'}>
      <ModalContentViews.CloseBtn closeModal={closeModal} />
      <ModalContentViews.HeaderBlock mb={'20px'} title={'Вывод денежных средств'} />
      <ModalContentViews.WarningBlock>
        Оформление возврата возможно только при наличии скан-копии заявления на возврат,
        прикрепленного в форматах .jpg (jpeg), .png, bmp, .zip, .rar, .pdf. Для отправки нескольких
        файлов, приложите архив (zip, rar) в этой форме.
        <ModalContentViews.Link to={'#'}> Скачать образец заявления</ModalContentViews.Link>
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
                    value={values.amountCredited}
                    type={'number'}
                    variant={'largeCustomLabel'}
                    className={'input-mt_20'}
                    name={'amountCredited'}
                    autocomplete={'off'}
                    onGx-input={handleChange}
                    helpText={
                      errors.amountCredited && touched ? (
                        <ErrorField message={errors.amountCredited} />
                      ) : null
                    }
                    label={'Сумма*'}
                  />
                  <Input
                    value={values.fio}
                    variant={'largeCustomLabel'}
                    className={'input-mt_20'}
                    name={'fio'}
                    autocomplete={'off'}
                    onGx-input={handleChange}
                    helpText={errors.fio && touched ? <ErrorField message={errors.fio} /> : null}
                    label={'ФИО владельца счёта*'}
                  />
                  <Input
                    value={values.beneficiaryBankAccountNumber}
                    variant={'largeCustomLabel'}
                    className={'input-mt_20'}
                    name={'beneficiaryBankAccountNumber'}
                    autocomplete={'off'}
                    onGx-input={handleChange}
                    helpText={
                      errors.beneficiaryBankAccountNumber && touched ? (
                        <ErrorField message={errors.beneficiaryBankAccountNumber} />
                      ) : null
                    }
                    label={'№ счёта в банке получателе*'}
                  />
                  <Input
                    value={values.beneficiaryBankBIC}
                    variant={'largeCustomLabel'}
                    className={'input-mt_20'}
                    name={'beneficiaryBankBIC'}
                    autocomplete={'off'}
                    onGx-input={handleChange}
                    helpText={
                      errors.beneficiaryBankBIC && touched ? (
                        <ErrorField message={errors.beneficiaryBankBIC} />
                      ) : null
                    }
                    label={'БИК банка получателя*'}
                  />
                  <ModalContentViews.FileInputCustom label={""} setFieldValue={setFieldValue} />
                  <Button type={'submit'} full variant={'black_btn'}>
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

export default React.memo(GetMyCacheModalContent);
