import React, {Component} from 'react';

const BandLogin = (props) => {
  return (
    <div>
      <button name="new band" onClick={props.newBandButtonHandler} >New Band</button>
    </div>
  )
}

export default BandLogin;
