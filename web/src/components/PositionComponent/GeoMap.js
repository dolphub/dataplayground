import React, { Component } from 'react'

import geoJsonData from './geojson.json';

import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";

import { Typography } from '@material-ui/core';

const ACCESS_TOKEN = "pk.eyJ1IjoiZG9scGh1YiIsImEiOiJjamkzdGoxNGEwMjdwM3BzZGpmNnZhM2wyIn0.eTRldRCUC7AoFTaxcKEtPA"

const Map = ReactMapboxGl({
  accessToken: ACCESS_TOKEN
});

const center = [ -81.23722314834593, 42.98549210410066 ];

const mapStyle = {
  flex: 1
};

const symbolLayout = { 
  visibility: 'visible',
  'icon-image': 'bicycle-15',
  'icon-size': 2
};

export default class GeoMap extends Component {
  
  
  constructor(props) {
    super(props);
    this.state = {
      geoData: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState((prevState, props) => ({
      geoData: {
        type: "FeatureCollection",
        features: nextProps.geoData        
      }
    }));
  }

  onThingClick(e) {
    console.log(e);
  }

  onStyleLoad = (map) => {
    const { onStyleLoad } = this.props;
    return onStyleLoad && onStyleLoad(map);
  };

  render() {
    return (
      <div>
        <Typography variant="display1" align="center">
          {this.props.title}
        </Typography>

        <Map
          center={center}
          containerStyle={mapStyle}
          style="mapbox://styles/mapbox/streets-v10"
          containerStyle={{
            height: "55vh",
            width: "auto"
          }}>

          <GeoJSONLayer 
            data={this.state.geoData}
            symbolLayout={symbolLayout}
            circleOnClick={this.onThingClick.bind(this)}
            />
        </Map>
      </div>
    )
  }
}

