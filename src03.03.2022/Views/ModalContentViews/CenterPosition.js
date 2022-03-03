import React from 'react'
import style from './styles/index.module.scss'


const CenterPosition = ({children}) => {

    return <div className={style["modal-block_wrapper-center"]}>{children}</div>
}

export default React.memo(CenterPosition);