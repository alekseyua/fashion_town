import React from 'react';
import style from '../index.module.scss'

const Wrapper = ({ children, bottom = false }) => {
    let st = 'cabinet_myshop__section_wrapper';
    if (bottom)
        st = 'cabinet_myshop__section_btn_wrapper';
    return (
        <div className={style[st]}>{children}</div>
    )
}

export default React.memo(Wrapper);