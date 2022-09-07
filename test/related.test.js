require("dotenv").config();
import React from 'react';
import '@testing-library/react/dont-cleanup-after-each';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {render, screen, waitFor} from '@testing-library/react';
import Related from '../client/src/Related/Related.jsx';
import OutfitList from '../client/src/Related/OutfitList/OutfitList.jsx';
import axios from 'axios';


axios.defaults.baseURL = `http://localhost:${process.env.PORT}`;
axios.defaults.adapter = require('axios/lib/adapters/http');



describe('related products', function() {
  jest.setTimeout(200000);
  const user = userEvent.setup();

  render(<Related itemId={37316} setItemId={() => {}}/>)

  it('should render related products on load', () => {
    return waitFor(() => expect(screen.queryByText(/^loading Related Products\.\.\.$/)).not.toBeInTheDocument(), {timeout: 100000})
      .then(() => {
      expect(screen.getByTestId('related').toExist);
      })
  })



  var defaultData = {
  campus: "hr-rfe",
  category: "Kicks",
  created_at: "2021-08-13T14:37:33.145Z",
  default_price: "89.00",
  description: "The Pumped Up serves up crisp court style with a modern look. These shoes show off tennis-whites shades and are constructed with a supple leather upper and a classic rubber cupsole.",
  id: 37316,
  name: "Pumped Up Kicks",
  slogan: "Faster than a just about anything",
  updated_at: "2021-08-13T14:37:33.145Z"
  }

  render(<OutfitList defaultData={defaultData}/>)

  it('should render outfit list on load', () => {
    return waitFor(() => expect(screen.queryByText(/^loading Related Products\.\.\.$/)).not.toBeInTheDocument(), {timeout: 100000})
      .then(() => {
      expect(screen.getByTestId('outfitlist').toExist);
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





