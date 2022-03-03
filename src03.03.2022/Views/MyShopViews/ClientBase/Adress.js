import React from 'react';
import TableContent from './TableContent';

const Adress = ({adress}) => {
    return (
        <TableContent.TableHeaderSpecial nameOfStyle='clients-table-gray'>{adress}</TableContent.TableHeaderSpecial>
    )
}

export default React.memo(Adress);