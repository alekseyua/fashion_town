import React from 'react';
import { GxIcon } from '@garpix/garpix-web-components-react';
import { toolTipIcon } from '../../images';
import classNames from 'classnames';
import style from './styles/index.module.scss';

const WarningBlock = ({ children, variant, wrapVariant }) => {

//console.log('ModalContentViews -> WarningBlock--!!!!  ')
  
  return (
    <div
      className={classNames({
        [style['warning_wrapper']]: true,
        [style[`warning_wrapper-${wrapVariant}`]]: wrapVariant,
      })}
    >
      <div className={style['warning_wrapper__grid']}>
        <GxIcon src={toolTipIcon} alt={'toolTipIcon'} />
        <div
          className={classNames({
            [style['warning_wrapper__grid-text']]: true,
            [style[variant]]: variant,
          })}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default React.memo(WarningBlock);
