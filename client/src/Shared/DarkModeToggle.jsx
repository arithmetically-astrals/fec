import React from "react";

const DarkModeToggle = () => {
  return <div id='darkModeToggle' onClick={toggleDarkMode}>toggle dark mode</div>
}

let toggleDarkMode = () => {
  var element = document.body;
  element.classList.toggle('bodyDark');

  var elements = document.getElementsByClassName('widget');
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.toggle('widgetDark')
  }

  var allElements = document.body.getElementsByTagName("*");
  for (let i = 0; i < allElements.length; i++) {
    allElements[i].classList.toggle('borderDark')
    allElements[i].classList.toggle('textDark')
  }
}

export default DarkModeToggle;