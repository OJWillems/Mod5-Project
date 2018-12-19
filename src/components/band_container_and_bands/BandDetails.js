import React, {Component} from 'react'
import {connect} from 'react-redux'

import FollowButton from './FollowButton'

const favoritesAPI = 'http://localhost:4000/api/v1/favorites'

class BandDetails extends Component {

  state = {
    isFollowing: null,
    specificFavoriteObject: null,
  }

  setIsFollowingState = () => {
    let alreadyFollowing = this.props.allListenerFavorites.find((bandObj) => {
      return bandObj.id === this.props.selectedBand.id
    })
    if (alreadyFollowing === undefined) {
      this.setState({isFollowing: false,})
    } else {
      this.setState({isFollowing:true})
    }
  }

  setSpecificFavoriteObjectState = () => {
    let specificFavoriteObject = null;
    let specificFavoriteObj = this.props.allFavorites.find((favoriteObj) => {
      return favoriteObj.band_id === this.props.selectedBand.id && favoriteObj.listener_id === this.props.loggedInListener.id
    })
    if (specificFavoriteObj !== undefined) {
      specificFavoriteObject = specificFavoriteObj
    }
    this.setState({specificFavoriteObject: specificFavoriteObject}, () => console.log(this.state.specificFavoriteObject))
  }

  renderFollowButton = () => {
    if (this.props.loggedInListener) {
      return < FollowButton isFollowing={this.state.isFollowing} createNewFollow={this.createNewFollow} unfollow={this.unfollow} />
    }
  }

  componentDidMount(){
    if (this.props.loggedInListener) {
      this.setIsFollowingState()
      this.setSpecificFavoriteObjectState()
    }
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
        listener_id: this.props.loggedInListener.id,
      })
    })
      .then(this.setState({isFollowing: true}))
      .then(resp => resp.json())
      .then(favoriteObj => this.setState({specificFavoriteObject: favoriteObj.favorite}, () => console.log(this.state.specificFavoriteObject)))
  }

  unfollow = () => {
    fetch(favoritesAPI + `/${this.state.specificFavoriteObject.id}`, {
      method: 'DELETE'
    })
      .then(this.setState({isFollowing: false}))
  }



  render() {
    return(
      <div>
        <h1>{this.props.selectedBand.band_name}</h1>
        <p>{this.props.selectedBand.bio}</p>
        {this.renderFollowButton()}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    selectedBand: state.selectedBand,
    loggedInListener: state.loggedInListener,
    allFavorites: state.allFavorites,
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
