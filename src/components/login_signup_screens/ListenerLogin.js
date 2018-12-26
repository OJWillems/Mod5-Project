import React from 'react';
import {connect} from 'react-redux';

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
    },
    listenerLoginAPI: (authorizedListener) => {
      console.log('authorizedListener: ', authorizedListener.id)
      dispatch({
        type: 'SET_LOGGED_IN_LISTENER_API_URL',
        payload: `http://localhost:4000/api/v1/listeners/${authorizedListener.id}/favorites`
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListenerLogin)
