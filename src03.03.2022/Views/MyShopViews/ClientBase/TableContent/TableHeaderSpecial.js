import React from 'react';
import style from '../../../../Views/Table/styles/table.module.scss'

const TableHeaderSpecial = ({children, nameOfStyle}) => {
    return (
        <span className={style[nameOfStyle]}>{children}</span>
    )
}

export default React.memo(TableHeaderSpecial);