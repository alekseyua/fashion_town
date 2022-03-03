import React, { useState, useEffect } from 'react';
import PersonalPageViews from '../../Views/PersonalPageViews';
import ErrorField from '../../Views/ErrorField';
import Error from '../../Views/Error';
import Text from '../../components/Text';
import Input from '../../Views/Input';
import Button from '../../Views/Button';
import Timer from '../../utils/timer';
import { GxForm, GxSpinner } from '@garpix/garpix-web-components-react';
import { Formik } from 'formik';
import { changePhoneSchema } from '../../utils/schemesFormic';
import api from '../../api';
import HelpText from '../../Views/HelpText';

const apiContent = api.userApi;

const defaultParamsInitData = {
  phoneNumber: null,
  serverError: '',
};

const ModalChangePhone = ({
  // title,
  userId,
  closeModal,
  openModalFinalyAddReview = () => {},
}) => {
  const [timerDone, setTimerDone] = useState(false);
  const handleTimerDone = () => {
    setTimerDone(true);
  };
  const handleClickGetNewSubmitCode = () => {
    setTimerDone(false);
  };
  const initialState = {
    isSaved: false,
    isShowFildKey: false,
    // isRightKey: false,
  };
  const initialValues = {};
  const errorsMessenge = {
    phone: 'Не правильный номер телефона', //todo:translate
    requiredField: 'requiredField',
  };
  const [state, setState] = useState(initialState);

  const changeStateSaved = (isSaved) => {
    setState({
      ...state,
      isSaved: isSaved,
    });
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      {
        state.isSaved ? openModalFinalyAddReview(true) : openModalFinalyAddReview(false);
      }
    }
  };
  const changeStateKey = (isRightKey) => {
    setState({
      ...state,
      isRightKey: isRightKey,
    });
  };

  const setKeyForChangePhone = () => {
    setState({
      ...state,
      isShowFildKey: true,
    });
  };
  const onSubmit = (data) => {
    changeStateSaved(true);


    apiContent
      .updatePhone(userId, {
        phone: data.phone,
      })
      .then((res) => {
        setKeyForChangePhone();
      })
      .catch((err) => {
        changeStateSaved(false);
      });
  };
  return (
    <PersonalPageViews.ModalProfileViews
      title={state.isShowFildKey ? 'Введите код' : 'Введите номер'}
      closeModal={closeModal}
    >
      <Formik
        enableReinitialize
        validationSchema={changePhoneSchema(errorsMessenge, state.isShowFildKey)}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, handleChange, values, errors, setFieldValue, touched }) => {
          return (
            <GxForm novalidate onGx-submit={handleSubmit}>
              {state.isShowFildKey ? (
                <>
                  <PersonalPageViews.WrapperCodePhoneHead>
                    <HelpText addClass={'profile-modal-phone'}>
                      Мы отправили код подтверждения на номер {values.phone}&nbsp;{' '}
                      <Button gxVariant={"text"} variant={'cabinet-linkblue'}>
                        <Text text={'change'} />
                      </Button>
                    </HelpText>
                  </PersonalPageViews.WrapperCodePhoneHead>

                  <Input
                    onKeyPress={handleKeyPress}
                    value={values.key}
                    name={'key'}
                    onGx-input={handleChange}
                    variant={'largeCustomLabel'}
                    placeholder={Text({ text: 'entercode' })}
                    className={'input-mt_20'}
                    label={'введите ключ'}
                    type={'key'}
                    className={errors.key ? 'error' : ''}
                    helpText={errors.key ? <ErrorField message={errors.key} /> : null}
                  />
                  <HelpText addClass={'profile-modal-code'}>
                     {
                      !timerDone ? (<>получить новый код можно через <Timer timeInSeconds={5} onTimerDone={handleTimerDone}/></>) : ""
                    } 
                    {/* counter === 0 ? 'Time over' : <div>{format(counter)}</div>}*/}{' '}
                  </HelpText>
                  <Button variant={'looksLikeLink'}>
                    <Text text={'noSMS'} />
                  </Button>
                </>
              ) : (
                <>
                  <Input
                    value={values.phone}
                    name={'phone'}
                    onGx-input={handleChange}
                    variant={'largeCustomLabel'}
                    className={'input-mt_20'}
                    type={'phone'}
                    className={errors.phone ? 'error' : ''}
                    helpText={errors.phone ? <ErrorField message={errors.phone} /> : null}
                    label={Text({ text: 'mobPhone*' })}
                    placeholder={Text({ text: 'enterPhone' })}
                  />
                  <Button
                    disabled={errors.phone || !values.phone}
                    type={'submit'}
                    variant={'black_btn_full_width_with_margin'}
                  >
                    <Text text={'enterPhone'} />
                    {state.isSaved ? <GxSpinner slot="icon-right" className="spiner" /> : null}
                  </Button>
                </>
              )}
              <Error message={state.serverError} />
            </GxForm>
          );
        }}
      </Formik>
    </PersonalPageViews.ModalProfileViews>
  );
};
export default React.memo(ModalChangePhone);
