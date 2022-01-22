import React from 'react';
import Title from '../../Views/Title';
import ProductDetailsViews from '../../Views/ProductDetailsViews';
import Container from '../../Views/Container';

const SectionDescription = ({ content, extra }) => {
  return (
    <ProductDetailsViews.SectionDescription>
      <Container>
        <Title variant={'productdescription__title'} type={'h2'}>
          О товаре
        </Title>
        <ProductDetailsViews.DescriptionRow>
          <ProductDetailsViews.ProductDescriptionText content={content} />
          <ProductDetailsViews.ProductDescriptionList extra={extra}/>
        </ProductDetailsViews.DescriptionRow>
      </Container>
    </ProductDetailsViews.SectionDescription>
  );
};

export default React.memo(SectionDescription);
