import React from 'react';
import {connect} from 'react-redux';

const StartHome = (props) => {
  return (
    <div>
      <h1>Are you a Band or a Listener? </h1>
      <button name="band" onClick={() => props.chooseBand()} > Band </button>
      <button name="listener" onClick={() => props.chooseListener()} > Listener </button>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    chooseBand: () => {
      dispatch({
        type: 'CHOOSE_BAND',
        payload: "band login"
      })
    },
    chooseListener: () => {
      dispatch({
        type: 'CHOOSE_LISTENER',
        payload: 'listener login'
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(StartHome);
