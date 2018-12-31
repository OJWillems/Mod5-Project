import React from 'react';
import {connect} from 'react-redux';

import { Button, Form, Message } from 'semantic-ui-react'

const ListenerLogin = (props) => {

  const listenerMockAuth = (event) => {
    event.preventDefault()
    let authorizedListener = null
    let listenerFind = props.allListeners.find((listenerObj) => {
      return listenerObj.username === event.target.username.value && listenerObj.password === event.target.password.value
    })
    if (listenerFind) {
      authorizedListener = listenerFind
    }
    props.logInListener(authorizedListener)
    props.listenerLoginAPI(authorizedListener)
  }


  // <Message
  //   error
  //   header='Incorrect Username or Password'
  //   content='Please try logging in again with the correct information.'
  // />

  // <div>
  //   <form onSubmit={(event) => listenerMockAuth(event)}>
  //     <label>
  //       Username:<input type="text" name="username" />
  //     </label>
  //     <br/>
  //     <label>
  //       Password: <input type="text" name="password" />
  //     </label>
  //     <br/>
  //     <input type="submit" value="Submit" />
  //   </form>
  //
  // </div>

  return (
    <div className="listenerLoginForm" >
      <Form onSubmit={(event) => listenerMockAuth(event)} error>
        <Form.Field>
          <h7><label >Username</label></h7>
          <Form.Input placeholder='Username' name="username" width={4}/>
        </Form.Field>
        <Form.Field>
          <h7><label >Password</label></h7>
          <Form.Input placeholder='Password' type="password" name="password" width={4}/>
        </Form.Field>
        <Button type='submit' color='green'>Submit</Button>
      </Form>
      <br/>
      <Button name="new listener" onClick={() => props.newListener()} color='blue'>New Listener</Button>
      <Button name="back_to_home" onClick={() => props.backToHome()} color='red' >Back</Button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    allListeners: state.allListeners
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newListener: () => {
      dispatch ({
        type: 'NEW_LISTENER_HANDLER',
        payload: 'new listener'
      })
    },
    logInListener: (authorizedListener) => {
      dispatch ({
        type: 'LOG_IN_LISTENER',
        payload: authorizedListener
      })
    },
    listenerLoginAPI: (authorizedListener) => {
      console.log('authorizedListener: ', authorizedListener.id)
      dispatch({
        type: 'SET_LOGGED_IN_LISTENER_API_URL',
        payload: `http://localhost:4000/api/v1/listeners/${authorizedListener.id}/favorites`
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

export default connect(mapStateToProps, mapDispatchToProps)(ListenerLogin)
