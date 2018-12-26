import React from 'react';
import {connect} from 'react-redux';

const BandLogin = (props) => {

  const bandMockAuth = (event) => {
    event.preventDefault()
    let authorizedBand = null
    let bandFind = props.allBands.find((bandObj) => {
      return bandObj.username === event.target.username.value && bandObj.password === event.target.password.value
    })
    if (bandFind) {
      authorizedBand = bandFind
    }
    props.logInBand(authorizedBand)
    props.bandQuestionsAPI(authorizedBand)
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
    },
    bandQuestionsAPI: (authorizedBand) => {
      dispatch({
        type: 'SET_LOGGED_IN_BAND_API_URL',
        payload: `http://localhost:4000/api/v1/bands/${authorizedBand.id}/questions`
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BandLogin);
