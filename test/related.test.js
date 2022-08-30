import React from 'react';
import '@testing-library/react/dont-cleanup-after-each';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {render, screen, waitFor} from '@testing-library/react';
import RelatedListItem from '../client/src/Related/RelatedList/RelatedListItem.jsx';
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.adapter = require('axios/lib/adapters/http');

describe('First Test', () => {
  const user = userEvent.setup();

  const testProduct = {
    name: "Camo Onesie",
    id: 37311
  }
  const {RelatedListItem} = render(<RelatedListItem key={testProduct.id} id={testProduct.id} product={testProduct}/>);

  it('should render a Related List Item', () => {
    return waitFor(() => expect(screen.queryByText(/Loading/)).not.toBeInTheDocument())
      .then(() => {
        expect(screen.queryByText("Camo Onesie").toBeInTheDocument);
      })
  })
})




