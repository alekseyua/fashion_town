import React, { useState } from 'react';
import ProductDetailsViews from '../../Views/ProductDetailsViews';
import Container from '../../Views/Container';

const SectionReviews = ({
  reviews_count,
  profileId,
  reviews_statistic,
  productId,
  canselationCallback,
  openModalFinalyAddReview,
}) => {
  return (
    <ProductDetailsViews.SectionReviews>
      <Container>
        <ProductDetailsViews.ReviewsRow>
          <ProductDetailsViews.ReviewsLeftSide
            reviews_count={reviews_count}
            profileId={profileId}
            product={productId}
            openModalFinalyAddReview={openModalFinalyAddReview}
          />
          <ProductDetailsViews.ReviewsRightSide reviews_statistic={reviews_statistic} />
        </ProductDetailsViews.ReviewsRow>
      </Container>
    </ProductDetailsViews.SectionReviews>
  );
};

export default React.memo(SectionReviews);
