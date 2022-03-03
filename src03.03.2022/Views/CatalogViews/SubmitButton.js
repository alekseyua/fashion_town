import React from 'react';
import Text from '../../components/Text';
import classNames from 'classnames';
import style from './styles/index.module.scss';

const SubmitButton = ({ offsetTop = 0, isShowBtnSubmit, onClick, floatRigth = false }) => {
  if (!isShowBtnSubmit) return null;
  return (
    <div
      onClick={onClick}
      className={classNames({
        [style['catfilter-showme']]: true,
        [style['catfilter-showme-rigth']]: floatRigth
      })}
      style={{ top: `${offsetTop}px` }}
      data-cy={`catfilter-showme`}
    >
      <span className={style['catfilter-showme__label']}>
        <Text text={'apply'} />
      </span>
    </div>
  );
};

export default React.memo(SubmitButton);
