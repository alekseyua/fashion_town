import React from 'react';
import TableContent from './TableContent';

const Balance = ({ balance1, balance2 }) => {
    return (
        <TableContent.TableHeader nameOfStyle='clients-table__balance_wrapper'>
            <TableContent.TableHeader nameOfStyle='clients-table__balance_left'>{balance1}</TableContent.TableHeader>
            <TableContent.TableHeader nameOfStyle='clients-table__balance_right'>{balance2}</TableContent.TableHeader>
        </TableContent.TableHeader>
    )
}

export default React.memo(Balance);