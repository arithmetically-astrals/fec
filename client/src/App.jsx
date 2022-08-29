import React from "react";
import { createRoot } from "react-dom/client";
import Overview from "./Overview/Overview.jsx";
import QA from "./QA/QA.jsx";
import Related from "./Related/Related.jsx";
import Reviews from "./Reviews/Reviews.jsx";
import DarkModeToggle from "./Shared/DarkModeToggle.jsx";

const root = createRoot(document.getElementById("root"));

// Huzzah for jsx!
const App = () => {
  return <div id='appContainer'>
    <div id='topNav'>
      logo and search
      <DarkModeToggle />
    </div>
    <div id='topMessage'>special message</div>
    
    <Overview />
    <Related />
    <QA />
    <Reviews />
  </div>
}

root.render(<App />);