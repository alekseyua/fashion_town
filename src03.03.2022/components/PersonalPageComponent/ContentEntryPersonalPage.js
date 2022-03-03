import React, { useState, useEffect, useRef } from 'react';
import api from '../../api';
import { GxIcon, GxForm, GxSpinner, GxModal } from '@garpix/garpix-web-components-react';
import ErrorField from '../../Views/ErrorField';
import { fbIcon, igIcon, vkIcon } from '../../images';
import { putUserDataSerializer } from '../../utils/serializers';
import PersonalPageViews from '../../Views/PersonalPageViews';
import ModalChangePassword from './ModalChangePassword';
import ModalDeleteAccount from './ModalDeleteAccount';
import ModalChangePhone from './ModalChangePhone';
import ModalTakeAdvertisment from './ModalTakeAdvertisment';
import { changeUserDataSchema } from '../../utils/schemesFormic';
import { ROLE } from '../../const';
import Input from '../../Views/Input';
import { Formik } from 'formik';
import Button from '../../Views/Button';
import CheckBox from '../../Views/CheckBox';
import Text from '../../components/Text';
import Container from '../../Views/Container';
import styleModal from '../../Views/ModalCreator/modalCreator.module.scss';
import classNames from 'classnames';
import ModalContentViews from '../../Views/ModalContentViews';
import { removeCookie } from '../../utils';
import { COOKIE_KEYS } from '../../const';

const apiUser = api.userApi;
// const ModalChangePhone = ({}) => {
//   return <PersonalPageViews.ModalChangePhone></PersonalPageViews.ModalChangePhone>;
// };
/**
 * Показывать или нет некоторые поля в профиле (инн название компании и т.д)
 * !настнройка схемы валидатора тоже зависит от этого параметра
 * @param {*} role
 */
const checkRoleForAddFields = (role) => {
  let result = true;
  if (role === ROLE.DROPSHIPPER || ROLE.RETAIL === role) result = false;
  return result;
};

const ContentEntryPersonalPage = ({
  setModalStates,
  user,
  profile,
  role,
  organization,
  links = null,
  site_configuration,
}) => {
  const { page_type_catalog } = site_configuration;
  const [isConcatReqFildsFromRole, setIsConcatReqFildsFromRole] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const [resultChangeNumber, setResultChangeNumber] = useState(false);
  const [successAddReview, setSuccessAddReview] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const onChange=(cheked)=>{
    setIsChecked(cheked);
    setIsModalOpen(true);
    isModalOpen && isChecked
      ? setModalStates({
          content: <ModalTakeAdvertisment closeModal={closeModal} />,
          show: true,
          addClass: 'modal-make__advertisement',
        })
      : null;
  };

  const openModalFinalyAddReview = (type) => {
    setResultChangeNumber(true);
    setSuccessAddReview(type);
  };

  const deleteAccountSubmit = (params) => {
    apiUser.deleteUser(user.id, params).then((res) => {
      removeCookie(COOKIE_KEYS.AUTH);
      window.location.href = page_type_catalog;
    });
  };

  const closeModal = () => {
    setModalStates({
      content: null,
      show: false,
      addClass: null,
    });
    setResultChangeNumber(false);
  };
  const deleteAccount = () => {
    setModalStates({
      content: (
        <ModalDeleteAccount
          deleteAccountSubmit={deleteAccountSubmit}
          title={'Удаление аккаунта'}
          closeModal={closeModal}
        />
      ),
      show: true,
      addClass: 'modal-delete__account',
    });
  };
  const changePassword = () => {
    setModalStates({
      content: (
        <ModalChangePassword
          title={'Введите новый пароль'}
          closeModal={closeModal}
          userId={user.id}
        />
      ),
      show: true,
      addClass: 'modal-change__password',
    });
  };
  const changePhone = () => {
    setModalStates({
      content: (
        <ModalChangePhone
          userId={user.id}
          closeModal={closeModal}
          openModalFinalyAddReview={openModalFinalyAddReview}
        />
      ),
      show: true,
      addClass: 'modal-change__phone',
    });
  };
  const errorsMessenge = {
    shortLastName: Text({ text: 'short.last.name' }),
    longLastName: Text({ text: 'longLastName' }),
    requiredField: Text({ text: 'requiredField' }),
    longFirstname: Text({ text: 'long.first.name' }),
    longPatronymic: Text({ text: 'long.patronymic' }),
    email: Text({ text: 'notValidEmail' }),
    phone: Text({ text: 'invalid.phone' }),
    shortCompanyName: Text({ text: 'shortCompanyName' }),
    inn: Text({ text: 'invalid.inn' }),
    shortInn: Text({ text: 'shortInn' }),
    longInn: Text({ text: 'longInn' }),
  };
  const initialValues = {
    lastname: user.last_name,
    firstname: user.first_name,
    patronymic: user.middle_name,
    phone: user.phone,
    email: user.email,
    receiveNewsletters: profile.receive_newsletter,
    inn: organization.inn,
    companyName: organization.organization,
    addresSite: links.site_link,
    vk: links.vk_link,
    instagram: links.insta_link,
    otherSocialLink: links.other_link,
  };

  const onSubmit = (data) => {
    setIsSaved(false);
    apiUser
      .putUser(user.id, putUserDataSerializer(data))
      .then((res) => {
        setIsSaved(true);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    setIsConcatReqFildsFromRole(checkRoleForAddFields(role));
  }, [role]);
  return (
    <Container>
      <GxModal
        onGx-after-hide={closeModal}
        open={resultChangeNumber}
        className={classNames({
          [styleModal['modal_creator']]: true,
          [styleModal['modal-success_error']]: true,
        })}
      >
        <ModalContentViews.ModalWrapper>
          <ModalContentViews.CloseBtn closeModal={closeModal} />
          <ModalContentViews.ContentBlock>
            <ModalContentViews.CenterPosition>
              <ModalContentViews.SuccessOrError
                closeModal={closeModal}
                success={successAddReview}
              />
            </ModalContentViews.CenterPosition>
          </ModalContentViews.ContentBlock>
        </ModalContentViews.ModalWrapper>
      </GxModal>
      <PersonalPageViews.WrapperForm>
        <PersonalPageViews.HeaderForm setModalStates={deleteAccount} />
        <Formik
          validationSchema={changeUserDataSchema(errorsMessenge, isConcatReqFildsFromRole)}
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, handleChange, values, errors, setFieldValue }) => {
            return (
              <GxForm noValidate onGx-submit={handleSubmit}>
                <PersonalPageViews.FormBlockContent>
                  {/* top Row */}
                  <PersonalPageViews.FormRow>
                    <PersonalPageViews.FormColl>
                      <PersonalPageViews.FormGroup>
                        <Input
                          value={values.lastname}
                          name={'lastname'}
                          autocomplete={'off'}
                          onGx-input={handleChange}
                          className={errors.lastname ? 'error' : ''}
                          helpText={
                            errors.lastname ? <ErrorField message={errors.lastname} /> : null
                          }
                          label={Text({ text: 'lastname' })}
                          placeholder={'Укажите фамилию'}
                        />
                      </PersonalPageViews.FormGroup>
                      <PersonalPageViews.FormGroup>
                        <Input
                          value={values.firstname}
                          name={'firstname'}
                          autocomplete={'off'}
                          onGx-input={handleChange}
                          className={errors.firstname ? 'error' : ''}
                          helpText={
                            errors.firstname ? <ErrorField message={errors.firstname} /> : null
                          }
                          label={Text({ text: 'firstname' })}
                          label={'Имя'}
                          placeholder={'Укажите имя'}
                        ></Input>
                      </PersonalPageViews.FormGroup>
                      <PersonalPageViews.FormGroup>
                        <Input
                          value={values.patronymic}
                          name={'patronymic'}
                          autocomplete={'off'}
                          onGx-input={handleChange}
                          className={errors.patronymic ? 'error' : ''}
                          helpText={
                            errors.patronymic ? <ErrorField message={errors.patronymic} /> : null
                          }
                          label={Text({ text: 'patronymic' })}
                          placeholder={'Укажите отчество'}
                        ></Input>
                      </PersonalPageViews.FormGroup>
                    </PersonalPageViews.FormColl>
                    <PersonalPageViews.FormColl>
                      <PersonalPageViews.FormGroup>
                        <Input
                          value={values.phone}
                          name={'phone'}
                          disabled
                          readonly
                          label={'Номер телефона'}
                          placeholder={'+7 (   )  '}
                        >
                          <Button
                            onClick={changePhone}
                            variant={'cabinet-linkblue'}
                            slot={'suffix'}
                          >
                            Сменить номер
                          </Button>
                        </Input>
                      </PersonalPageViews.FormGroup>
                      <PersonalPageViews.FormGroup>
                        <Input
                          value={values.email}
                          name={'email'}
                          autocomplete={'off'}
                          onGx-input={handleChange}
                          className={errors.email ? 'error' : ''}
                          helpText={errors.email ? <ErrorField message={errors.email} /> : null}
                          label={'Email'}
                          placeholder={'Укажите email'}
                        ></Input>
                        <PersonalPageViews.FormAlignRight>
                          <CheckBox
                            checked={values.receiveNewsletters}
                            name={'receiveNewsletters'}    
                            onGx-change={(e) => {
                              setFieldValue('receiveNewsletters', Boolean(e.target.checked));
                              onChange(e.target.checked)
                            }}
                            label={Text({ text: 'receiveNewsletters' })}
                          ></CheckBox>
                        </PersonalPageViews.FormAlignRight>
                      </PersonalPageViews.FormGroup>
                    </PersonalPageViews.FormColl>
                  </PersonalPageViews.FormRow>
                  {/* END top Row */}

                  {/* bottom Row */}
                  {isConcatReqFildsFromRole ? (
                    <PersonalPageViews.FormRow>
                      <PersonalPageViews.FormColl>
                        <PersonalPageViews.FormGroup>
                          <Input
                            value={values.inn}
                            name={'inn'}
                            autocomplete={'off'}
                            onGx-input={handleChange}
                            className={errors.inn ? 'error' : ''}
                            helpText={errors.inn ? <ErrorField message={errors.inn} /> : null}
                            label={'ИНН'}
                            placeholder={'Укажите ИНН'}
                          ></Input>
                        </PersonalPageViews.FormGroup>
                        <PersonalPageViews.FormGroup>
                          <Input
                            value={values.companyName}
                            name={'companyName'}
                            autocomplete={'off'}
                            onGx-input={handleChange}
                            className={errors.companyName ? 'error' : ''}
                            helpText={
                              errors.companyName ? (
                                <ErrorField message={errors.companyName} />
                              ) : null
                            }
                            label={'Название организации'}
                            placeholder={'ООО ИП и тд'}
                          ></Input>
                        </PersonalPageViews.FormGroup>
                        <PersonalPageViews.FormGroup>
                          <Input
                            value={values.addresSite}
                            name={'addresSite'}
                            autocomplete={'off'}
                            onGx-input={handleChange}
                            className={errors.addresSite ? 'error' : ''}
                            helpText={
                              errors.addresSite ? <ErrorField message={errors.addresSite} /> : null
                            }
                            label={'Адрес вебсайта'}
                            placeholder={'Ссылка на сайт'}
                          ></Input>
                        </PersonalPageViews.FormGroup>
                      </PersonalPageViews.FormColl>

                      <PersonalPageViews.FormColl>
                        <PersonalPageViews.FormGroup>
                          <Input
                            value={values.vk}
                            name={'vk'}
                            autocomplete={'off'}
                            onGx-input={handleChange}
                            className={errors.vk ? 'error' : ''}
                            helpText={errors.vk ? <ErrorField message={errors.vk} /> : null}
                            label={'VK *'}
                            placeholder={'Ссылка на профиль '}
                          >
                            <GxIcon src={vkIcon} alt="" slot={'suffix'} />
                          </Input>
                        </PersonalPageViews.FormGroup>
                        <PersonalPageViews.FormGroup>
                          <Input
                            value={values.instagram}
                            name={'instagram'}
                            autocomplete={'off'}
                            onGx-input={handleChange}
                            className={errors.instagram ? 'error' : ''}
                            helpText={
                              errors.instagram ? <ErrorField message={errors.instagram} /> : null
                            }
                            label={'Instagram *'}
                            placeholder={'Ссылка на профиль '}
                          >
                            <GxIcon src={igIcon} alt="" slot={'suffix'} />
                          </Input>
                        </PersonalPageViews.FormGroup>
                        <PersonalPageViews.FormGroup>
                          <Input
                            value={values.otherSocialLink}
                            name={'otherSocialLink'}
                            autocomplete={'off'}
                            onGx-input={handleChange}
                            className={errors.otherSocialLink ? 'error' : ''}
                            helpText={
                              errors.otherSocialLink ? (
                                <ErrorField message={errors.otherSocialLink} />
                              ) : null
                            }
                            label={'Другая соц. сеть *'}
                            placeholder={'Ссылка на профиль '}
                          >
                            {/* <GxIcon src={fbIcon} alt="" slot={'suffix'} /> */}
                          </Input>
                        </PersonalPageViews.FormGroup>
                      </PersonalPageViews.FormColl>
                    </PersonalPageViews.FormRow>
                  ) : null}
                  {role === ROLE.DROPSHIPPER ? (
                    <PersonalPageViews.FormRow>
                      <PersonalPageViews.FormColl>
                        <PersonalPageViews.FormGroup>
                          <Input
                            value={values.vk}
                            name={'vk'}
                            autocomplete={'off'}
                            onGx-input={handleChange}
                            className={errors.vk ? 'error' : ''}
                            helpText={errors.vk ? <ErrorField message={errors.vk} /> : null}
                            label={'VK *'}
                            placeholder={'Ссылка на профиль '}
                          >
                            <GxIcon src={vkIcon} alt="" slot={'suffix'} />
                          </Input>
                        </PersonalPageViews.FormGroup>
                        <PersonalPageViews.FormGroup>
                          <Input
                            value={values.instagram}
                            name={'instagram'}
                            autocomplete={'off'}
                            onGx-input={handleChange}
                            className={errors.instagram ? 'error' : ''}
                            helpText={
                              errors.instagram ? <ErrorField message={errors.instagram} /> : null
                            }
                            label={'Instagram *'}
                            placeholder={'Ссылка на профиль '}
                          >
                            <GxIcon src={igIcon} alt="" slot={'suffix'} />
                          </Input>
                        </PersonalPageViews.FormGroup>
                        <PersonalPageViews.FormGroup>
                          <Input
                            value={values.otherSocialLink}
                            name={'otherSocialLink'}
                            autocomplete={'off'}
                            onGx-input={handleChange}
                            className={errors.otherSocialLink ? 'error' : ''}
                            helpText={
                              errors.otherSocialLink ? (
                                <ErrorField message={errors.otherSocialLink} />
                              ) : null
                            }
                            label={'Другая соц. сеть *'}
                            placeholder={'Ссылка на профиль '}
                          >
                            {/* <GxIcon src={fbIcon} alt="" slot={'suffix'} /> */}
                          </Input>
                        </PersonalPageViews.FormGroup>
                      </PersonalPageViews.FormColl>
                    </PersonalPageViews.FormRow>
                  ) : null}
                  {/* END bottom Row */}
                  <PersonalPageViews.FormBottom onClickChangePassword={changePassword}>
                    <Button type={'submit'} variant={'cabinet_default'}>
                      <Text text={'save'} />
                      {!isSaved ? <GxSpinner slot="icon-right" className="spiner" /> : null}
                    </Button>
                  </PersonalPageViews.FormBottom>
                </PersonalPageViews.FormBlockContent>
              </GxForm>
            );
          }}
        </Formik>
      </PersonalPageViews.WrapperForm>
    </Container>
  );
};

export default React.memo(ContentEntryPersonalPage);
