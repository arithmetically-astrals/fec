import React, {useState} from "react";
import axios from "axios";

const AddQuestion = (props) => {

  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <>
      <button onClick={() => {
        //have modal pop up with input body, name, email fields

        axios.post('/qa/questions', {
          params: {
            body: 'trying something',
            name: 'John Doe',
            email: 'fakeemail@fakecompany.com',
            product_id: props.product_id
          },
        })
          .then(() => {
            axios.get('/qa/questions', {
              params: {
                product_id: props.product_id,
                count: 10000
              }
            })
              .then((response) => {
                //sort by helpfulness
                props.setQuestions(response.data.results);
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