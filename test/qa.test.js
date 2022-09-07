require("dotenv").config();
import React from 'react';
import '@testing-library/react/dont-cleanup-after-each';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {render, screen, waitFor, within} from '@testing-library/react';
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
        const questions = screen.queryAllByTestId('question');
        questions.forEach((question) => {
          expect(within(question).queryAllByTestId('answers').length).toBeLessThan(3);
        })
      })
  });

  it('Should render all answers for a question when See More Answers is clicked', () => {
    return waitFor(() => {
      expect(screen.queryByText(/Loading questions.../i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Be the first to ask a question.../i)).not.toBeInTheDocument();
    })
      .then(() => {
        const moreAnswers = screen.getAllByRole('link', {name: 'See more answers'})
        moreAnswers.forEach((moreAnswer) => {
          return user.click(moreAnswer);
        })
      })
      .then(() => {
        const questions = screen.queryAllByTestId('question');
        questions.forEach((question) => {
          if (within(question).queryByText('Collapse answers')) {
            expect(within(question).queryAllByTestId('answers').length).toBeGreaterThanOrEqual(3);
          }
        })
      })
  });

  it('Should return to rendering two answers for a question when Collapse Answers is clicked', () => {
    return waitFor(() => {
      expect(screen.queryByText(/Loading questions.../i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Be the first to ask a question.../i)).not.toBeInTheDocument();
    })
      .then(() => {
        return user.click(screen.getAllByRole('link', {name: 'See more answers'})[0]);
      })
      .then(() => {
        expect(screen.queryAllByText(/Collapse answers/i).toExist);
      })
      .then(() => {
        return user.click(screen.getAllByText(/Collapse answers/i)[0]);
      })
      .then(() => {
        const questions = screen.queryAllByTestId('question');
        questions.forEach((question) => {
          expect(within(question).queryAllByTestId('answers').length).toBeLessThan(3);
        })
      })
  });

  it('Should open a question modal when Add a question is clicked', () => {
    return waitFor(() => {
      expect(screen.queryByText(/Loading questions.../i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Be the first to ask a question.../i)).not.toBeInTheDocument();
    })
      .then(() => {
        return user.click(screen.getByRole('button', {name: 'Add a question'}))
      })
      .then(() => {
        expect(screen.getByTestId('question-modal').toExist);
      })
  });

  it('Should open an answer modal when Add Answer is clicked', () => {
    return waitFor(() => {
      expect(screen.queryByText(/Loading questions.../i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Be the first to ask a question.../i)).not.toBeInTheDocument();
    })
      .then(() => {
        return user.click(screen.getAllByRole('link', {name: 'Add Answer'})[0])
      })
      .then(() => {
        expect(screen.getByTestId('answer-modal').toExist);
      })
  });

  it('Should open a photo modal when a photo is clicked', () => {
    return waitFor(() => {
      expect(screen.queryByText(/Loading questions.../i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Be the first to ask a question.../i)).not.toBeInTheDocument();
    })
      .then(() => {
        return user.click(screen.getAllByTestId('photo-thumbnail')[0])
      })
      .then(() => {
        expect(screen.getByTestId('photo-modal').toExist);
      })
  });

});