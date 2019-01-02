import React from 'react';

import { Image } from 'semantic-ui-react'

const BandPreview = (props) => {
  return (
    <div className="bandPreviewComponent">
      <h1>{props.hoveredBandObj.band_name}</h1>
      <Image src={props.hoveredBandObj.img_url} alt={props.hoveredBandObj.band_name} size="massive" />
      <p>{props.hoveredBandObj.band_members}</p>
      <p>{props.hoveredBandObj.bio}</p>
    </div>
  )
}

export default BandPreview;
