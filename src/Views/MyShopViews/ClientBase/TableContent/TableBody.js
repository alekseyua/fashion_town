import React from 'react';
import style from '../../index.module.scss'
import TableComponent from '../../../Table';

const TableBody = ({ tableHeaderData, tableBodyData }) => {
    return (
        <div className={style['cabinet-clients__table_wrapper']}>
            <TableComponent
                classNameTable='clients-table'
                tableHeaderData={tableHeaderData}
                tableBodyData={tableBodyData}
            />
        </div>
    )
}

export default React.memo(TableBody);