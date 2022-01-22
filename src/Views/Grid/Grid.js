import { GxGrid, GxRow, GxCol, GxButton, GxForm } from '@garpix/garpix-web-components-react';
import classNames from 'classnames';
import style from './grid.module.scss';

const Grid = ({ className, children }) => {
  return (
    <GxGrid
      className={classNames({
        [className]: !!className,
        [style['wrapper']]: true,
      })}
    >
      {children}
    </GxGrid>
  );
};

export default React.memo(Grid);
