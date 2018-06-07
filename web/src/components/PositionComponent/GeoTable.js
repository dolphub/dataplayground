import React, { Component } from 'react'

import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@material-ui/core';

export default class GeoTable extends Component {
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
      <div>
        <Typography variant="display1" align="center">
          {this.props.title}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Latitude</TableCell>
              <TableCell>Longitude</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {geoData}
          </TableBody>
        </Table>
      </div>
    )
  }
}
