import React, { Component } from 'react'
import { fireStoreDb } from './Firestore';
import Paper from '@material-ui/core/Paper';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@material-ui/core';

export default class GeoPosition extends Component {
  constructor(props) {
    super(props)
    this.state = {
      geoData: []
    };
  }

  componentWillMount() {
    fireStoreDb.collection('Things').onSnapshot(this.onSnapshotChange.bind(this));
  }

  onSnapshotChange(snapshot) {
    this.setState({
      geoData: snapshot.docs.map(x => {
        let data = x.data();
        let [latitude, longitude] = data.point.geometry.coordinates;
        return {
          id: x.id,
          latitude,
          longitude
        };
      })
    });
  }


  render() {
    const geoData = this.state.geoData.map((x, i) => {
      return (
        <TableRow hover key={x.id}>
          <TableCell>{x.id}</TableCell>
          <TableCell numeric>{x.latitude}</TableCell>
          <TableCell numeric>{x.longitude}</TableCell>
        </TableRow>
      );
    });

    return (
      <Paper elevation={20}>
        <Typography variant="display1" align="center">
          Current Position
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Thing Id</TableCell>
              <TableCell>Latitude</TableCell>
              <TableCell>Longitude</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {geoData}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}
