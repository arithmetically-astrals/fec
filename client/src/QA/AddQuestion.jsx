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
        //have modal pop up with input
        //

        axios.post('/qa/questions', {
          params: {
            body: 'When is this available?',
            name: 'John Doe',
            email: 'fakeemail@fakecompany.com',
            product_id: props.product_id
          },
        })
          .then(() => {
            axios.get('/qa/questions', {
              params: {
                product_id: props.product_id
              }
            })
              .then((response) => {
                props.setQuestions(response.data.results);
                console.log('response.data.results', response.data.results);
              })
              .catch((err) => {
                console.log(err);
              })
          })
          .catch((err) => {
            console.log(err);
          });

      }}>Add a question</button>
    </>
  )

}

export default AddQuestion;