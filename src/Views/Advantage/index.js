import React from 'react';
import { GxGrid, GxRow, GxCol } from '@garpix/garpix-web-components-react';


const Advantage = ({ data = [] }) => {
  return (
    <div className="company-policy pb-60 pb-sm-25">
      <GxGrid>
        <GxRow>
          {data.map((item, index) => {
            return (
              <GxCol key={index} lg={3} sm={6}>
                <div className="single-policy">
                  <div className="icone-img">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="policy-desc">
                    <h3>{item.title}</h3>
                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                  </div>
                </div>
              </GxCol>
            )
          })}
        </GxRow>
      </GxGrid>
    </div>

  )
}

export default React.memo(Advantage);