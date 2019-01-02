import React from 'react';
import {connect} from 'react-redux';

import { Button, Form, Message } from 'semantic-ui-react'

const BandLogin = (props) => {

  const bandMockAuth = (event) => {
    event.preventDefault()
    let authorizedBand = null
    let bandFind = props.allBands.find((bandObj) => {
      return bandObj.username === event.target.username.value && bandObj.password === event.target.password.value
    })
    if (bandFind) {
      authorizedBand = bandFind
      props.logInBand(authorizedBand)
      props.bandQuestionsAPI(authorizedBand)
    }
  }

  return (
    <div className="loginForm">
      <Form onSubmit={(event) => bandMockAuth(event)} error>
        <Form.Field>
          <h7><label>Username</label></h7>
          <Form.Input placeholder='Username' name="username" width={4}/>
        </Form.Field>
        <Form.Field>
          <h7><label>Password</label></h7>
          <Form.Input placeholder='Password' type="password" name="password" width={4}/>
        </Form.Field>
        <Button type='submit' color='green'>Submit</Button>
      </Form>
      <br/>
      <Button name="newBand" onClick={() => props.newBand()} color='purple'>New Band</Button>
      <Button name="backToHome" onClick={() => props.backToHome()} color='red'>Back</Button>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    allBands: state.allBands
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newBand: () => {
      dispatch ({
        type: 'NEW_BAND_HANDLER',
        payload: 'new band'
      })
    },
    logInBand: (authorizedBand) => {
      dispatch ({
        type: 'LOG_IN_BAND',
        payload: authorizedBand
      })
    },
    bandQuestionsAPI: (authorizedBand) => {
      dispatch({
        type: 'SET_LOGGED_IN_BAND_API_URL',
        payload: `http://localhost:4000/api/v1/bands/${authorizedBand.id}/questions`
      })
    },
    backToHome: () => {
      dispatch({
        type: 'GO_BACK_TO_HOME_PAGE',
        payload: 'start home'
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BandLogin);
