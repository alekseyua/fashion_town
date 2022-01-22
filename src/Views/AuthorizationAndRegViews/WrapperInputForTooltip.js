import React from 'react';
import style from './styles/toolTip.module.scss';
import TooltipInInput from './TooltipInInput'

const WrapperInputForTooltip = ({ children, content = "", trigger = "click" }) => {
  return (
    <div className={style["wrapper"]}>
      {children}
      <TooltipInInput
        trigger={trigger}
        content={content}
      >
          <span className={style["wrapper__trigger"]}></span>
      </TooltipInInput>
    </div>
  );
};
export default React.memo(WrapperInputForTooltip);
