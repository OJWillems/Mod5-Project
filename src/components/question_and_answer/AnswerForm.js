import React from 'react';
import {connect} from 'react-redux';

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
        <form onSubmit={(event) => {
          submitAnswerHandler(event)
        }}>
          <label>
            Answer: <textarea type="textarea" name="answer_form" />
          </label>
          <br/>
          <input type="submit" value="Submit" />
        </form>
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
