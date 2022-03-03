import React from 'react';
import { GxIcon } from '@garpix/garpix-web-components-react';
import { leftArrowIcon } from '../../images';
import Text from '../../components/Text';
import Button from '../Button';
import style from './styles/stepsBreadcrumbs.module.scss';

const StepsBreadcrumbs = ({ step = 0, allSteps = 1, setPrevStep }) => {
  return (
    <div className={style['wrapper']}>
      <Button onClick={setPrevStep} variant={'backForm'} className={style['wrapper__steps-btn']}>
        <GxIcon className={style['wrapper__steps-icon']} src={leftArrowIcon} slot={'icon-left'} />
        <Text text={'backTo'} />
      </Button>
      <span className={style['wrapper__steps-text']}>
        <Text text={'step'} />
        &nbsp; 0{step}/0{allSteps}
      </span>
    </div>
  );
};

export default React.memo(StepsBreadcrumbs);
