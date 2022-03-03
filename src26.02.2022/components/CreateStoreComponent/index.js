import React, { useState } from 'react';
import { GxRow, GxForm, GxIcon } from '@garpix/garpix-web-components-react';
import AuthorizationAndRegViews from '../../Views/AuthorizationAndRegViews';
import { Formik, ErrorMessage } from 'formik';
import Grid from '../../Views/Grid';
import Coll from '../../Views/Coll';
import api from '../../api';
import Input from '../../Views/Input';
import ErrorField from '../../Views/ErrorField';
import Button from '../../Views/Button';
import CheckBox from '../../Views/CheckBox';
import Text from '../Text';
import { toolTipIcon, createIMImage } from '../../images';
import { createShopSheme } from '../../utils/schemesFormic';

const apiShop = api.shopApi;

const CreateStoreComponent = ({ site_configuration, profile }) => {
  const { user } = profile;
  const [serverError, setServerError] = useState('');
  const { page_type_reg, page_type_catalog } = site_configuration;
  const errorsMessenge = {
    requiredField: Text({ text: 'requiredField' }),
    maxLengthField: Text({ text: 'max.length.field' }),
    symbol: 'Поле не должно содержать спец. символы',
    longComments: Text({ text: 'long.comments' }),
    shortComments: Text({ text: 'short.comments' }),
    shortDomain: Text({ text: 'short.domain' }),
    longDomain: Text({ text: 'long.domain' }),
    longIM: Text({ text: 'longIM' }),
  };
  const initialValues = {
    nameIM: null,
    lastName: user.last_name,
    firstName: user.first_name,
    patronymic: user.middle_name,
    domain: null,
    comentsForDNS: null,
  };
  const onSubmit = (data, { setFieldError }) => {

    const params = {
      title: data.nameIM,
      first_name: data.lastName,
      middle_name: data.patronymic,
      last_name: data.firstName,
      domain: data.domain,
      comment: data.comentsForDNS,
    };

    apiShop
      .createShop(params)
      .then((res) => {
        window.location.href = page_type_catalog;
      })
      .catch((err) => {});
  };
  return (
    <Grid>
      <GxRow>
        <Coll sizeLg={6} sizeMd={12} sizeSm={12} sizeXl={6} sizeXs={12}>
          <AuthorizationAndRegViews.LeftSide image={createIMImage} />
        </Coll>
        <Coll sizeLg={6} sizeMd={12} sizeSm={12} sizeXl={6} sizeXs={12}>
          <AuthorizationAndRegViews.RightSide>
            <AuthorizationAndRegViews.FormCreateIM>
              <Formik
                validationSchema={createShopSheme(errorsMessenge)}
                initialValues={initialValues}
                onSubmit={onSubmit}
              >
                {({ handleSubmit, handleChange, values, errors, setFieldValue }) => {
                  console.log(`errors`, errors);

                  return (
                    <GxForm noValidate onGx-submit={handleSubmit}>
                      <Input
                        value={values.nameIM}
                        variant={'largeCustomLabel'}
                        className={'input-mt_20'}
                        name={'nameIM'}
                        autocomplete={'off'}
                        onGx-input={handleChange}
                        data-cy={'create_shop_nameIM'}
                        placeholder={Text({ text: 'pls.enter.name.shop' })}
                        label={Text({ text: 'nameIM' })}
                        helpText={errors.nameIM ? <ErrorField message={errors.nameIM} /> : null}
                      />
                      <AuthorizationAndRegViews.WrapperInputForTooltip
                        content={Text({ text: 'tooltipDataPassword' })}
                        trigger={'hover'}
                      >
                        <Input
                          className={'input-mt_20'}
                          value={values.domain}
                          variant={'largeCustomLabel'}
                          placeholder={Text({ text: 'enterdomain' })}
                          name={'domain'}
                          autocomplete={'off'}
                          label={Text({ text: 'domain.name' })}
                          onGx-input={handleChange}
                          helpText={errors.domain ? <ErrorField message={errors.domain} /> : null}
                          data-cy={'create_shop_domain'}
                        >
                          <GxIcon slot={'suffix'} src={toolTipIcon} />
                        </Input>
                      </AuthorizationAndRegViews.WrapperInputForTooltip>
                      <Input
                        value={values.comentsForDNS}
                        variant={'largeCustomLabel'}
                        className={'input-mt_20'}
                        name={'comentsForDNS'}
                        autocomplete={'off'}
                        onGx-input={handleChange}
                        data-cy={'create_shop_comentsForDNS'}
                        label={Text({ text: 'coments.for.DNS' })}
                        placeholder={Text({ text: 'enter.coments.for.DNS' })}
                        helpText={
                          errors.comentsForDNS ? (
                            <ErrorField message={errors.comentsForDNS} />
                          ) : null
                        }
                      />
                      <AuthorizationAndRegViews.ErrorBlock helpText={errors.serverError} />
                      <Button
                        variant={'black_btn_full_width'}
                        type={'submit'}
                        data-cy={'submit_application_IM'}
                      >
                        <Text text={'submit.you.application'} />
                      </Button>
                    </GxForm>
                  );
                }}
              </Formik>
            </AuthorizationAndRegViews.FormCreateIM>
          </AuthorizationAndRegViews.RightSide>
        </Coll>
      </GxRow>
    </Grid>
  );
};

export default React.memo(CreateStoreComponent);
