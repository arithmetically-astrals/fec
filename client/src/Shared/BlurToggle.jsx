// function to toggle a blurred background on the app container
// import this into other files to use it during a modal popup

let BlurToggle = () => {
  var element = document.getElementById('appContainer');
  element.classList.toggle('blurred');
}

export default BlurToggle;