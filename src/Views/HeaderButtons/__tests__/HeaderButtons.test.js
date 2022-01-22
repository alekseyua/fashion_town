import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import HeaderButtons from '../HeaderButtons';

test('CheckboxWithLabel changes the text after click', () => {
  // Render a dropDownAndButton with label in the document
  const dropDownAndButton = render(<HeaderButtons isScrolled={true}/>);
  //console.log('dropDownAndButton', dropDownAndButton);
});
