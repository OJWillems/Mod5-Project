import React from 'react';
import {connect} from 'react-redux';

import {Button, Form, Message} from 'semantic-ui-react'

const ListenerSignUpForm = (props) => {
  return (
    <div className="listenerSignUpForm">
      <Form onSubmit={props.listenerSignUp}>
        <Form.Field>
          <h7><label>Username</label></h7>
          <Form.Input placeholder='Username' name='username' width={4}/>
        </Form.Field>
        <Form.Field>
          <h7><label>Password</label></h7>
          <Form.Input placeholder='Password' type="password" name='password' width={4}/>
        </Form.Field>
        <Form.Field>
          <h7><label>Name</label></h7>
          <Form.Input placeholder='Name' name="name" width={4}/>
        </Form.Field>
        <Button type='submit' color='blue' value="Submit">Submit</Button>
        <Button name="back_to_login" onClick={() => props.backToListenerLogin()} color='red' >Back</Button>
      </Form>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    backToListenerLogin: () => {
      dispatch({
        type: 'CHOOSE_LISTENER',
        payload: 'listener login'
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(ListenerSignUpForm);
