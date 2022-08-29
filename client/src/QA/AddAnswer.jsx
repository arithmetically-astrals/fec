import React from "react";

const AddAnswer = () => (
  <a href="#" onClick={(e) => {
    e.preventDefault();
    console.log('add an answer!');
  }}>Add Answer</a>
)

export default AddAnswer;