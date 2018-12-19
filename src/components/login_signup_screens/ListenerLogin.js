import React from 'react';
import {connect} from 'react-redux';

const ListenerLogin = (props) => {

  const listenerMockAuth = (event) => {
    event.preventDefault()
    console.log(event.target.username.value)
    let authorizedListener = null
    let listenerFind = props.allListeners.find((listenerObj) => {
      return listenerObj.username === event.target.username.value && listenerObj.password === event.target.password.value
    })
    if (listenerFind) {
      authorizedListener = listenerFind
    }
    console.log(authorizedListener)
    props.logInListener(authorizedListener)
  }

  return (
    <div>
      <form onSubmit={(event) => listenerMockAuth(event)}>
        <label>
          Username:<input type="text" name="username" />
        </label>
        <br/>
        <label>
          Password: <input type="text" name="password" />
        </label>
        <br/>
        <input type="submit" value="Submit" />
      </form>
      <button name="new listener" onClick={() => props.newListener()} >New Listener</button>
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListenerLogin)
