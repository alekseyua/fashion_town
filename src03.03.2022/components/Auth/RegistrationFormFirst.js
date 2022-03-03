import React from 'react';
import { GxForm, GxIcon } from '@garpix/garpix-web-components-react';
import { Formik } from 'formik';
import Input from '../../Views/Input';
import ErrorField from '../../Views/ErrorField';
import Error from '../../Views/Error';
import Button from '../../Views/Button';
import CheckBox from '../../Views/CheckBox';
import Text from '../Text';
import { signUpFirstFormSchema } from '../../utils/schemesFormic';
import AuthorizationAndRegViews from '../../Views/AuthorizationAndRegViews';
import { toolTipIcon } from '../../images';

const RegistrationFormFirst = ({ onSaveFormData, initialValues, setNextStep }) => {
  const errorsMessenge = {
    requiredField: Text({ text: 'requiredField' }),
    shortLastName: Text({ text: 'short.last.name' }),
    longLastName: Text({ text: 'longLastName' }),
    shortFirstname: '',
    longFirstname: Text({ text: 'long.first.name' }),
    shortPatronymic: '',
    longPatronymic: Text({ text: 'long.patronymic' }),
    shortusername: '',
    longusername: 'Слишком длинный никнейм!',
    username: 'Некоректный никнейм',
    symbol: 'Поле не должно содержать спец. символы',
  };
  return (
    <Formik
      validationSchema={signUpFirstFormSchema(errorsMessenge)}
      initialValues={initialValues}
      onSubmit={onSaveFormData}
    >
      {({ handleSubmit, handleChange, setFieldValue, values, errors, touched }) => {
        return (
          <GxForm noValidate onGx-submit={handleSubmit}>
            <Input
              value={values.lastname}
              variant={'largeCustomLabel'}
              className={'input-mt_20'}
              name={'lastname'}
              data-cy={'registration_last_name'}
              autocomplete={'off'}
              onGx-input={(e) => setFieldValue('lastname', e.target.value.trim())}
              placeholder={Text({ text: 'enterLastName' })}
              label={Text({ text: 'lastname' })}
              helpText={errors.lastname ? <ErrorField message={errors.lastname} /> : null}
            />
            <Input
              className={'input-mt_20'}
              value={values.firstname}
              variant={'largeCustomLabel'}
              name={'firstname'}
              data-cy={'registration_first_name'}
              autocomplete={'off'}
              label={Text({ text: 'firstname' })}
              placeholder={Text({ text: 'enterFirstName' })}
              onGx-input={(e) => setFieldValue('firstname', e.target.value.trim())}
              helpText={errors.firstname ? <ErrorField message={errors.firstname} /> : null}
            />
            <Input
              className={'input-mt_20'}
              value={values.patronymic}
              variant={'largeCustomLabel'}
              placeholder={Text({ text: 'enterPatronymic' })}
              name={'patronymic'}
              data-cy={'registration_middle_name'}
              autocomplete={'off'}
              label={Text({ text: 'patronymic' })}
              onGx-input={(e) => setFieldValue('patronymic', e.target.value.trim())}
              helpText={errors.patronymic ? <ErrorField message={errors.patronymic} /> : null}
            />
            <AuthorizationAndRegViews.WrapperInputForTooltip
              content={Text({ text: 'tooltipDatausername' })}
              trigger={'hover'}
            >
              <Input
                className={'input-mt_20'}
                value={values.username}
                variant={'largeCustomLabel'}
                placeholder={Text({ text: 'enterusername' })}
                name={'username'}
                data-cy={'registration_nick_name'}
                autocomplete={'off'}
                label={Text({ text: 'username' })}
                onGx-input={(e) => setFieldValue('username', e.target.value.trim())}
                helpText={errors.username ? <ErrorField message={errors.username} /> : null}
              >
                <GxIcon slot={'suffix'} src={toolTipIcon} />
              </Input>
            </AuthorizationAndRegViews.WrapperInputForTooltip>
            {errors.iAgreeDataProcessing ? <Error message={errorsMessenge.requiredField} /> : null}
            <CheckBox
              checked={values.iAgreeDataProcessing}
              name={'iAgreeDataProcessing'}
              data-cy={'registration_check_box'}
              label={Text({ text: 'iAgreeDataProcessing' })}
              onGx-change={(e) => {
                if (e.target.checked === null) return;
                setFieldValue('iAgreeDataProcessing', e.target.checked);
              }}
            />
            <Button
              variant={'black_btn_full_width'}
              type={'submit'}
              onClick={(e) => {
                onSaveFormData(values);
              }}
              data-cy={'registration_button'}
            >
              <Text text={'saveAndContinue'} />
            </Button>
          </GxForm>
        );
      }}
    </Formik>
  );
};

export default React.memo(RegistrationFormFirst);
