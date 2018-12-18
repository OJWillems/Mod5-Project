import React from 'react';
import {connect} from 'react-redux';

const Band = (props) => {
  return (
    <div onClick={() => props.selectBand(props.band)}>
      <p>{props.band.band_name}</p>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectBand: (bandObj) => {
      dispatch ({
        type: 'SELECT_BAND',
        payload: bandObj
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(Band);
