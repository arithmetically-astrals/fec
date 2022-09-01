import React, {useState} from "react";
import axios from "axios";
import BlurToggle from "../Shared/BlurToggle.jsx";

const AddQuestion = (props) => {

  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [questionModal, setQuestionModal] = useState(null);

  return (
    <>
      {questionModal}
      <button onClick={() => {
        //have modal pop up with input body, name, email fields
        // BlurToggle();
        setQuestionModal(<form id='qa-question-modal'>
          <h2>Ask Your Question</h2>
          <h4>About the {props.productName}</h4>
        </form>);
        // axios.post('/qa/questions', {
        //   body: 'trying something',
        //   name: 'John Doe',
        //   email: 'fakeemail@fakecompany.com',
        //   product_id: props.product_id
        // })
        //   .then(() => {
        //     axios.get('/qa/questions', {
        //       params: {
        //         product_id: props.product_id,
        //         count: 10000
        //       }
        //     })
        //       .then((response) => {
        //         let tempObj = props.initialQuestionHelpfulness;
        //         response.data.results.forEach((question) => {
        //           if (props.initialQuestionHelpfulness[question.question_id] === undefined) {
        //             tempObj[question.question_id] = question.question_helpfulness;
        //           }
        //         })
        //         props.setInitialQuestionHelpfulness(tempObj);
        //         props.setQuestions(response.data.results);
        //       })
        //       .catch((err) => {
        //         console.log(err);
        //       });
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      }}>Add a question</button>
    </>
  )
}

export default AddQuestion;