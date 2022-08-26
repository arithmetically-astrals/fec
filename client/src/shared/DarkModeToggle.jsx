import React from "react";

const DarkModeToggle = () => {
  return <div id='darkModeToggle' onClick={toggleDarkMode}>toggle dark mode</div>
}

let toggleDarkMode = () => {
  var element = document.getElementById('appContainer');
  element.classList.toggle("darkTheme");
}

export default DarkModeToggle;

