import React, {Component} from 'react';

import AnswerForm from './AnswerForm'

class Question extends Component {

  state = {
    questionAsked: false,
  }

  componentDidMount() {
    // console.log("question props", this.props)
  }

  handleQuestionAskedState = () => {
    this.setState({questionAsked: true})
  }

  render() {
    return (
      <div>
        {this.props.questionObj.question_response}
        <br/>
        <button name="answer question" onClick={() => this.handleQuestionAskedState()} >Answer Question</button>
        <AnswerForm questionAsked={this.state.questionAsked} questionObj={this.props.questionObj} />
        <button name="delete question" >Delete Question</button>
      </div>
    )
  }

}

export default Question;
