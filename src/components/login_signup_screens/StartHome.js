import React from 'react';
import {connect} from 'react-redux';

import {Button} from 'semantic-ui-react';

const StartHome = (props) => {
  return (
    <div className="startHomeDiv">
      <div className="startHomeContainerDiv">
        <h1 className="startHomeHeader">Are You a Band or a Listener? </h1>
        <br/>
        <div className="startHomeButtons">
          <Button name="band" onClick={() => props.chooseBand()} className="startHomeButtonBand" floated='right' size='huge' color='purple'>Band</Button>
          <Button name="listener" onClick={() => props.chooseListener()} className="startHomeButtonListener" floated='left' size='huge' color='blue'>Listener</Button>
        </div>
      </div>
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
