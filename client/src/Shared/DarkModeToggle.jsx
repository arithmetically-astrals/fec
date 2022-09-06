import React from 'react';

const DarkModeToggle = () => {
  return <div id='darkModeToggle' onClick={toggleDarkMode}>toggle dark mode</div>
}

let toggleDarkMode = () => {
  document.body.classList.toggle('bodyDark');

  document.getElementById('topNav').classList.toggle('topNavDark')
  document.getElementById('darkModeToggle').classList.toggle('darkModeToggleDark')
  document.getElementById('topMessage').classList.toggle('topMessageDark');

  var elements = document.getElementsByClassName('widget');
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.toggle('widgetDark');
  }

  var allElements = document.body.getElementsByTagName('*');
  for (let i = 0; i < allElements.length; i++) {
    allElements[i].classList.toggle('borderDark');
    allElements[i].classList.toggle('textDark');
  }

  document.getElementById('overview-infopanel-stylepicker-size').classList.toggle('overview-infopanel-stylepicker-size-dark');
  document.getElementById('overview-infopanel-stylepicker-quantity').classList.toggle('overview-infopanel-stylepicker-quantity-dark');
  document.getElementById('overview-infopanel-actions-cart').classList.toggle('overview-infopanel-actions-cart-dark');
  document.getElementById('overview-infopanel-actions-favorite').classList.toggle('overview-infopanel-actions-favorite-dark');

  if (document.getElementById('qa-search')) {
    document.getElementById('qa-search').classList.toggle('qa-search-dark');
  }
  if (document.getElementById('qa-search-clear')) {
    document.getElementById('qa-search-clear').classList.toggle('qa-search-clear-dark');
  }
  const qaAnswerPhotos = document.getElementsByClassName('qa-answer-photos');
  for (let i = 0; i < qaAnswerPhotos.length; i++) {
    qaAnswerPhotos[i].classList.toggle('qa-answer-photos-dark');
  }
  const qaButtons = document.getElementsByClassName('qa-button');
  for (let i = 0; i < qaButtons.length; i++) {
    qaButtons[i].classList.toggle('qa-button-dark');
  }
  const qaAnswerContainers = document.getElementsByClassName('qa-answer-container');
  for (let i = 0; i < qaButtons.length; i++) {
    qaAnswerContainers[i].classList.toggle('qa-answer-container-dark');
  }
  const qaAnswers = document.getElementsByClassName('qa-answers');
  for (let i = 0; i < qaAnswers.length; i++) {
    qaAnswers[i].classList.toggle('qa-answers-dark');
  }
}

export default DarkModeToggle;