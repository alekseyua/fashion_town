import React from 'react'
import style from './styles/index.module.scss'

const PaginationContainer = ({children }) => {
    return <div className={style.paginations_wrapper}>{children}</div>
}

export default React.memo(PaginationContainer);