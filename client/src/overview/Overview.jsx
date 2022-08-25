// the main component for the overview of the current product
// this component will contain Details and StylePicker as sub-components
import React from "react";
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));

// Huzzah for jsx!
const App = () => {
  return <h1>Hello World</h1>
}

root.render(<App />);