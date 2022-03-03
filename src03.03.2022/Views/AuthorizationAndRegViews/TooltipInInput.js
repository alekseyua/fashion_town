import React from 'react';
import { GxTooltip } from '@garpix/garpix-web-components-react';
import style from './styles/toolTip.module.scss';

const TooltipInInput = ({ children, content, ...props }) => {
  return (
    <GxTooltip {...props} className={style['tooltip']} content={content}>
      {children}
    </GxTooltip>
  );
};
export default React.memo(TooltipInInput);
