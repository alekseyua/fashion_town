import React from 'react';
import style from '../index.module.scss'

const InfoBlock=({children})=>{
    return (
        <div className={style['cabinet_myshop__section_infoblock']}>{children}</div>
)
}

export default React.memo(InfoBlock);