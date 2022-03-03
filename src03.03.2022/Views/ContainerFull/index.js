import React from 'react';
import { GxGrid, GxRow, GxCol } from '@garpix/garpix-web-components-react';

const ContainerFull = ({ children }) => {
  return (
    <GxGrid>
      <GxRow>
        <GxCol>
          {children}
        </GxCol>
      </GxRow>
    </GxGrid>
  )
}

export default React.memo(ContainerFull);