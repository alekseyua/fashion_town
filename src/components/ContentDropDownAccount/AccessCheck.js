import React from 'react';
import LayoutDropDownMenuAccount from '../../Views/LayoutDropDownMenuAccount';
import DefaultAuthText from '../../Views/DefaultAuthText';
import DropDownHeaderLK from '../../Views/DropDownHeaderLK';
import Text from '../Text';
import Button from '../../Views/Button';

const AccessCheck = ({ first_name = 'first_name', last_name = 'last_name', logOut, page_type_auth }) => {
  return (
    <LayoutDropDownMenuAccount>
      <DropDownHeaderLK.PersonalInfo
        first_name={first_name}
        last_name={last_name}
        role={Text({ text: 'retailBuyer' })}
      />
      <DropDownHeaderLK.Line /> 
      <DefaultAuthText.HelpText>
        Администратор проверяет введенные вами данные. Дождитесь обновления статуса проверки
      </DefaultAuthText.HelpText>
      <Button full variant={'gray_full_width'} to={page_type_auth}>
        <DefaultAuthText.Spinner slot={'icon-left'} />
        Проверка доступа
      </Button>
      <DropDownHeaderLK.Logout onClick={logOut} />
    </LayoutDropDownMenuAccount>
  );
};
export default React.memo(AccessCheck);
