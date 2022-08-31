require("dotenv").config();
import React from 'react';
import '@testing-library/react/dont-cleanup-after-each';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {render, screen, waitFor} from '@testing-library/react';
import Reviews from "../client/src/Reviews/Reviews.jsx";
import axios from 'axios';


axios.defaults.baseURL = `http://localhost:${process.env.PORT}`;
axios.defaults.adapter = require('axios/lib/adapters/http');

describe.only('review stuff', function () {
  const user = userEvent.setup();

  render(<Reviews />)

  it('should render a single set of reviews', () => {

    return waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument())
      .then(() => {
        expect(screen.getAllByTestId('review-tile')).toHaveLength(2);
      })
  })

  it('should render more reviews when button is clicked', () => {

    return waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument())
      .then(() => {
        expect(screen.getAllByTestId('review-tile')).toHaveLength(2);
        return user.click(screen.getByRole('button', {name: 'More reviews'}))
      })
      .then(() => {
        return waitFor(() => expect(screen.getAllByTestId('review-tile')).toHaveLength(4))
        .then(() => {
          expect(screen.getAllByTestId('review-tile')).toHaveLength(4);
        })
      })
  })

});