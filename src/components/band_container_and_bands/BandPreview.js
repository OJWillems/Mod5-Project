import React from 'react';

import { Image } from 'semantic-ui-react'

const BandPreview = (props) => {
  return (
    <div className="bandPreviewComponent">
      <div className="bandDetailsImage"><Image src={props.hoveredBandObj.img_url} alt={props.hoveredBandObj.band_name} size="massive" /></div>
      <h2 classnName="bandPreviewMembers">{props.hoveredBandObj.band_members}</h2>
      <h2>Bio: </h2>
      <p className="bandPreviewBio">{props.hoveredBandObj.bio}</p>
    </div>
  )
}

export default BandPreview;
