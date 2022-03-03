import React from 'react';
import Header from './Header';
import DropDown from './DropDown';
import TopBlock from './TopBlock';
import ActivatedPromoCode from './ActivatedPromoCode';
import Block from './Block';
import RowBlock from './RowBlock';
import AddPromoCode from './AddPromoCode';
import style from '../index.module.scss';

const MainBlock = ({ children }) => {
    return (
        <div className={style['cabinet-formblock__content']}>{children}</div>
    )
}

export default{
    Header,
    MainBlock,
    DropDown,
    TopBlock,
    ActivatedPromoCode,
    Block,
    RowBlock,
    AddPromoCode
}