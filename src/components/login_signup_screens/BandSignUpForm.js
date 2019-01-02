import React from 'react';
import {connect} from 'react-redux';

import {Button, Form, Message, TextArea} from 'semantic-ui-react';


const BandSignUpForm = (props) => {
  return (
    <div className="bandSignUpForm">
      <Form onSubmit={props.bandSignUp}>
        <Form.Field>
          <h7><label>Username</label></h7>
          <Form.Input placeholder='Username' name='username' width={4}/>
        </Form.Field>
        <Form.Field>
          <h7><label>Password</label></h7>
          <Form.Input placeholder='Password' type="password" name='password' width={4}/>
        </Form.Field>
        <Form.Field>
          <h7><label>Band Name</label></h7>
          <Form.Input placeholder='Band Name' name='bandName' width={4}/>
        </Form.Field>
        <Form.Field>
          <h7><label>Bio</label></h7><br/>
          <TextArea placeholder='Write your a short bio' style={
            {minHeight: 100},
            {maxWidth: 400}
          } name='bio'/>
        </Form.Field>
        <Form.Field>
          <h7><label>Genre</label></h7>
          <Form.Input placeholder='Genre' name='genre' width={4}/>
        </Form.Field>
        <Form.Field>
          <h7><label>Band Members</label></h7>
          <Form.Input placeholder='Band Member 1, Band Member 2...' name='bandMembers' width={4}/>
        </Form.Field>
        <Form.Field>
          <h7><label>Image URL</label></h7>
          <Form.Input placeholder='Image URL' name='imgUrl' width={4}/>
        </Form.Field>
        <Button type='submit' color='purple' value="Submit">Submit</Button>
        <Button name="back_to_login" onClick={() => props.backToBandLogin()} color='red' >Back</Button>
      </Form>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    backToBandLogin: () => {
      dispatch({
        type: 'CHOOSE_BAND',
        payload: 'band login'
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(BandSignUpForm);
