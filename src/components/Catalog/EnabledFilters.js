import React from 'react';
import Text from '../Text';
import CatalogViews from '../../Views/CatalogViews';

const EnabledFilters = ({
  enabledFilterData,
  defaultFilterData,
  translateKey,
  resetContextFilter,
  keyFilter,
}) => {
  const getTag = (id, data, type, key) => {
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element.id === Number(id)) {
        return (
          <CatalogViews.Tag
            onClick={() => {
              resetContextFilter(key, id);
            }}
            title={element.title}
            filterType={type}
          />
        );
      }
    }
  };
  if (!Array.isArray(enabledFilterData)) {
    enabledFilterData = [enabledFilterData];
  }
  return (
    <>
      {enabledFilterData.map((el) => {
        const type = <Text text={translateKey} />;
        return <React.Fragment key={el}>{getTag(el, defaultFilterData, type, keyFilter)}</React.Fragment>;
      })}
    </>
  );
};

export default React.memo(EnabledFilters);
