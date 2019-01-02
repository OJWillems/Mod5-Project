import React from 'react';
import {connect} from 'react-redux';

import { Button, Header, Image, Modal, Form, TextArea } from 'semantic-ui-react'

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
        question_response: event.target.question.value,
        has_answered: false
      })
    })
    .then(props.unrenderQuestion())
      // Your question has been posted popup thing.
  }

  return (
    <Modal.Content image>
      <Image wrapped size='medium' src={props.selectedBand.img_url} />
      <Modal.Description>
        <Header>Ask {props.selectedBand.band_name} A Question</Header>
        <Form onSubmit={(event) => createNewQuestion(event)}>
          <Form.Field>
            <TextArea placeholder='Ask something insightful' style={
              {minWidth: 560}
            }
            name="question"/>
          </Form.Field>
          <Button type='submit' color='blue' value="Submit">Submit</Button>
        </Form>
      </Modal.Description>
    </Modal.Content>
  )
}

// <div>
//   <form onSubmit={(event) => createNewQuestion(event)}>
//     <label>
//       Question <textarea type="textarea" name="question" />
//     </label>
//     <br/>
//     <input type="submit" value="Submit" />
//     <Button onClick={() => props.unrenderQuestion()}>Cancel</Button>
//   </form>
// </div>

const mapStateToProps = (state) => {
  return {
    selectedBand: state.selectedBand,
    loggedInListener: state.loggedInListener
  }
}

export default connect(mapStateToProps)(QuestionForm)
