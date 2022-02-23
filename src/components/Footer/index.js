import React, { useEffect, useState } from 'react';
import { GxTextarea, GxForm } from '@garpix/garpix-web-components-react';
import { Formik, ErrorMessage } from 'formik';
import TopFooter from '../../Views/TopFooter';
import BottomFooter from '../../Views/BottomFooter';
import ModalContentViews from '../../Views/ModalContentViews';
import Button from '../../Views/Button';
import { useStoreon } from 'storeon/react';
import WarningBlock from '../../Views/ModalContentViews/WarningBlock';
import Select from '../../Views/Select';
import Input from '../../Views/Input';
import Offset from '../../Views/Offset';
import { feedbackSheme } from '../../utils/schemesFormic';
import ErrorField from '../../Views/ErrorField';
import api from '../../api';
import { ERROR_STATUS } from '../../const';

const contentApi = api.contentApi;

export default ({ footer_menu = [], site_configuration, role_configuration, year, policy }) => {
  const { dispatch } = useStoreon('modal');
  const [optionsProblemArea, setoptionsProblemArea] = useState([]);

  const closeModal = () => {
    dispatch('modal/update', {
      show: false,
      content: null,
      addClass: false,
    });
  };

  const onSubmit = (data) => {
    const fd = new FormData();
    fd.set('problem_area', data.problem_area);
    fd.set('name', data.name);
    fd.set('email', data.email);
    fd.set('message', data.message);
    fd.set('files', data.files);
    contentApi
      .postFeedback(fd)
      .then((res) => {
        dispatch('modal/update', {
          content: (
            <ModalContentViews.ModalWrapper>
              <ModalContentViews.CloseBtn closeModal={closeModal} />
              <ModalContentViews.ContentBlock>
                <ModalContentViews.CenterPosition>
                  <ModalContentViews.SuccessOrError
                    closeModal={closeModal}
                    success={true}
                    content={
                      // 'Запрос отправлен, с вами обязательно свяжется менеджер через указанную вами почту!'
                      'Ваше обращение зарегистрировано и передано ответственному сотруднику. Благодарим Вас за сотрудничество!'
                    }
                  />
                </ModalContentViews.CenterPosition>
              </ModalContentViews.ContentBlock>
            </ModalContentViews.ModalWrapper>
          ),
          show: true,
          addClass: 'modal-success_error',
        });
      })
      .catch((err) => {
        const response = err.response;
        if (response.status !== ERROR_STATUS.BAD_REQUEST) {
          dispatch('modal/update', {
            content: (
              <ModalContentViews.ModalWrapper>
                <ModalContentViews.CloseBtn closeModal={closeModal} />
                <ModalContentViews.ContentBlock>
                  <ModalContentViews.CenterPosition>
                    <ModalContentViews.SuccessOrError
                      closeModal={closeModal}
                      success={false}
                      content={
                        <>
                          <div>Упс...</div>
                          <div>Что-то пошло не так!</div>
                        </>
                      }
                    />
                  </ModalContentViews.CenterPosition>
                </ModalContentViews.ContentBlock>
              </ModalContentViews.ModalWrapper>
            ),
            show: true,
            addClass: 'modal-success_error',
          });
        }
      });
  };

  const openModalFeedback = () => {
    dispatch('modal/update', {
      show: true,
      addClass: 'modal-feedback',
      content: (
        <Formik
          enableReinitialize
          validationSchema={feedbackSheme()}
          initialValues={{
            problem_area: null,
            name: null,
            email: null,
            message: null,
            files: null,
          }}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, handleChange, values, errors, setFieldValue, touched }) => {
            return (
              <GxForm noValidate onGx-submit={handleSubmit}>
                <ModalContentViews.ModalWrapper>
                  <ModalContentViews.CloseBtn closeModal={closeModal} />
                  <ModalContentViews.HeaderBlock mb={'40px'} title={'Форма обратной связи'} />
                  <WarningBlock>
                  В случае возниконовения вопросов Вы можете свызаться с нами с помощью формы ниже. Ответ по Вашему обращению Вы получите в течении 3х рабочих дней на указанный почтовый адрес
                    {/* Если у вас возникли вопросы, напишите нам. Обязательно укажите причину обращения
                    в поле “Тематика обращения”. Если в выпадающем списке вы не нашли нужную вам
                    причину, выберите вариант “Другое”. */}
                  </WarningBlock>
                  <ModalContentViews.ContentBlock>
                    <Select
                      autocomplete={'off'}
                      placeholder={'Введите'}
                      variant={'select-feedback'}
                      name={'problem_area'}
                      value={values.problem_area}
                      onGx-change={handleChange}
                      label={'Тематика обращения'}
                      options={optionsProblemArea}
                    />
                    <Input
                      className={'input-mt_20'}
                      value={values.name}
                      variant={'largeCustomLabel'}
                      name={'name'}
                      onGx-change={handleChange}
                      data-cy={'registration_first_name'}
                      autocomplete={'off'}
                      label={'Как к Вам обращаться'}
                      placeholder={'Введите'}
                      onGx-input={(e) => {}}
                      helpText={errors.name ? <ErrorField message={errors.name} /> : null}
                    />
                    <Input
                      className={'input-mt_20'}
                      value={values.email}
                      variant={'largeCustomLabel'}
                      name={'email'}
                      onGx-change={handleChange}
                      data-cy={'registration_first_name'}
                      autocomplete={'off'}
                      label={'Адрес эл.почты'}
                      placeholder={'Введите email'}
                      onGx-input={(e) => {}}
                      helpText={errors.email ? <ErrorField message={errors.email} /> : null}
                    />
                    <GxTextarea
                      value={values.message}
                      name={'message'}
                      onGx-change={handleChange}
                      placeholder={'Напишите Ваш вопрос'}
                      label={'Описание'}
                      helpText={errors.message ? <ErrorField message={errors.message} /> : null}
                    ></GxTextarea>
                    <Offset offset={'content'} />
                    <input
                      name={'files'}
                      onChange={(e) => {
                        const files = e.currentTarget.files;
                        setFieldValue('files', files[0]);
                      }}
                      type="file"
                    />
                    <Offset offset={'content'} />
                    <Button type={'submit'} full variant={'cancel-black-full'}>
                      отправить
                    </Button>
                  </ModalContentViews.ContentBlock>
                </ModalContentViews.ModalWrapper>
              </GxForm>
            );
          }}
        </Formik>
      ),
    });
  };

  useEffect(() => {
    contentApi.getProblemArea().then((res) => {
      setoptionsProblemArea(
        res.map((el) => {
          return {
            value: el.id,
            title: el.problem_area,
          };
        }),
      );
    });
  }, []);

  return (
    <footer>
      <TopFooter
        footer_menu={footer_menu}
        site_configuration={site_configuration}
        role_configuration={role_configuration}
        openModalFeedback={openModalFeedback}
        // header_menu={header_menu}
        // catalog_menu={}
      />
      <BottomFooter
        site_configuration={site_configuration}
        year={year}
        policy={policy}
        // payment_methods={}
      />
    </footer>
  );
};
