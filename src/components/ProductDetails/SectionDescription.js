import React from 'react';
import Title from '../../Views/Title';
import ProductDetailsViews from '../../Views/ProductDetailsViews';
import Container from '../../Views/Container';

const SectionDescription = ({ content, extra,article }) => {
  return (
    <ProductDetailsViews.SectionDescription>
      <Container>
        <div className="productdescription__inner-title"
        
        >
          <Title variant={'productdescription__title'} type={'h2'}>
            О товаре
          </Title>
          <div><h5><strong>Артикул:</strong> {article}</h5></div> 
        </div>
        <ProductDetailsViews.DescriptionRow>
          <ProductDetailsViews.ProductDescriptionText content={content} />
          <ProductDetailsViews.ProductDescriptionList extra={extra}/>
        </ProductDetailsViews.DescriptionRow>
      </Container>
    </ProductDetailsViews.SectionDescription>
  );
};

export default React.memo(SectionDescription);
