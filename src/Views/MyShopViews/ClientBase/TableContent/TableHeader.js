import React from 'react';
import style from '../../../../Views/Table/styles/table.module.scss';

const TableHeader = ({ children, nameOfStyle = '', name = null }) => {
  return (
    <div className={style[nameOfStyle]}>
      <>
        {name !== null ? (
          <>
            {name}
            <br />
          </>
        ) : null}
        {children}
      </>
    </div>
  );
};

export default React.memo(TableHeader);
