import React from 'react';
import {connect} from 'react-redux';

const BandLogin = (props) => {
  return (
    <div>
      <button name="new band" onClick={() => props.newBand()} >New Band</button>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    newBand: () => {
      dispatch ({
        type: 'NEW_BAND_HANDLER',
        payload: 'new band'
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(BandLogin);
