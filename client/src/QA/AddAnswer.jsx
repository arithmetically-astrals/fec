import React from "react";

const AddAnswer = () => (
  <a href="#" onClick={(e) => {
    e.preventDefault();
    console.log('add an answer!');
    //modal popup
    //axios call
  }}>Add Answer</a>
)

export default AddAnswer;