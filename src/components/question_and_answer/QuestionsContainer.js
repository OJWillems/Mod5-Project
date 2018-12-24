import React from 'react';
import {connect} from 'react-redux';

import Question from './Question';

const QuestionsContainer = (props) => {

  // Might need to add a boolean column to the backend - has been answered? If questionObj.hasAnswer === false, render the question, if true, don't. In the child, upon the answer, run a patch to update that value, and then .then call on the mapBandsQuestions function here to run the map again and only display the ones you want.



  const mapBandsQuestions = () => {
    if (props.allBandsQuestions) {
      return props.allBandsQuestions.map((questionObj) => {
        if (questionObj.has_answered === false) {
          return (
            <div key={questionObj.id}>
              < Question questionObj={questionObj} />
              <br/>
            </div>
          )
        }
      })
    }
  }

  return (
    <div>
      {mapBandsQuestions()}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedInBand: state.loggedInBand,
    allBandsQuestions: state.allBandsQuestions
  }
}

export default connect(mapStateToProps)(QuestionsContainer)
