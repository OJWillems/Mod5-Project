import React from 'react';

import {Button} from 'semantic-ui-react'

const FollowButton = (props) => {

  const followUnfollow = () => {
    if (props.isFollowing === false) {
      return <Button color="green" name="favorite band" onClick={() => props.createNewFollow()} className="followUnfollowButton">Follow Band</Button>
    } else {
      return <Button color="orange" name="unfavorite band" onClick={() => props.unfollow()} className="followUnfollowButton">Unfollow Band</Button>
    }
  }

  return (
    <div>{followUnfollow()}</div>
  )
}

export default FollowButton;
