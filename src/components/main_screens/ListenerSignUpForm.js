import React, {Component} from 'react';

const ListenerSignUpForm = (props) => {
  return (
    <form onSubmit={props.listenerSignUp}>
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
  )
}

export default ListenerSignUpForm;
