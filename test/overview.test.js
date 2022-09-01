import React from 'react';
import '@testing-library/react/dont-cleanup-after-each';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {render, screen, waitFor} from '@testing-library/react';
import Overview from "../client/src/Overview/Overview.jsx";
import axios from 'axios';


axios.defaults.baseURL = `http://localhost:${process.env.PORT}`;
axios.defaults.adapter = require('axios/lib/adapters/http');


describe('overview', function () {
  const user = userEvent.setup();

  render(<Overview />);

  it('Should display the overview when rendering', () => {

    return waitFor(() => expect(screen.queryByText(/loading/)).not.toBeInTheDocument())
      .then(() => {
        expect(screen.getByTestId('overview').toExist);
      })

  })

});