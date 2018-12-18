import React, {Component} from 'react'
import {connect} from 'react-redux'

const favoritesAPI = 'http://localhost:4000/api/v1/favorites'

class BandDetails extends Component {

  state = {
    isFollowing: false
  }

  createNewFollow = () => {
    fetch(favoritesAPI, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({
        band_id: this.props.selectedBand.id,
        listener_id: this.props.hardCodedListener.id,
      })
    })
      .then(this.setState({isFollowing: true}, () => console.log(this.state.isFollowing)))
  }

  showFollowButton = () => {
    let alreadyFollowing = this.props.allListenerFavorites.find((bandObj) => {
      return bandObj.id === this.props.selectedBand.id
    })
    if (alreadyFollowing === undefined) {
      return <button name="favorite band" onClick={() => this.createNewFollow()} >Follow Band</button>
    } else {
      return <button name="unfavorite band" >Unfollow Band</button>
    }
  }
  render() {
    return(
      <div>
        <h1>{this.props.selectedBand.band_name}</h1>
        <p>{this.props.selectedBand.bio}</p>
        {this.showFollowButton()}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    selectedBand: state.selectedBand,
    hardCodedListener: state.hardCodedListener,
    allListenerFavorites: state.allListenerFavorites
  }
}


// <button name="back to band list" onClick={() => this.props.newListener()} >Back to Bands</button>
// const mapDispatchToProps = (dispatch) => {
//   return{
//
//   }
// }

export default connect(mapStateToProps)(BandDetails);
