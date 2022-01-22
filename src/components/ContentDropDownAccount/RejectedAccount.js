import React from 'react';
import {rejectedIcon } from '../../images'
import LayoutDropDownMenuAccount from '../../Views/LayoutDropDownMenuAccount';
import DefaultAuthText from '../../Views/DefaultAuthText';
import DropDownHeaderLK from '../../Views/DropDownHeaderLK';
import Text from '../Text';
import Button from '../../Views/Button';

const RejectedAccount = ({
  logOut,
  first_name = 'first_name',
  last_name = 'last_name',
  page_type_auth,
}) => {
  return (
    <LayoutDropDownMenuAccount>
      <DropDownHeaderLK.PersonalInfo
        first_name={first_name}
        last_name={last_name}
        role={Text({ text: 'retailBuyer' })}
      />
      <DropDownHeaderLK.Line />
      <DefaultAuthText.HelpText>Ошибка доступа</DefaultAuthText.HelpText>
      <Button full variant={'gray_full_width'} to={page_type_auth}>
        <DropDownHeaderLK.Icon src={rejectedIcon} slot={'icon-left'} />
        Не подтвержден
      </Button>
      <DropDownHeaderLK.Logout onClick={logOut} />
    </LayoutDropDownMenuAccount>
  );
};

export default React.memo(RejectedAccount);
