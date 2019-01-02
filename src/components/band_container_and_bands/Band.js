import React from 'react';
import {connect} from 'react-redux';

import { List } from 'semantic-ui-react'


const Band = (props) => {
  return (
    <List.Item onMouseEnter={() => props.onMouseOverHandler(props.band)} onClick={() => props.selectBand(props.band)} className="bandContainerBandListItem">
      <List.Header><p className="bandContainerBandListItemHeader">{props.band.band_name}</p></List.Header>
      <List.Description as='a'><p className="bandContainerBandListItemHeader">{props.band.genre}</p></List.Description>
      <br/>
    </List.Item>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectBand: (bandObj) => {
      dispatch ({
        type: 'SELECT_BAND',
        payload: bandObj
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(Band);
