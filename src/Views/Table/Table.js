import React from 'react';
import { GxSpinner } from '@garpix/garpix-web-components-react';
import { v4 } from 'uuid';
import style from './styles/table.module.scss';

const Table = ({ classNameTable, tableHeaderData, tableBodyData, statusLoad}) => {

  return (
    <table className={style[classNameTable]}>
      <thead> 
        {tableHeaderData.map((trElData, i) => {
          return (
            <tr key={v4()}>
              {trElData.map((th, thI) => {
                return (
                  <th key={thI} {...th?.attr}>
                    {th?.content}

                  </th>
                );
              })}

            </tr>
          );
        })}
      </thead>
      <tbody>
        {statusLoad === 'loading' ? (
          <tr>
            <td colSpan={5}>
              <GxSpinner className="spiner" />
            </td>
          </tr>
        ) : null}
        {tableBodyData.map((trElData, i) => {
          return (
            <tr key={v4()}>
              {trElData.map((td, tdI) => {
                 
                return (
                  <td key={tdI} {...td?.attr}>
                    {td?.content}
                  </td>   
                );
              })}
      
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default React.memo(Table);
