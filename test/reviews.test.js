import React from 'react';
import '@testing-library/react/dont-cleanup-after-each';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {render, screen, waitFor} from '@testing-library/react';
import Reviews from "../client/src/Reviews/Reviews.jsx";
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.adapter = require('axios/lib/adapters/http');

describe('review stuff', function () {
  const user= userEvent.setup();

  render(<Reviews />)

  it('should render meta review info', () => {

    return waitFor(() => expect(screen.queryByText(/loading/)).not.toBeInTheDocument())
      .then(() => {
        return user.click(screen.getByText('Yes')).then(() => {
          expect(screen.getByTestId('yes-count').toHaveTextContent('1'))
        })
      })
  })

});