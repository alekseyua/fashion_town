import React from 'react'
import style from './paymentMethods.module.scss'
import { GxIcon } from '@garpix/garpix-web-components-react';
import { v4 } from 'uuid';

const PaymentMethods = (props) => {
    const { payment_methods } = props;
    return(
        <div className={style['payment-methods']}>
            <ul className={style['payment-methods__list']}>
                { payment_methods.map((el, key) => {
                    return <li key={v4()} className={style['payment-methods__list-item']}>
                        <GxIcon className={style['payment-methods__list-item-icon']} src={el.icon} alt=''/>
                    </li>
                })}
                
            </ul>
        </div>
    )
}

export default React.memo(PaymentMethods);