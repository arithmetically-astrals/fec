import React from 'react';
import '@testing-library/react/dont-cleanup-after-each';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {render, screen, waitFor} from '@testing-library/react';
import QA from "../client/src/QA/QA.jsx";
import axios from 'axios';

axios.defaults.baseURL = `http://localhost:${process.env.PORT}`;
axios.defaults.adapter = require('axios/lib/adapters/http');

describe('questions and answers', function () {
  const user = userEvent.setup();

  render(<QA />);

  it('Should render questions on load', () => {
    return waitFor(() => expect(screen.queryByText(/^loading Related Products\.\.\.$/)).not.toBeInTheDocument())
      .then(() => {
        expect(screen.getByTestId('questions').toExist);
        // return user.click(screen.getByText('More Answered Questions'))
        //   .then(() => {
        //     expect(screen.getByTestId('questions').toHaveLength(6));
        //   })
      })
  })

});