import React from "react";

const DarkModeToggle = () => {
  return <div id='darkModeToggle' onClick={toggleDarkMode}>toggle dark mode</div>
}

let toggleDarkMode = () => {
  document.body.classList.toggle('bodyDark');

  document.getElementById('topNav').classList.toggle('topNavDark')
  document.getElementById('darkModeToggle').classList.toggle('darkModeToggleDark')
  document.getElementById('topMessage').classList.toggle('topMessageDark');

  document.getElementById('overview-infopanel-stylepicker-size').classList.toggle('overview-infopanel-stylepicker-size-dark');
  document.getElementById('overview-infopanel-stylepicker-quantity').classList.toggle('overview-infopanel-stylepicker-quantity-dark');
  document.getElementById('overview-infopanel-actions-cart').classList.toggle('overview-infopanel-actions-cart-dark');
  document.getElementById('overview-infopanel-actions-favorite').classList.toggle('overview-infopanel-actions-favorite-dark');

  var elements = document.getElementsByClassName('widget');
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.toggle('widgetDark');
  }

  var allElements = document.body.getElementsByTagName("*");
  for (let i = 0; i < allElements.length; i++) {
    allElements[i].classList.toggle('borderDark');
    allElements[i].classList.toggle('textDark');
  }
}

export default DarkModeToggle;