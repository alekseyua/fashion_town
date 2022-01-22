import React from 'react';
import { GxIcon, GxButton } from '@garpix/garpix-web-components-react';
import { garbageIcon } from '../../images';
import CheckBox from '../../Views/CheckBox';
import style from './styles/index.module.scss';

const Header = ({}) => {
  return (
    <div className={style["cabinet_notifications__head"]}>
      <CheckBox variant="input" label={'Выделить все'} />
      <GxButton variant="text" size="med" className={style["cabinet_notifications__mark"]}>
        Пометить как прочитанные
      </GxButton>
      <GxButton variant="text" size="med" className={style["cabinet_notifications__delete"]}>
        <GxIcon slot="icon-left" src={garbageIcon}></GxIcon>
        Удалить
      </GxButton>
    </div>
  );
};

export default React.memo(Header);
