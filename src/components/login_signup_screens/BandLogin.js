import React from 'react';
import {connect} from 'react-redux';

const BandLogin = (props) => {

  const bandMockAuth = (event) => {
    event.preventDefault()
    console.log(event.target.username.value)
    let authorizedBand = null
    let bandFind = props.allBands.find((bandObj) => {
      return bandObj.username === event.target.username.value && bandObj.password === event.target.password.value
    })
    if (bandFind) {
      authorizedBand = bandFind
    }
    console.log(authorizedBand)
    props.logInBand(authorizedBand)
  }

  return (
    <div>
      <form onSubmit={(event) => bandMockAuth(event)}>
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
      <button name="new band" onClick={() => props.newBand()} >New Band</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    allBands: state.allBands
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newBand: () => {
      dispatch ({
        type: 'NEW_BAND_HANDLER',
        payload: 'new band'
      })
    },
    logInBand: (authorizedBand) => {
      dispatch ({
        type: 'LOG_IN_BAND',
        payload: authorizedBand
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BandLogin);
