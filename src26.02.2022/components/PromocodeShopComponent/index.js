import React, { useEffect, useState } from 'react';
import PromoCode from '../../Views/MyShopViews/PromoCode';
import PersonalPageViews from '../../Views/PersonalPageViews';
import { FetcherList, dataStates } from '@garpix/fetcher';
import { GxModal, GxForm } from '@garpix/garpix-web-components-react';
import { Formik } from 'formik';
import api from '../../api';
import ModalContentViews from '../../Views/ModalContentViews';
import Button from '../../Views/Button';
import Text from '../Text';
import classNames from 'classnames';
import Title from '../../Views/Title';
import ErrorField from '../../Views/ErrorField';
import Input from '../../Views/Input';
import { ERROR_STATUS } from '../../const';
import styleModal from '../../Views/ModalCreator/modalCreator.module.scss';

const shopApi = api.shopApi;
const initStatetModal = {
  show: false,
  content: null,
  callbackOfClose: () => {},
};
const PromocodeShopComponent = ({}) => {
  const [modalStates, setmodalStates] = useState(initStatetModal);

  const closeModal = () => {
    setmodalStates(initStatetModal);
  };

  const submitUpdatePromocode = (data, { setFieldError, resetForm }, reload) => {
    if (!data.title) {
      setFieldError('title', 'Обязательное поле');
    } else if (!data.discount) {
      setFieldError('discount', 'Обязательное поле');
    }
    const params = { title: data.title, discount: data.discount };
    shopApi
      .updateShopPromocode(data.id, params)
      .then((res) => {
        resetForm();
        reload();
        closeModal();
      })
      .catch((err) => {
        if (err.response.status === ERROR_STATUS.BAD_REQUEST) {
          if (err.response.data instanceof Object) {
            for (const key in err.response.data) {
              const element = err.response.data[key];
              setFieldError(key, element);
            }
          }
        }
      });
  };

  const submitCreatePromocode = (data, { setFieldError, resetForm }, reload) => {
    if (!data.title) {
      setFieldError('title', 'Обязательное поле');
    } else if (!data.discount) {
      setFieldError('discount', 'Обязательное поле');
    }
    const params = { title: data.title, discount: data.discount };
    shopApi
      .createShopPromocode(params)
      .then((res) => {
        resetForm();
        reload();
        closeModal();
      })
      .catch((err) => {
        if (err.response.status === ERROR_STATUS.BAD_REQUEST) {
          if (err.response.data instanceof Object) {
            for (const key in err.response.data) {
              const element = err.response.data[key];
              setFieldError(key, element);
            }
          }
        }
      });
  };

  const openModalCreatePromocode = (
    reload,
    initValues = {
      title: '',
      discount: '',
    },
    change = false,
  ) => {
    setmodalStates({
      show: true,
      content: (
        <Formik
          initialValues={initValues}
          onSubmit={(data, options) => {
            if (!change) {
              submitCreatePromocode(data, options, reload);
            } else {
              submitUpdatePromocode(data, options, reload);
            }
          }}
        >
          {({ handleSubmit, handleChange, values, errors, setFieldValue, touched }) => {
            return (
              <GxForm novalidate onGx-submit={handleSubmit}>
                <Title variant={'promocode-create'} type={'h2'}>
                  Промокод
                </Title>
                <ModalContentViews.SubTitlePromocode />
                <ModalContentViews.FormBlock>
                  <Input
                    value={values.title}
                    name={'title'}
                    autocomplete={'off'}
                    onGx-input={handleChange}
                    className={errors.title ? 'error' : ''}
                    helpText={errors.title ? <ErrorField message={errors.title} /> : null}
                    label={'Название промокода'}
                    placeholder={'PROMOCODE01'}
                  />
                </ModalContentViews.FormBlock>
                <ModalContentViews.FormBlock>
                  <Input
                    value={values.discount}
                    name={'discount'}
                    autocomplete={'off'}
                    max={99}
                    type={'number'}
                    onGx-input={handleChange}
                    className={errors.discount ? 'error' : ''}
                    helpText={errors.discount ? <ErrorField message={errors.discount} /> : null}
                    label={'Скидка'}
                  />
                </ModalContentViews.FormBlock>
                <ModalContentViews.FormButtons closeModal={closeModal} />
              </GxForm>
            );
          }}
        </Formik>
      ),
    });
  };

  const deactivateHandleClick = (id, reload, is_active) => {
    shopApi.updateShopPromocode(id, { is_active }).then((res) => {
      reload();
    });
  };

  const changeHandleClick = (reload, data) => {
    openModalCreatePromocode(reload, data, true);
  };

  const deleteAllPromocode = (reload) => {};

  const deleteHandleClick = (id, reload) => {
    shopApi.deleteShopPromocode(id).then((res) => {
      reload();
    });
  };

  const createPromocode = (reload) => {
    openModalCreatePromocode(reload);
  };
  return (
    <FetcherList isScrollTop={false} api={shopApi.getShopPromocode}>
      {(data) => {
        const { results = [], showMore, isNext, reload } = data;
        return (
          <React.Fragment>
            <GxModal
              onGx-after-hide={closeModal}
              open={modalStates.show}
              className={classNames({
                [styleModal['modal_creator']]: true,
                [styleModal['modal-promocode']]: true,
              })}
            >
              <ModalContentViews.ModalWrapper>
                <ModalContentViews.CloseBtn closeModal={closeModal} />
                <ModalContentViews.ContentBlock>
                  {modalStates.content}
                </ModalContentViews.ContentBlock>
              </ModalContentViews.ModalWrapper>
            </GxModal>
            <PersonalPageViews.WrapperForm>
              <PromoCode.Header
                onClick={() => {
                  deleteAllPromocode(reload);
                }}
              />
              <PromoCode.MainBlock>
                <PersonalPageViews.AdresesWrapper>
                  <PromoCode.AddPromoCode
                    onClick={() => {
                      createPromocode(reload);
                    }}
                  />
                  {results.map((el) => {
                    return (
                      <PromoCode.Block
                        key={el.id}
                        {...el}
                        deactivateHandleClick={() => {
                          return deactivateHandleClick(el.id, reload, !el.is_active);
                        }}
                        changeHandleClick={() => {
                          return changeHandleClick(reload, {
                            title: el.title,
                            discount: el.discount,
                            id: el.id,
                          });
                        }}
                        deleteHandleClick={() => {
                          return deleteHandleClick(el.id, reload);
                        }}
                      />
                    );
                  })}

                  {/* <PromoCode.Block active={true} />
                <PromoCode.Block /> */}
                </PersonalPageViews.AdresesWrapper>
                {isNext ? (
                  <Button full onClick={showMore} variant={'show_more'}>
                    <Text text={'show.more'} />
                  </Button>
                ) : null}
              </PromoCode.MainBlock>
            </PersonalPageViews.WrapperForm>
          </React.Fragment>
        );
      }}
    </FetcherList>
  );
};

export default React.memo(PromocodeShopComponent);
