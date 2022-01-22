import React from 'react';
import { GxForm, GxIcon } from '@garpix/garpix-web-components-react';
import { ROLE } from '../../const';
import { Formik } from 'formik';
import Input from '../../Views/Input';
import ErrorField from '../../Views/ErrorField';
import { toolTipIcon, successIcon } from '../../images';
import Button from '../../Views/Button';
import CheckBox from '../../Views/CheckBox';
import Text from '../Text';
import { signUpBaseInfoFormSchema } from '../../utils/schemesFormic';
import Select from '../../Views/Select';
import AuthorizationAndRegViews from '../../Views/AuthorizationAndRegViews';
import Error from '../../Views/Error';
import PhoneField from '../../Views/PhoneField';

const RegistrationFormBaseInfo = ({
  onSaveFormData,
  initialValues,
  role,
  serverError,
  setNextStep,
}) => {
  const getIconSuccess = (error, value) => {
    // !!errors.password || !!!values.password ? toolTipIcon : successIcon;
    if (!!error || value === '') {
      return toolTipIcon;
    } else {
      return successIcon;
    }
  };
  const errorsMessenge = {
    phone: Text({ text: 'notValidPass' }),
    shortPass: Text({ text: 'shortPass' }),
    longPass: Text({ text: 'longPass' }),
    requiredField: Text({ text: 'requiredField' }),
    email: Text({ text: 'notValidEmail' }),
    longEmail: Text({ text: 'notValidEmail' }),
    confirm_password: Text({ text: 'invalid.confirm.password' }),
  };
  const whereDidYouHearAboutServiceOptions = [
    {
      title: Text({ text: 'internetAdvertising' }),
      value: Text({ text: 'internetAdvertising' }),
    },
    {
      title: Text({ text: 'fromSocialNetworks' }),
      value: Text({ text: 'fromSocialNetworks' }),
    },
    {
      title: Text({ text: 'fromFrends' }),
      value: Text({ text: 'fromFrends' }),
    },
    {
      title: Text({ text: 'other' }),
      value: Text({ text: 'other' }),
    },
  ];
  return (
    <Formik
      enableReinitialize
      validationSchema={signUpBaseInfoFormSchema(errorsMessenge)}
      initialValues={initialValues}
      onSubmit={onSaveFormData}
    >
      {({ handleSubmit, setFieldValue, handleChange, values, errors }) => {

        return (
          <GxForm noValidate onGx-submit={handleSubmit}>
            <Input
              value={values.email}
              variant={'largeCustomLabel'}
              className={'input-mt_20'}
              name={'email'}
              placeholder={Text({ text: 'enterEmail' })}
              autocomplete={'off'}
              onGx-input={(e) => setFieldValue('email', e.target.value.trim())}
              label={Text({ text: 'email_address' })}
              helpText={errors.email ? <ErrorField message={errors.email} /> : null}
              data-cy={'registration_email'}
            />
            <PhoneField
              variant={'varian-input'}
              value={values.phone}
              name={'phone'}
              placeholder={Text({ text: 'enterPhone' })}
              autocomplete={'off'}
              label={Text({ text: 'mobPhone' })}
              onGx-change={(e) => {
                setFieldValue('phone', e.detail.formattedValue);
              }}
              helpText={errors.phone ? <ErrorField message={errors.phone} /> : null}
              data-cy={'registration_phone'}
            />
            <AuthorizationAndRegViews.WrapperInputForTooltip
              content={Text({ text: 'tooltipDataPassword' })}
              trigger={'hover'}
            >
              <Input
                className={'input-mt_20'}
                value={values.password}
                variant={'largeCustomLabel'}
                placeholder={Text({ text: 'enterPassword' })}
                name={'password'}
                autocomplete={'off'}
                label={Text({ text: 'password' })}
                type={'password'}
                onGx-input={handleChange}
                helpText={errors.password ? <ErrorField message={errors.password} /> : null}
                data-cy={'registration_password'}
              >
                <GxIcon slot={'suffix'} src={getIconSuccess(errors.password, values.password)} />
              </Input>
            </AuthorizationAndRegViews.WrapperInputForTooltip>
            <Input
              className={'input-mt_20'}
              value={values.confirm_password}
              variant={'largeCustomLabel'}
              placeholder={Text({ text: 'confirm_password' })}
              name={'confirm_password'}
              autocomplete={'off'}
              label={Text({ text: 'confirm_password' })}
              type={'password'}
              onGx-input={handleChange}
              helpText={
                errors.confirm_password ? <ErrorField message={errors.confirm_password} /> : null
              }
              data-cy={'registration_confirm_password'}
            />
            <Select
              className={'select-mb_30'}
              value={values.whereDidYouHearAboutService}
              variant={'largeCustomLabel'}
              name={'whereDidYouHearAboutService'}
              placeholder={Text({ text: 'whereDidYouHearAboutService' })}
              label={Text({ text: 'whereDidYouHearAboutService' })}
              onGx-change={handleChange}
              helpText={
                errors.whereDidYouHearAboutService ? (
                  <ErrorField message={errors.whereDidYouHearAboutService} />
                ) : null
              }
              options={whereDidYouHearAboutServiceOptions}
              data-cy={'registration_where_Did_You_Hear_About_Service'}
            />
            {values.whereDidYouHearAboutService === Text({ text: 'other' }) ? (
              <Input
                value={values.otherWhereDidHearAbout}
                variant={'largeCustomLabel'}
                className={'input-mt_20'}
                name={'otherWhereDidHearAbout'}
                placeholder={Text({ text: 'other' })}
                autocomplete={'off'}
                onGx-input={(e) => setFieldValue('otherWhereDidHearAbout', e.target.value.trim())}
                label={Text({ text: 'other' })}
                helpText={
                  errors.otherWhereDidHearAbout ? (
                    <ErrorField message={errors.otherWhereDidHearAbout} />
                  ) : null
                }
                data-cy={'another_field'}
              />
            ) : null}
            {errors.receiveNewsletters ? <Error message={errors.receiveNewsletters} /> : null}
            <CheckBox
              checked={values.receiveNewsletters}
              onGx-change={(e) => {
                if (e.target.checked === null) return;
                setFieldValue('receiveNewsletters', e.target.checked);
              }}
              name={'receiveNewsletters'}
              label={Text({ text: 'receiveNewsletters' })}
              data-cy={'registration_checkbox_drop'}
            />
            {role === ROLE.RETAIL ? (
              <AuthorizationAndRegViews.ErrorBlock helpText={serverError} />
            ) : null}
            <Button
              variant={'black_btn_full_width'}
              type={'submit'}
              onClick={(e) => {
                onSaveFormData(values);
              }}
              data-cy={'button_registration'}
            >
              {role === ROLE.RETAIL ? (
                <Text text={'registration'} />
              ) : (
                <Text text={'saveAndContinue'} />
              )}
            </Button>
          </GxForm>
        );
      }}
    </Formik>
  );
};

export default React.memo(RegistrationFormBaseInfo);
