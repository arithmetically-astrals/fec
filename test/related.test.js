import React from 'react';
import '@testing-library/react/dont-cleanup-after-each';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {render, screen, waitFor} from '@testing-library/react';
import RelatedListItem from '../client/src/Related/RelatedList/RelatedListItem.jsx';
import axios from 'axios';
require("dotenv").config();

axios.defaults.baseURL = `http://localhost:${process.env.PORT}`;
axios.defaults.adapter = require('axios/lib/adapters/http');

describe('related products', function() {

  const user = userEvent.setup();

  render(<Related/>);

  it('should render related products on load', () => {
    return waitFor(() => expect(screen.queryByText(/loading/)).not.toBeInTheDocument())
      .then(() => {
        expect(screen.getByTestId('productList').toExist);
      })
  })
  });

  // const testProduct = {
  //   name: "Camo Onesie",
  //   id: 37311
  // }
  // render(<RelatedListItem key={testProduct.id} id={testProduct.id} product={testProduct}/>);

  // it('should render a Related List Item', () => {
  //   return waitFor(() => expect(screen.queryByText(/loading/)).not.toBeInTheDocument())
  //     .then(() => {
  //       expect(screen.queryByText("Camo Onesie").toBeInTheDocument());
  //     })
  // })

// describe('First Test', function() {
//   console.log(userEvent)
//   const user = userEvent.setup();

//   const testProduct = {
//     name: "Camo Onesie",
//     id: 37311
//   }
//   render(<RelatedListItem key={testProduct.id} id={testProduct.id} product={testProduct}/>);

//   it('should render a Related List Item', () => {
//     return waitFor(() => expect(screen.queryByText(/loading/)).not.toBeInTheDocument())
//       .then(() => {
//         expect(screen.queryByText("Camo Onesie").toBeInTheDocument());
//       })
//   })
// })
>>>>>>> fead785c15f026477938f609aa346e36cbe8be92




