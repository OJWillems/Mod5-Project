import React from 'react';

const FollowButton = (props) => {

  const followUnfollow = () => {
    if (props.isFollowing === false) {
      return <button name="favorite band" onClick={() => props.createNewFollow()} >Follow Band</button>
    } else {
      return <button name="unfavorite band" onClick={() => props.unfollow()}>Unfollow Band</button>
    }
  }

  return (
    <div>{followUnfollow()}</div>
  )
}

export default FollowButton;
