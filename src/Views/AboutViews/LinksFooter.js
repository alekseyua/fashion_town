import React from 'react';
import Text from '../../components/Text';
import { Link } from 'react-router-dom';

const LinksFooter = ({ linkQuestion = '#', linkPartnership = '#' }) => {

  //console.log(linkQuestion)

  return (
    <React.Fragment>
      <p>
        <Text text={'you.can.use'} />{' '}
        <Link to={linkQuestion}>
          <Text text={'popular.questions.answers'} />
        </Link>
      </p>
      <p>
        <Text text={'learn.more.about'} />{' '}
        <Link to={linkPartnership}>
          {' '}
          <Text text={'about.partnership'} />{' '}
        </Link>
      </p>
    </React.Fragment>
  );
};

export default React.memo(LinksFooter);
