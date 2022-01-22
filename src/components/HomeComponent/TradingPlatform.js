import React from 'react';
import TradingPlatformLayout from '../../Views/TradingPlatformLayout';

const TradingPlatform = ({ first_screen = {}, page_type_catalog }) => {
  return <TradingPlatformLayout 
          first_screen={first_screen} 
          page_type_catalog={page_type_catalog} 
        />;
};

export default React.memo(TradingPlatform);
