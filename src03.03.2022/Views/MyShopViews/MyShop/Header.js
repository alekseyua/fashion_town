import React from 'react';
import style from '../index.module.scss'

const Header=({name})=>{
    return (
        <div className={style['cabinet_myshop__section_head']}>{name}</div>
)
}

export default React.memo(Header);