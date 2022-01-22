import React from 'react';
import LayoutDropDownMenuAccount from '../../Views/LayoutDropDownMenuAccount';
import DefaultAuthText from '../../Views/DefaultAuthText';
import CustomStylelink from '../../Views/CustomStylelink';
import Text from '../Text';

const Unregistred = ({ page_type_auth, page_type_reg }) => {
  return (
    <LayoutDropDownMenuAccount>
      <DefaultAuthText.HelpText>
        <Text text={'signInToShop'} />
      </DefaultAuthText.HelpText>
      <CustomStylelink variant={'black_full_width'} to={page_type_auth}>
        <Text text={'signIn'} />
      </CustomStylelink>
      <DefaultAuthText.RegistrLink to={page_type_reg} />
    </LayoutDropDownMenuAccount>
  );
};

export default React.memo(Unregistred);
