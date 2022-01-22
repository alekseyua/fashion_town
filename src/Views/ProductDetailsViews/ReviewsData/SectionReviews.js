import React from 'react';

const SectionReviews = ({ children }) => {
  return <section className="productreviews">{children}</section>;
};

export default React.memo(SectionReviews);
