import React from 'react';
import CooperationLayout from '../../Views/CooperationLayout';

const Cooperation = (props) => {
  const { partner_banners } = props;
  return <CooperationLayout partner_banners={partner_banners} />;
};

export default React.memo(Cooperation);
