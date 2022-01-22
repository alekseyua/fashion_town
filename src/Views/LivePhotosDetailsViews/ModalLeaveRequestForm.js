import Button from '../Button';
import CheckBox from '../CheckBox';
import Input from '../Input';

import TextArea from '../TextArea';
import ModalLeaveRequestUploadImage from './ModalLeaveRequestUploadImage';
import style from './styles/index.module.scss';

const ModalLeaveRequestForm = ({ onCancel, values, setFieldValue }) => {

  return (
    <div className={style['leave-request-form']}>
      <div className={style['leave-request-form__inputs']}>
        <Input
          label={'Никнейм или email'}
          required
          placeholder={'Введите имя'}
          variant={'largeCustomLabel'}
          value={values.email}
          name={"email"}
          onGx-change={(e) => {
            setFieldValue('email', e.target.value);
          }}
        />
        <TextArea
          placeholder={'Комментарий...'}
          resize={'auto'}
          maxlength={250}
          rows={6}
          value={values.comment}
          name={'comment'}
          onGx-change={(e) => {
            setFieldValue('comment', e.target.value);
          }}
        />
        {/* <ModalLeaveRequestUploadImage setFieldValue={setFieldValue} /> */}
      </div>
      <div className={style['leave-request-form__submit']}>
        <CheckBox
          variant={'anotherLight'}
          label={'Соглашаюсь на обработку данных'}
          checked={values.isAgreeDataProcessing}
          onGx-change={(e) => {
            if (e.target.checked === null) return;
            setFieldValue('isAgreeDataProcessing', e.target.checked);
          }}
        />
        <div className={style['leave-request-form__btns']}>
          <Button variant={'cabinet_default'} type="submit">
            отправить
          </Button>
          <Button variant={'cabinet_default_border'} onClick={onCancel}>
            отмена
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ModalLeaveRequestForm);
