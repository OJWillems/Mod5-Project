import React, {Component} from 'react';
import {connect} from 'react-redux';

import Band from './Band'
import BandPreview from './BandPreview'

import { List, Button } from 'semantic-ui-react'

class BandContainer extends Component {

  state = {
    shouldDisplayFavorites: false,
    hoveredBandObj: this.props.allBands[0],
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
            < Band key={idx} band={band} onMouseOverHandler={this.onMouseOverHandler} />
          )
        })
      } else if (this.state.shouldDisplayFavorites === true) {
        return this.props.allListenerFavorites.map((band, idx) => {
          return(
            < Band key={idx} band={band} onMouseOverHandler={this.onMouseOverHandler} />
          )
        })
      }
    }
  }

  renderFavoritesButton = () => {
    if (this.state.shouldDisplayFavorites === false) {
      return <Button color="purple" name="only_display_favorites" onClick={() => this.displayFavoriteBands()} className="displayFavoritesButton">Favorites</Button>
    } else {
      return <Button color="purple" name="display_all_bands" onClick={() => this.displayFavoriteBands()} className="displayFavoritesButton">All Bands</Button>
    }
  }

  displayFavoriteBands = () => {
    this.setState({
      shouldDisplayFavorites: !this.state.shouldDisplayFavorites
    })
  }

  onMouseOverHandler = (bandObj) => {
    this.setState({hoveredBandObj: bandObj}, () => console.log(this.state.hoveredBandObj))
  }

  renderBandPreview = () => {
    if (this.state.hoveredBandObj) {
      return <BandPreview hoveredBandObj={this.state.hoveredBandObj}/>
    }
  }

  render() {
    return (
      <div>
        <h1 className="bandContainerHeader">All Bands:</h1>
        {this.renderFavoritesButton()}
        <List size='massive' className="bandContainerList">
          {this.mapBands()}
        </List>
        {this.renderBandPreview()}
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
