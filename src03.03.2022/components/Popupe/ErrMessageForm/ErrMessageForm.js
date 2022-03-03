import React from "react";
import style from './errMessageForm.module.scss';

const ErrMessageForm = ({ setErrClickSend, setHistory}) => {

    return(
        <div className={style["message-err__wraper"]}>
            <div className={style["message-err__container"]}>
                <div className={style["message-err__title"]}>Внимание!</div>
                <div className={style["message-err__content"]}>
                    <p className={style["message-err__text"]}>Вы не приложили копию чека об оплате. 
                    Необходимо вернуться к форме оплаты и приложить чек. 
                    Также, Вы можете оплатить заказ позже, 
                    через свой личный кабинет</p>
                    <div className={style["message-err__manage"]}>
                        <div
                            onClick={() => setHistory('/balance')} 
                            className={style["message-err__aplly"]}
                        >
                                ОПЛАТИТЬ ПОЗЖЕ
                        </div>
                        <div 
                            onClick={() => setErrClickSend(false)}
                            className={style["message-err__cancell"]}
                        >
                            ПРИЛОЖИТЬ ЧЕК
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default ErrMessageForm;