import React from 'react';
import HeaderOfPage from './HeaderOfPage';
import FilterAndSearch from './FilterAndSearch';
import AllProduct from '../AllProduct';

const AboveTable = ({ header, infoText=false,...props }) => {
  return (
    <>
      <HeaderOfPage header={header} />
      {infoText ? <AllProduct.InfoText infoText={infoText}/> : null}
      <FilterAndSearch {...props}/>
    </>
  );
};

export default React.memo(AboveTable);
