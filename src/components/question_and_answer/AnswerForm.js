import React from 'react';
import {connect} from 'react-redux';

import {Form, TextArea, Button} from 'semantic-ui-react';


const answersAPI = "http://localhost:4000/api/v1/answers"
// need this API: http://localhost:4000/api/v1/questions/<questionID>



const AnswerForm = (props) => {

  const singleQuestionAPI = `http://localhost:4000/api/v1/questions/${props.questionObj.id}`

  const submitAnswerHandler = (event) => {
    event.preventDefault()
    console.log(event.target.answer_form.value)
    fetch(answersAPI, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({
        band_id: props.loggedInBand.id,
        question_id: props.questionObj.id,
        answer_response: event.target.answer_form.value
      })
    })
    fetch(singleQuestionAPI, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({
        has_answered: true,
      })
    })
      .then(props.questionAnsweredHandler())
  }

  const renderForm = () => {
    if (props.questionAsked === true) {
      return (
        <div>
          <div className="answerFormDiv">
            <Form onSubmit={(event) => submitAnswerHandler(event)}>
              <Form.Field>
                <TextArea placeholder="Write Your Answer" style={
                  {minHeight: 10000},
                  {minWidth: 10000},
                  {maxWidth: 10000}
                } name="answer_form"/>
              </Form.Field>
              <Button type='submit' color='green' value="Submit">Submit</Button>
            </Form>
          </div>
        </div>
      )
    }
  }


  return(
    <div>
      {renderForm()}
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    loggedInBand: state.loggedInBand,
  }
}

export default connect(mapStateToProps)(AnswerForm)
