import React, {Component} from 'react';
import {connect} from 'react-redux';

const ListenerLogin = (props) => {
  return (
    <div>
      <button name="new listener" onClick={() => props.newListener()} >New Listener</button>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    newListener: () => {
      dispatch ({
        type: 'NEW_LISTENER_HANDLER',
        payload: 'new listener'
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(ListenerLogin)
