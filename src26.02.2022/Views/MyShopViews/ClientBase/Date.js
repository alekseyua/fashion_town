import React from 'react';
import TableContent from './TableContent';

const Date = ({ date1, date2 }) => {
    return (
        <TableContent.TableHeader>
            <TableContent.TableHeaderSpecial nameOfStyle='clients-table-gray'>{date1} /</TableContent.TableHeaderSpecial> {date2}
        </TableContent.TableHeader>
    )
}

export default React.memo(Date);