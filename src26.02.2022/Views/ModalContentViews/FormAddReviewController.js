import React from 'react';
import CheckBox from '../../Views/CheckBox';
import { GxButton } from '@garpix/garpix-web-components-react';
import Text from '../../components/Text';
import style from './styles/index.module.scss';

const FormAddReviewController = ({ values, setFieldValue, canselationCallback }) => {

  
  return (
    <div className={style['productreviews__form-submit-wrap']}>
      <CheckBox
        checked={values.iAgreeDataProcessing ? 'true' : 'false'}
        onClick={(e) => {
          const value = e.target.checked;
          setFieldValue('iAgreeDataProcessing', !value);
        }}
        variant="input"
        label={Text({ text: 'iAgreeDataProcessing' })}
        data-cy={`CheckBoxReview`}
      />
      <div className={style['productreviews__form-submit-btnwrap']}>
        <GxButton 
          data-cy={`send_review`} 
          type="submit" 
          className={style['productreviews__form-submit-btndark']}
          onClick={(e)=>{
            e.preventDefault();
          }}
        >
          <Text text={'send'} />
        </GxButton>
        <GxButton
          onClick={(e)=>{
            e.preventDefault();
            canselationCallback
          }}
          className={style['productreviews__form-submit-btn']} data-cy={`cancel_form_review`}
        >
          <Text text={'cancellation'} />
        </GxButton>
      </div>
    </div>
  );
};

export default React.memo(FormAddReviewController);
