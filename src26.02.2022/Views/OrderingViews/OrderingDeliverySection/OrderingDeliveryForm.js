import React from 'react';
import CheckBox from '../../CheckBox';
import { GxInput, GxIcon, GxTextarea } from '@garpix/garpix-web-components-react';
import { successIcon } from '../../../images';
import classNames from 'classnames';
import style from '../styles/index.module.scss';

const OrderingDeliveryForm = ({
  lastname,
  firstname,
  patronomic,
  serias_and_number_passport,
  issued_passport,
  issued_date,
  comment,
  agree_personal_data,
  setFieldValue,
  errors = {},
  touched,
}) => {
  return (
    <>
      {/* Форма ниже только для розницы/дропа.
          Скрывается при нажатии на кнопку "Дождаться звонка" */}
      <div className={style['ordering_delivery__form']}>
        <h3 className={style['ordering_delivery__form_head']}>Заполнить данные сейчас</h3>
        <div className={style['ordering_delivery__form_wrap']}>
          <div className={style['ordering_delivery__form_left']}>
            <h4 className={style['ordering_delivery__form_subhead']}>ФИО</h4>
            {/* Так будет выглядеть правильно заполненное поле */}
            <GxInput
              label="Фамилия"
              value={lastname}
              name={'lastname'}
              onGx-change={(e) => {
                setFieldValue('lastname', e.target.value);
              }}
              className={classNames({
                [style['ordering_delivery__form_input']]: true,
                [style['ordering_delivery__form_input-success']]: !errors.lastname && lastname,
              })}
              placeholder="Введите фамилию"
            >
              {errors.lastname && touched.lastname ? (
                <div
                  slot="help-text"
                  className={classNames({
                    [style['ordering_delivery__form_input_slot-visible']]: errors.lastname,
                    [style['ordering_delivery__form_input_slot-hidden']]: !errors.lastname,
                  })}
                >
                  Неправильно указана фамилия
                </div>
              ) : null}

              <GxIcon
                src={successIcon}
                slot="suffix"
                className={
                  !errors.lastname && lastname
                    ? style['ordering_delivery__form_input_icon-visible']
                    : style['ordering_delivery__form_input_icon-hidden']
                }
                // "ordering_delivery__form_input_icon-hidden"
              />
              {/* Иконка появляется при прохождении валидации */}
            </GxInput>
            {/* А так выглядит неправильно заполненное */}
            <GxInput
              label="Имя"
              className={classNames({
                [style['ordering_delivery__form_input']]: true,
                [style['ordering_delivery__form_input-success']]: !errors.firstname && firstname,
              })}
              placeholder="Введите имя"
              onGx-change={(e) => {
                setFieldValue('firstname', e.target.value);
              }}
              value={firstname}
              name={'firstname'}
            >
              {errors.firstname && touched.firstname ? (
                <div
                  slot="help-text"
                  className={classNames({
                    [style['ordering_delivery__form_input_slot-visible']]: errors.firstname,
                    [style['ordering_delivery__form_input_slot-hidden']]: !errors.firstname,
                  })}
                  // при непройденной валидации класс "ordering_delivery__form_input_slot-visible"
                  // по умолчанию "ordering_delivery__form_input_slot-hidden"
                >
                  Неправильно указано имя
                </div>
              ) : null}

              <GxIcon
                src={successIcon}
                slot="suffix"
                className={
                  !errors.firstname && firstname
                    ? style['ordering_delivery__form_input_icon-visible']
                    : style['ordering_delivery__form_input_icon-hidden']
                }
              />
            </GxInput>
            <GxInput
              label="Отчество"
              className={classNames({
                [style['ordering_delivery__form_input']]: true,
                [style['ordering_delivery__form_input-success']]: !errors.patronomic && patronomic,
              })}
              placeholder="Введите отчество"
              onGx-change={(e) => {
                setFieldValue('patronomic', e.target.value);
              }}
              value={patronomic}
              name={'patronomic'}
            >
              {errors.patronomic && touched.patronomic ? (
                <div
                  slot="help-text"
                  className={classNames({
                    [style['ordering_delivery__form_input_slot-visible']]: errors.patronomic,
                    [style['ordering_delivery__form_input_slot-hidden']]: !errors.patronomic,
                  })}
                >
                  Неправильно указано отчество
                </div>
              ) : null}

              <GxIcon
                src={successIcon}
                slot="suffix"
                className={
                  !errors.patronomic && patronomic
                    ? style['ordering_delivery__form_input_icon-visible']
                    : style['ordering_delivery__form_input_icon-hidden']
                }
              />
            </GxInput>
          </div>
          <div className={style['ordering_delivery__form_right']}>
            <h4 className={style['ordering_delivery__form_subhead']}>паспортные данные</h4>
            <GxInput
              label="Серия и номер паспорта"
              className={classNames({
                [style['ordering_delivery__form_input']]: true,
                [style['ordering_delivery__form_input-success']]:
                  !errors.serias_and_number_passport && serias_and_number_passport,
              })}
              placeholder="Введите серию и номер паспорта"
              onGx-change={(e) => {
                setFieldValue('serias_and_number_passport', e.target.value);
              }}
              value={serias_and_number_passport}
              name={'serias_and_number_passport'}
            >
              {errors.serias_and_number_passport && touched.serias_and_number_passport ? (
                <div
                  slot="help-text"
                  className={classNames({
                    [style['ordering_delivery__form_input_slot-visible']]:
                      errors.serias_and_number_passport,
                    [style['ordering_delivery__form_input_slot-hidden']]:
                      !errors.serias_and_number_passport,
                  })}
                >
                  Неправильно указан номер
                </div>
              ) : null}

              <GxIcon
                src={successIcon}
                slot="suffix"
                className={
                  !errors.serias_and_number_passport && serias_and_number_passport
                    ? style['ordering_delivery__form_input_icon-visible']
                    : style['ordering_delivery__form_input_icon-hidden']
                }
              />
            </GxInput>
            <GxInput
              label="Паспорт выдан"
              className={classNames({
                [style['ordering_delivery__form_input']]: true,
                [style['ordering_delivery__form_input-success']]:
                  !errors.issued_passport && issued_passport,
              })}
              placeholder="Паспорт выдан"
              onGx-change={(e) => {
                setFieldValue('issued_passport', e.target.value);
              }}
              value={issued_passport}
              name={'issued_passport'}
            >
              {errors.issued_passport && touched.issued_passport ? (
                <div
                  slot="help-text"
                  className={classNames({
                    [style['ordering_delivery__form_input_slot-visible']]: errors.issued_passport,
                    [style['ordering_delivery__form_input_slot-hidden']]: !errors.issued_passport,
                  })}
                >
                  Неправильно указан номер
                  {/* Не знаю что в ошибку написать */}
                </div>
              ) : null}

              <GxIcon
                src={successIcon}
                slot="suffix"
                className={
                  !errors.issued_passport && issued_passport
                    ? style['ordering_delivery__form_input_icon-visible']
                    : style['ordering_delivery__form_input_icon-hidden']
                }
              />
            </GxInput>
            <GxInput
              label="Дата выдачи"
              className={classNames({
                [style['ordering_delivery__form_input']]: true,
                [style['ordering_delivery__form_input-success']]:
                  !errors.issued_date && issued_date,
              })}
              placeholder="ДД.ММ.ГГГГ"
              onGx-change={(e) => {
                setFieldValue('issued_date', e.target.value);
              }}
              type={'date'}
              value={issued_date}
              name={'issued_date'}
            >
              {errors.issued_date && touched.issued_date ? (
                <div
                  slot="help-text"
                  className={classNames({
                    [style['ordering_delivery__form_input_slot-visible']]: errors.issued_date,
                    [style['ordering_delivery__form_input_slot-hidden']]: !errors.issued_date,
                  })}
                >
                  Неправильно указана дата выдачи
                </div>
              ) : null}

              <GxIcon
                src={successIcon}
                slot="suffix"
                className={classNames({
                  [style['ordering_delivery__form_input_icon-visible']]:
                    !errors.issued_date && issued_date,
                  [style['ordering_delivery__form_input_icon-hidden']]:
                    errors.issued_date || !issued_date,
                })}
              />
            </GxInput>
          </div>
        </div>
        <h4 className={style['ordering_delivery__form_subhead']}>Комментарий</h4>
        <GxTextarea
          onGx-change={(e) => {
            setFieldValue('comment', e.target.value);
          }}
          value={comment}
          name={'comment'}
          placeholder="Напишите"
          className={style['ordering_delivery__form_textarea']}
        />
        <CheckBox
          checked={agree_personal_data}
          onClick={(e) => {
            setFieldValue('agree_personal_data', !e.target.checked);
          }}
          label="Соглашаюсь на обработку персональных данных"
        />
      </div>
    </>
  );
};

export default React.memo(OrderingDeliveryForm);
