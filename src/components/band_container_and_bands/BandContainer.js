import React, {Component} from 'react';
import {connect} from 'react-redux';

import Band from './Band'

class BandContainer extends Component {

  state = {
    shouldDisplayFavorites: false,
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

  displayFavoriteBands = () => {
    this.setState({
      shouldDisplayFavorites: true
    })
  }

  render() {
    return (
      <div>
        <h1>BAND CONTAINER</h1>
        <button name="only display favorites" onClick={() => this.displayFavoriteBands()} >Favorites</button>
        {this.mapBands()}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    allBands: state.allBands,
    allListenerFavorites: state.allListenerFavorites
  }
}

export default connect(mapStateToProps)(BandContainer);
