import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Overview from './Overview/Overview.jsx';
import QA from './QA/QA.jsx';
import Related from './Related/Related.jsx';
import Reviews from './Reviews/Reviews.jsx';
import DarkModeToggle from './Shared/DarkModeToggle.jsx';
import axios from 'axios';



const App = () => {

  const [itemId, setitemId] = useState(37316);
  const [starRating, setstarRating] = useState(0);

  const trackClick = (e) => {
    var widget = e.target.getAttribute("id") + ''|| e.target.getAttribute("class") + ''|| 'Unlabled div';
    axios.post('/tracker', {
      element: e.target.tagName + '',
      widget: widget,
      time: new Date()
    })
  }

  return (
    <div id='appContainer' onClick={trackClick}>
      <div id='topNav'>
        <div id='logo'>
          The Astral Plane
        </div>
        <DarkModeToggle />
        <input id='search' placeholder='search' />
      </div>

      <div id='topMessage'>Limited time offer! 10% off all Astral-themed items</div>
      <div id='mainContentContainer'>
        <div id='mainContent'>
          <Overview itemId={itemId} starRating={starRating} />
          <Related itemId={itemId} setitemId={setitemId} />
          <QA itemId={itemId} />
          <Reviews itemId={itemId} starRating={starRating} setstarRating={setstarRating} />
        </div>
      </div>
    </div>
  )
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);