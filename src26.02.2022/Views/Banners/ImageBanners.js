import React from 'react';
import SingleBanner from '../SingleBanner';


const ImageBanners = ({ data=[], col }) => {
  if(data.length === 0) return null;
  return (
    <div className="upper-banner banner p-5">
      <div className="container">
        <div className="row">
          {data.map((item, index) => {
            return (
              <div key={index} className={`col-sm-${col}`}>
                <SingleBanner {...item} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default React.memo(ImageBanners);