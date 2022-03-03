import React, { useState } from "react";
import style from './infoBalance.module.scss';
import classNames from "classnames";

const InfoBalance = (props) => {

    const {
        now_balance,
        total_price,
        currenssies,
    } = props;
    
    const valueBalance = () => {
        if ( (now_balance - total_price) > 0 ){
            return true;
        }
        return false;
    }
    const [ stateBalance, setStateBalance ] = useState(valueBalance());
    const styleBalancePosetive = classNames({
        [style['balance__now']] : true,
        [style['balance__now--red']] : !stateBalance,
    })
    
return (
        <>
            <div 
                className={styleBalancePosetive}
        >Ваш текущий баланс <span>{now_balance}&nbsp;<span>{currenssies}</span></span></div>
            <div 
                className={style['balance__all-price']}
        >Необходимо пополнить баланс для оплаты заказов <span>{total_price}&nbsp;<span>{currenssies}</span></span></div>
            {/* <div>минимальная сумма для пополнения <span>{(total_price - now_balance).toFixed(2)}</span>{currenssies}</div> */}

        </>
    )
}


export default React.memo(InfoBalance);