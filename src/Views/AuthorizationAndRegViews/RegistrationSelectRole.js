import React from 'react';
import { GxIcon } from '@garpix/garpix-web-components-react';
import { ROLE } from '../../const';
import { retailtRegIcon, dropshipperRegIcon, wholesaleRegIcon, arrowRight } from '../../images';
import Text from '../../components/Text';
import Button from '../Button';
import style from './styles/registrationSelectRole.module.scss';
import { NavLink } from 'react-router-dom';

const HelpText = () => {
  //todo: определится с тем откуда это будет забиватся(по уму бы из контекста)
  return (
    <span>
      Заказ от 1 ед., скидка на сбор рядов <br />
      отсутствует и тд тп.
    </span>
  );
};

const RegistrationSelectRole = ({ setState, state }) => {
  const setRoleDec = (role) => {
    const newStep = (state.step += 1);
    setState({
      ...state,
      role: role,
      step: newStep,
    });
  };
  return (
    <div className={style['wrapper']}>
      <Button
        onClick={() => setRoleDec(ROLE.RETAIL)}
        full
        className={style['wrapper__btn']}
        variant={'changeRole'}
        data-cy={'role_retail_buyer'}
      >
        <div className={style['wrapper__btn__icon-left']} slot={'icon-left'}>
          <GxIcon className={style['wrapper__btn__icon-left__icon']} src={retailtRegIcon} />
        </div>
        <div className={style['wrapper__btn__group-label']}>
          <span className={style['wrapper__btn__label']}>
            <Text text={'retailBuyer'} />
          </span>
          <span className={style['wrapper__btn__help-text']}>
            {/* <HelpText /> */}
            <Text text={'retailBuyer_HelpText'} />
          </span>
        </div>
        <GxIcon
          className={style['wrapper__btn__icon-right']}
          src={arrowRight}
          slot={'icon-right'}
        />
      </Button>
      <Button
        onClick={() => setRoleDec(ROLE.WHOLESALE)}
        full
        className={style['wrapper__btn']}
        variant={'changeRole'}
        data-cy={'role_wholesale_buyer'}
      >
        <div className={style['wrapper__btn__icon-left']} slot={'icon-left'}>
          <GxIcon className={style['wrapper__btn__icon-left__icon']} src={wholesaleRegIcon} />
        </div>
        <div className={style['wrapper__btn__group-label']}>
          <span className={style['wrapper__btn__label']}>
            <Text text={'wholesaleBuyer'} />
          </span>
          <span className={style['wrapper__btn__help-text']}>
            {/* <HelpText /> */}
            <Text text={'wholesaleBuyer_HelpText'} />
          </span>
        </div>
        <GxIcon
          className={style['wrapper__btn__icon-right']}
          src={arrowRight}
          slot={'icon-right'}
        />
      </Button>
      <Button
        onClick={() => setRoleDec(ROLE.DROPSHIPPER)}
        full
        className={style['wrapper__btn']}
        variant={'changeRole'}
        data-cy={'role_dropshipper'}
      >
        <div className={style['wrapper__btn__icon-left']} slot={'icon-left'}>
          <GxIcon className={style['wrapper__btn__icon-left__icon']} src={dropshipperRegIcon} />
        </div>
        <div className={style['wrapper__btn__group-label']}>
          <span className={style['wrapper__btn__label']}>
            <Text text={'dropshipper'} />
          </span>
          <span className={style['wrapper__btn__help-text']}>
            {/* <HelpText /> */}
            <Text text={'dropshipper_HelpText'} />
          </span>
        </div>
        <GxIcon
          className={style['wrapper__btn__icon-right']}
          src={arrowRight}
          slot={'icon-right'}
        />
      </Button>
    </div>
  );
};

export default React.memo(RegistrationSelectRole);
