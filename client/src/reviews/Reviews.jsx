// the main component for reviews. contains form, list, and menu components as subcomponents
import React from "react";
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));

// Huzzah for jsx!
const App = () => {
  return <h1>Hello World</h1>
}

root.render(<App />);