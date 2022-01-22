import React from 'react';
import { GxTooltip } from '@garpix/garpix-web-components-react';
import Text from '../../../components/Text';
import { warningIcon } from '../../../images';
import Button from '../../Button';
import style from '../styles/wrapper.module.scss';

const HeaderForm = ({ setModalStates, title = Text({ text: 'delete.account' }) }) => {
  return (
    <div className={style['cabinet-formblock__top']}>
      <div className={style['cabinet-formblock__heading']}>
        <Text text={'personal.data'} />
      </div>
      <Button
        onClick={setModalStates}
        variant={'cabinet-delaccount'}
        className={style['cabinet-delaccount']}
        data-cy={'Button_cabinet_delaccount'}
      >
        <span className={style['cabinet-delaccount__text']}>
          {title}
        </span>
        {/* <GxTooltip
          placement="bottom"
          slot={'icon-right'}
          className={style['tooltip']}
          content={
            'Вместе с аккаунтом мы удалим из системы вашу личную информацию, историю заказов и покупок.'
          }
        > */}
        <img
          slot={'icon-right'}
          className={style['cabinet-delaccount__icon']}
          src={warningIcon}
          alt="warning"
        />
        {/* </GxTooltip> */}
      </Button>
    </div>
  );
};
export default React.memo(HeaderForm);
