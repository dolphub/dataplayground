import React, { Component } from 'react'

import ReactMapboxGl, { Layer, Feature, GeoJSONLayer } from "react-mapbox-gl";

import { Typography } from '@material-ui/core';

const ACCESS_TOKEN = "pk.eyJ1IjoiZG9scGh1YiIsImEiOiJjamkzdGoxNGEwMjdwM3BzZGpmNnZhM2wyIn0.eTRldRCUC7AoFTaxcKEtPA"

const geoJSONRAW = require('./testdata.json');
console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<', geoJSONRAW);

const Map = ReactMapboxGl({
  accessToken: ACCESS_TOKEN
});

export default class GeoMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geoData: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState((prevState, props) => ({
      geoData: nextProps.geoData
    }));
  }
  render() {
    const geoMapData = this.state.geoData.map((x, i) => {
      return (
        <Feature coordinates={[x.latitude, x.longitude]} />
      );
    });
    return (
      <div>
        <Typography variant="display1" align="center">
          {this.props.title}
        </Typography>
        <Map
          center={[ -81.23643912696616, 42.98520662363786 ]}
          zoom={[15]}
          style="mapbox://styles/mapbox/streets-v10"
          animationOptions={{
            easing: false
          }}
          containerStyle={{
            height: "55vh",
            width: "auto"
          }}>
          <Layer type="symbol" id="marker" 
            layout={{ 
              "icon-image": "car-15",
              "icon-size": 2 
            }}
            geoJSONSourceOptions={{
              cluster: false,
              clusterRadius: 0,
              clusterMaxZoom: 10
            }}>
            {geoMapData}
          </Layer>
        </Map>

      </div>
    )
  }
}
