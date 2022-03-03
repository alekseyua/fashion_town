import React from 'react';
import {
  GxInput,
  GxMenuItem,
  GxSelect,
  GxTextarea,
  GxForm,
} from '@garpix/garpix-web-components-react';
import classNames from 'classnames';
import { Formik } from 'formik';
import Button from '../../Views/Button';
import { FaqSchema } from '../../utils/schemesFormic';
import ErrorField from '../ErrorField';
import style from './styles/index.module.scss';
import { motion } from 'framer-motion';

const FieldsChat = ({ answers = [], categorys = [], submitQuestrion, successResponse }) => {

  return (
    <div className={style['widget__chat_field']}>
            <details className={style['widget__chat_details']}>
        <summary className={style['widget__chat_summary']}>
          <div className={style['widget__chat_button-text']}>Написать нам</div>
        </summary>
        <div
          className={classNames({
            [style['widget__chatmessage-full']]: true,
            [style['widget__chatmessage-user']]: true,
          })}
        >
          <div className={style['widget__chatmessage_wrapper']}>
            <div className={style['widget__chatmessage_name']}>Не нашли ответа на свой вопрос?</div>
          </div>
          <p className={style['widget__chatmessage_text']}>
            Вы можете задать его в форме ниже, ответ придет на указанную почту.
          </p>
          <Formik
            enableReinitialize
            validationSchema={FaqSchema}
            initialValues={{
              name: null,
              email: null,
              category: null,
              question: null,
            }}
            onSubmit={submitQuestrion}
          >
            {({ handleSubmit, values, touched, errors, setFieldValue, handleChange }) => {
              return (
                <GxForm novalidate onGx-submit={handleSubmit}>
                  <div className={style['widget__form_wrap']}>
                    <GxInput
                      className={style['widget__form_input']}
                      name="name"
                      onGx-change={handleChange}
                      placeholder="ФИО"
                    />
                    {errors.name && touched.name ? <ErrorField message={errors.name} /> : null}
                    <GxInput
                      className={style['widget__form_input']}
                      type="email"
                      name={'email'}
                      onGx-change={handleChange}
                      placeholder="Электронная почта"
                    />
                    {errors.email && touched.email ? <ErrorField message={errors.email} /> : null}
                    <GxSelect
                      name={'category'}
                      onGx-change={handleChange}
                      className={style['widget__form_input']}
                      placeholder="Категория"
                    >
                      {categorys.map((el) => {
                        return (
                          <GxMenuItem key={el.id} value={el.id}>
                            {el.category}
                          </GxMenuItem>
                        );
                      })}
                    </GxSelect>
                    {errors.category && touched.category ? (
                      <ErrorField message={errors.category} />
                    ) : null}
                    <GxTextarea
                      name={'question'}
                      onGx-change={handleChange}
                      className={style['widget__form_input']}
                      placeholder="Напишите Ваш вопрос"
                    />
                    {errors.question && touched.question ? (
                      <ErrorField message={errors.question} />
                    ) : null}
                    <div className={style['widget__form_btnwrap']}>
                      <Button type="submit" variant="cabinet_default">
                        Отправить
                      </Button>
                    </div>
                  </div>
                </GxForm>
              );
            }}
          </Formik>
        </div>
      </details>
      {successResponse ? (
        <div
          className={classNames({
            [style['widget__chatmessage-full']]: true,
            [style['widget__chatmessage-user']]: true,
          })}
        >
          <p className={style['widget__chatmessage-notify']}>
            Сообщение отправлено. Ответ придет на почту {successResponse}
          </p>
        </div>
      ) : null}
      {answers.map((el) => {

        return (
          <motion.details 
            initial={{
              height:0,
              opacity: 0
            }}
            animate={{
              height:'100%',
              opacity: 1
            }}
            translate={{
              delay: 4,
              duration: 3
            }}
          key={el.id} className={style['widget__chat_details']}>
            <summary className={style['widget__chat_summary']}>
              <div className={style['widget__chat_button-text']}>{el.question}</div>
            </summary>
            <motion.div
             
              className={classNames({
                [style['widget__chatmessage-full']]: true,
                [style['widget__chatmessage-admin']]: true,
              })}
            >
              <div className={style['widget__chatmessage_wrapper']}>
                <div className={style['widget__chatmessage_name']}>{el.question}</div>
              </div>
              <motion.p 
             
              className={style['widget__chatmessage_text']}>{el.answer}</motion.p>
            </motion.div>
          </motion.details>
        );
      })}

    </div>
  );
};

export default React.memo(FieldsChat);
