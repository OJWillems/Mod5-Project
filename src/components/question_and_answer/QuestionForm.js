import React from 'react';
import {connect} from 'react-redux';

const questionsAPI = 'http://localhost:4000/api/v1/questions'

const QuestionForm = (props) => {

  const createNewQuestion = (event) => {
    event.preventDefault()
    console.log(event.target.question.value)
    fetch(questionsAPI, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({
        band_id: props.selectedBand.id,
        listener_id: props.loggedInListener.id,
        question_response: event.target.question.value
      })
    })
      // Your question has been posted popup thing.
      .then(props.unrenderQuestion())
  }

  return (
    <div>
      <form onSubmit={(event) => createNewQuestion(event)}>
        <label>
          Question <textarea type="textarea" name="question" />
        </label>
        <br/>
        <input type="submit" value="Submit" />
        <button onClick={() => props.unrenderQuestion()}>Cancel</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedBand: state.selectedBand,
    loggedInListener: state.loggedInListener
  }
}

export default connect(mapStateToProps)(QuestionForm)
