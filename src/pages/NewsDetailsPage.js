import React from 'react';
import NewsDetailsComponent from '../components/NewsDetailsComponent';
import Layout from '../Views';
import { useIntl } from 'react-intl';
import Container from '../Views/Container';

const NewsDetailsPage = (props) => {
  const { site_configuration, breadcrumbs, content, created_at, title, id } = props;
  const setModalStates = () => {};
  const setLikeProductCard = () => {};
  const {
    page_type_catalog,
    page_type_news,
    page_type_reviews,
    page_type_live_photos,
    page_type_404,
    page_type_500,
  } = site_configuration;
  const { locale } = useIntl();

  return (
    <Layout {...props}>
      <Container>
        {/* <NewsDetailsComponent
          title={title}
          breadcrumbs={breadcrumbs}
          created_at={created_at}
          content={content}
        /> */}

        <NewsDetailsComponent
          page_type_news={page_type_news}
          id={id}
          title={title}
          breadcrumbs={breadcrumbs}
          created_at={created_at}
          content={content}
        />
      </Container>
    </Layout>
  );
};

export default React.memo(NewsDetailsPage);
