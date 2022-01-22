import React from 'react';
import LayoutDropDownMenuAccount from '../../Views/LayoutDropDownMenuAccount';
import DropDownHeaderLK from '../../Views/DropDownHeaderLK';
import Text from '../Text';

const Retailer = ({
  first_name = 'first_name',
  last_name = 'last_name',
  cabinet_menu,
  logOut,
}) => {
  return (
    <LayoutDropDownMenuAccount>
      <DropDownHeaderLK.PersonalInfo
        first_name={first_name}
        last_name={last_name}
        role={Text({ text: 'retailBuyer' })}
      />
      <DropDownHeaderLK.Line />
      <DropDownHeaderLK.Menu cabinet_menu={cabinet_menu} />
      {/* <DropDownHeaderLK.MarketInfo /> */}
      <DropDownHeaderLK.Line />
      <DropDownHeaderLK.Logout onClick={logOut} />
    </LayoutDropDownMenuAccount>
  );
};

export default React.memo(Retailer);
