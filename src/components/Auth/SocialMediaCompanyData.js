import React from 'react';
import { GxForm, GxIcon } from '@garpix/garpix-web-components-react';
import { fbIcon, igIcon, vkContrastIcon } from '../../images';
import { ROLE } from '../../const';
import { Formik } from 'formik';
import Input from '../../Views/Input';
import ErrorField from '../../Views/ErrorField';
import HelpTextAndLine from '../../Views/HelpTextAndLine';
import Button from '../../Views/Button';
import Text from '../Text';
import AuthorizationAndRegViews from '../../Views/AuthorizationAndRegViews';
import {
  signUpSocialMediaFormSchema,
  signUpSocialMediaNotRequiredFormSchema,
} from '../../utils/schemesFormic';
import Select from '../../Views/Select';

const SocialMediaCompanyData = ({ onSaveFormData, initialValues, role, serverError }) => {
  const errorsMessenge = {
    requiredField: Text({ text: 'requiredField' }),
    invalidInn: Text({ text: 'invalidInn' }),
    shortCompanyName: Text({ text: 'shortCompanyName' }),
    shortInn: Text({ text: 'shortInn' }),
    longInn: Text({ text: 'longInn' }),
    inn: Text({ text: 'invalidInn' }),
  };
  const shema =
    role !== ROLE.DROPSHIPPER
      ? signUpSocialMediaFormSchema(errorsMessenge)
      : signUpSocialMediaNotRequiredFormSchema(errorsMessenge);

  return (
    <Formik
      enableReinitialize
      validationSchema={shema}
      initialValues={initialValues}
      onSubmit={onSaveFormData}
    >
      {({ handleSubmit, handleChange, values, errors }) => {
        return (
          <GxForm noValidate onGx-submit={handleSubmit}>
            {role !== ROLE.DROPSHIPPER ? (
              <>
                <Input
                  value={values.companyName}
                  variant={'largeCustomLabel'}
                  className={'input-mt_20'}
                  autocomplete={'off'}
                  name={'companyName'}
                  placeholder={Text({ text: 'enterCompanyName' })}
                  onGx-input={handleChange}
                  label={Text({ text: 'companyName' })}
                  helpText={errors.companyName ? <ErrorField message={errors.companyName} /> : null}
                  data-cy={'registration_company_name'}
                />
                <Input
                  value={values.inn}
                  variant={'largeCustomLabel'}
                  className={'input-mt_20'}
                  autocomplete={'off'}
                  name={'inn'}
                  placeholder={Text({ text: 'enterInn' })}
                  onGx-input={handleChange}
                  label={Text({ text: 'inn' })}
                  helpText={errors.inn ? <ErrorField message={errors.inn} /> : null}
                  data-cy={'registration_inn'}
                />
                <HelpTextAndLine>
                  <Text text={'linksSocialNetworks'} />
                </HelpTextAndLine>
              </>
            ) : null}
            <Input
              value={values.vk}
              variant={'largeCustomLabel'}
              className={'input-mt_20'}
              autocomplete={'off'}
              name={'vk'}
              placeholder={Text({ text: 'enterPageID' })}
              onGx-input={handleChange}
              label={'VK'}
              helpText={errors.vk ? <ErrorField message={errors.vk} /> : null}
              data-cy={'registration_vk_pageID'}
            >
              <GxIcon slot={'suffix'} src={vkContrastIcon} />
            </Input>
            <Input
              value={values.instagram}
              variant={'largeCustomLabel'}
              autocomplete={'off'}
              className={'input-mt_20'}
              name={'instagram'}
              placeholder={Text({ text: 'enterAccName' })}
              onGx-input={handleChange}
              label={'Instagram'}
              helpText={errors.instagram ? <ErrorField message={errors.instagram} /> : null}
              data-cy={'registration_instagram_pageID'}
            >
              <GxIcon slot={'suffix'} src={igIcon} />
            </Input>
            <Input
              value={values.other}
              variant={'largeCustomLabel'}
              className={'input-mt_20'}
              autocomplete={'off'}
              name={'other'}
              onGx-input={handleChange}
              placeholder={Text({ text: 'enterPageID' })}
              label={Text({ text: 'other' })}
              helpText={errors.other ? <ErrorField message={errors.other} /> : null}
              data-cy={'registration_facebook_pageID'}
            ></Input>
            <AuthorizationAndRegViews.ErrorBlock helpText={errors.error} />
            <Button
              variant={'black_btn_full_width'}
              type={'submit'}
              data-cy={'registration_button_step_3'}
            >
              <Text text={'registration'} />
            </Button>
          </GxForm>
        );
      }}
    </Formik>
  );
};

export default React.memo(SocialMediaCompanyData);
