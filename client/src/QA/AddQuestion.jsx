import React, {useState} from "react";
import axios from "axios";

const AddQuestion = (props) => {

  const [text, setText] = useState ('');

  return (
    <>
      <input type={text} placeholder="temporary input" onChange={(e) => {
        setText(e.target.value);
      }}/>
      <button onClick={() => {
        console.log('add a question!');
        axios.post('/qa/questions', {
          params: {
            product_id: 37312,
            body: 'When is this available?',
            name: 'John Doe',
            email: 'fakeemail@fakecompany.com'
          },
        })
          .catch((err) => {
            console.log(err);
          })
        //have modal pop up with input
        //

        // const newQuestions = props.questions.slice();
        // newQuestions.push({text, answers: []});
        // props.setQuestions(newQuestions);
      }}>Add a question</button>
    </>
  )

}

export default AddQuestion;