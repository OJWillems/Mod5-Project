import React, {Component} from 'react';

const StartHome = (props) => {
  return (
    <div>
      <h1>Are you a Band or a Listener?</h1>
      <button name="band" onClick={props.bandOrListenerButtonHandler} > Band </button>
      <button name="listener" onClick={props.bandOrListenerButtonHandler} > Listener </button>
    </div>
  )
}

export default StartHome;
