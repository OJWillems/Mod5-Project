import React, {Component} from 'react';
import {connect} from 'react-redux';

import Band from './Band'

class BandContainer extends Component {

  state = {
    shouldDisplayFavorites: false,
  }

  getListenerFavorites = () => {
    fetch(this.props.loggedInListenerAPI)
      .then(resp => resp.json())
      .then(favoritesResp => this.props.setAllListenerFavorites(favoritesResp))
  }

  componentDidMount() {
    this.getListenerFavorites();
  }

  mapBands = () => {
    // loading spinner if null
    if (this.props.allBands !== null && this.props.allFavorites !==null) {
      if (this.state.shouldDisplayFavorites === false) {
        return this.props.allBands.map((band, idx) => {
          return(
            < Band key={idx} band={band} />
          )
        })
      } else if (this.state.shouldDisplayFavorites === true) {
        return this.props.allListenerFavorites.map((band, idx) => {
          return(
            < Band key={idx} band={band} />
          )
        })
      }
    }
  }

  renderFavoritesButton = () => {
    if (this.state.shouldDisplayFavorites === false) {
      return <button name="only_display_favorites" onClick={() => this.displayFavoriteBands()} >Favorites</button>
    } else {
      return <button name="display_all_bands" onClick={() => this.displayFavoriteBands()} >All Bands</button>
    }
  }

  displayFavoriteBands = () => {
    this.setState({
      shouldDisplayFavorites: !this.state.shouldDisplayFavorites
    })
  }

  render() {
    return (
      <div>
        <h1>BAND CONTAINER</h1>
        {this.renderFavoritesButton()}
        {this.mapBands()}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    allBands: state.allBands,
    allListenerFavorites: state.allListenerFavorites,
    loggedInListener: state.loggedInListener,
    loggedInListenerAPI: state.loggedInListenerAPI
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAllListenerFavorites: (favoritesResp) => {
      dispatch({
        type: "GET_ALL_LISTENER_FAVORITES",
        payload: favoritesResp.favorites
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BandContainer);
