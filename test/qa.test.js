require("dotenv").config();
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

  render(<QA itemId={37316}/>)

  it('Should always include an add question button', () => {
    expect(screen.findByText('Add a question').toExist);
  });

  it('Should render questions if they exist', () => {
    return waitFor(() => {
      expect(screen.queryByText(/Loading questions.../i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Be the first to ask a question.../i)).not.toBeInTheDocument();
    })
      .then(() => {
        expect(screen.getByTestId('questions').toExist);
      })
  });

  it('Should render at maximum 4 questions on load', () => {
    return waitFor(() => {
      expect(screen.queryByText(/Loading questions.../i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Be the first to ask a question.../i)).not.toBeInTheDocument();
    })
      .then(() => {
        expect(screen.getAllByTestId('question').length).toBeLessThan(5);
      })
  });

  it('Should render at maximum 2 more questions when More Answered Questions is clicked', () => {
    return waitFor(() => {
      expect(screen.queryByText(/Loading questions.../i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Be the first to ask a question.../i)).not.toBeInTheDocument();
    })
      .then(() => {
        return user.click(screen.getByRole('button', {name: 'More Answered Questions'}))
      })
      .then(() => {
        expect(screen.getAllByTestId('question').length).toBeGreaterThanOrEqual(5);
        expect(screen.getAllByTestId('question').length).toBeLessThan(7);
      })
  });

  it('Should render at maximum 2 answers for every question', () => {
    return waitFor(() => {
      expect(screen.queryByText(/Loading questions.../i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Be the first to ask a question.../i)).not.toBeInTheDocument();
    })
      .then(() => {
        expect(screen.getAllByTestId('answer').length).toBeLessThan(3);
      })
  });

  // it('Should render all answers for a question when See More Answers is clicked', () => {
  //   return waitFor(() => {
  //     expect(screen.queryByText(/Loading questions.../i)).not.toBeInTheDocument();
  //     expect(screen.queryByText(/Be the first to ask a question.../i)).not.toBeInTheDocument();
  //   })
  //     .then(() => {

  //     })
  // });

  // it('Should return to rendering two answers for a question when Collapse Answers is clicked', () => {
  //   return waitFor(() => {
  //     expect(screen.queryByText(/Loading questions.../i)).not.toBeInTheDocument();
  //     expect(screen.queryByText(/Be the first to ask a question.../i)).not.toBeInTheDocument();
  //   })
  //     .then(() => {

  //     })
  // });

});