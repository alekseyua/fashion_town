import React from 'react';
import LayoutDropDownMenuAccount from '../../Views/LayoutDropDownMenuAccount';
import DropDownHeaderLK from '../../Views/DropDownHeaderLK';
import Text from '../Text';

const Wholesale = ({
  first_name = 'first_name',
  last_name = 'last_name',
  cabinet_menu,
  shop,
  logOut,
}) => {
  return (
    <LayoutDropDownMenuAccount>
      <DropDownHeaderLK.PersonalInfo
        first_name={first_name}
        last_name={last_name}
        role={Text({ text: 'wholesaleBuyer' })}
      />
      <DropDownHeaderLK.Line />
      <DropDownHeaderLK.Menu cabinet_menu={cabinet_menu} />
      {shop.is_has_shop ? (
        <DropDownHeaderLK.MarketInfo
          is_has_shop={shop.is_has_shop}
          shop_id={shop.shop_id}
          to={"/moj-magazin"}
          image={shop.shop_logo}
          title={shop.shop_title}
        />
      ) : null}
      <DropDownHeaderLK.Line />
      <DropDownHeaderLK.Logout onClick={logOut} />
    </LayoutDropDownMenuAccount>
  );
};

export default React.memo(Wholesale);
