import React from 'react';
import Text from '../Text';
import CatalogViews from '../../Views/CatalogViews';

const EnabledFiltersOptions = ({
  enabledFilterData,
  defaultFilterData,
  translateKey,
  resetContextFilter,
  keyFilter,
}) => {
  const checkIsOptionalsFilter = (keyCheck, options) => {
    for (let i = 0; i < options.length; i++) {
      const element = options[i];
      if (element?.type === keyCheck) {
        return element;
      }
    }
    return false;
  };
  
  const getTag = (enabledFilterData, defaultFilterData, type) => {

    const render = [];
    for (const key in enabledFilterData) {
      const element = enabledFilterData[key];
      const isOptionalFilter = checkIsOptionalsFilter(key, defaultFilterData);
      
      if (isOptionalFilter && Boolean(element)) {
        render.push(
          <CatalogViews.Tag
            onClick={() => {
              resetContextFilter(isOptionalFilter.type);
            }}
            title={isOptionalFilter.title}
            filterType={type}
          />,
        );
      }
    }
   
    return render.map((el, i) => {
      return <React.Fragment key={i}>{el}</React.Fragment>;
    });
  };

  const type = <Text text={translateKey} />;
  return (
    <React.Fragment>{getTag(enabledFilterData, defaultFilterData, type, keyFilter)}</React.Fragment>
  );
};

export default React.memo(EnabledFiltersOptions);
