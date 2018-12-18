import React from 'react';

const BandSignUpForm = (props) => {
  return (
    <form onSubmit={props.bandSignUp}>
      <label>
        Username:<input type="text" name="username" />
      </label>
      <br/>
      <label>
        Password: <input type="text" name="password" />
      </label>
      <br/>
      <label>
        Band Name: <input type="text" name="bandName" />
      </label>
      <br/>
      <label>
        Bio: <textarea type="textarea" name="bio" />
      </label>
      <br/>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default BandSignUpForm;
