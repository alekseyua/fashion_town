import React from 'react';
import TableContent from './TableContent';

const FIO = ({ fio, to = '#' }) => {
  return (
    <a href={to}>
      <TableContent.TableHeaderSpecial nameOfStyle="clients-table-name">
        {fio}
      </TableContent.TableHeaderSpecial>
    </a>
  );
};

export default React.memo(FIO);
