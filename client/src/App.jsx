import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Overview from './Overview/Overview.jsx';
import QA from './QA/QA.jsx';
import Related from './Related/Related.jsx';
import Reviews from './Reviews/Reviews.jsx';
import DarkModeToggle from './Shared/DarkModeToggle.jsx';

const root = createRoot(document.getElementById('root'));

const App = () => {

  const [itemId, setitemId] = useState(37316);
  const [starRating, setstarRating] = useState(0);

  return (
    <div id='appContainer'>
      <div id='topNav'>
        <div id='logo'>
          checkout
        </div>
        <DarkModeToggle />
        <input id='search' placeholder='search' />
      </div>
      <div id='topMessage'>special message</div>

      <Overview itemId={itemId} starRating={starRating} />
      <Related itemId={itemId} setitemId={setitemId}/>
      <QA itemId={itemId}/>
      <Reviews itemId={itemId} starRating={starRating} setstarRating={setstarRating} />
    </div>
  )
}


root.render(<App />);