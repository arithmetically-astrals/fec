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

  render(<Reviews itemId={37316} setstarRating={() => {}}/>)

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

  it('should render image modal when image is clicked', () => {
    return waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument())
      .then(() => {
    return user.click(screen.getAllByTestId('image')[0])
      .then(() => {
        expect(screen.getByTestId('imageModal')).toBeInTheDocument()
      })
    })
  })

  it('should close the image modal when button is clicked', () => {
    return waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument())
      .then(() => {
        return user.click(screen.getAllByTestId('image')[0])
      .then(() => {
        expect(screen.getByTestId('imageModal')).toBeInTheDocument()
      return user.click(screen.getByText(/X/))
      .then(() => {
        expect(screen.queryByTestId('imageModal')).not.toBeInTheDocument()
        })
      })
    })
  })

  it('should render write review form when button is clicked', () => {
    return waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument())
      .then(() => {
    return user.click(screen.getByRole('button', {name: 'Write a review'}))
      .then(() => {
        expect(screen.getByText('Write Your Review')).toBeVisible()
      })
    })
  })

  it('should add a photo to the review form', () => {
    return waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument())
      .then(() => {
    return user.click(screen.getByRole('button', {name: 'Write a review'}))
      .then(() => {
        return user.click(screen.getByRole('button', {name: 'Add a photo!'}))
      .then(() => {
        expect(screen.getByText('Insert image link below:')).toBeVisible()
        })
      })
    })
  })

});