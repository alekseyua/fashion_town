import React, { useState } from 'react';
import { GxIcon, GxButton } from '@garpix/garpix-web-components-react';
import { garbageIcon } from '../../images';
import CheckBox from '../../Views/CheckBox';
import style from './styles/index.module.scss';

const Header = ({ heandlerReed, heandlerDel, checkAllBox, checkEnable}) => {
  const [select, setSelect] = useState(false)
  return (
    <div className={style["cabinet_notifications__head"]}>
      <CheckBox 
        onGx-change={(e) => { 
          setSelect(!select)
          checkAllBox(e) }}
        variant="input"
        label={'Выделить все'}
        checked={checkEnable}
      />
      <GxButton
        onClick={heandlerReed}
        variant="text"
        size="med"
        className={style["cabinet_notifications__mark"]}
      >
        Пометить как прочитанные
      </GxButton>
      <GxButton
        onClick={heandlerDel}
        variant="text"
        size="med"
        className={style["cabinet_notifications__delete"]}
      >
        <GxIcon slot="icon-left" src={garbageIcon}></GxIcon>
        Удалить
      </GxButton>
    </div>
  );
};

export default React.memo(Header);
