import React, { Component } from 'react'
import { fireStoreDb } from '../../Firestore';
import Paper from '@material-ui/core/Paper';

import GeoTable from './GeoTable'
import GeoMap from './GeoMap'

export default class PositionComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      geoData: [],
      rawGeoJson: {}
    };
  }

  componentWillMount() {
    fireStoreDb.collection('Things').onSnapshot(this.onSnapshotChange.bind(this));
  }

  onSnapshotChange(snapshot) {
    this.setState({
      geoData: snapshot.docs.map(x => x.data())
    });
  }


  render() {
    return (
      <div>
        <Paper elevation={20} >
          <GeoMap title="Current Position" geoData={this.state.geoData} />
        </Paper>
        <Paper elevation={20}>
          <GeoTable title="Geo Positions" geoData={this.state.geoData} />
        </Paper>
      </div>
    )
  }
}
