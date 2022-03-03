import React from 'react';
import { Link } from 'react-router-dom';
import TableContent from './TableContent';

const FIO = ({ fio, to = '#' }) => {
  return (
    <Link to={to}>
      <TableContent.TableHeaderSpecial nameOfStyle="clients-table-name">
        {fio}
      </TableContent.TableHeaderSpecial>
    </Link>
  );
};

export default React.memo(FIO);
