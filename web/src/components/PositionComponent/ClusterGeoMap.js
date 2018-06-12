import React, { Component } from 'react'

import ReactMapboxGl, { Marker, Cluster, Popup } from "react-mapbox-gl";
import { ReactMapboxGlCluster } from "react-mapbox-gl-cluster";

import { Typography } from '@material-ui/core';

const accessToken = "pk.eyJ1IjoiZG9scGh1YiIsImEiOiJjamkzdGoxNGEwMjdwM3BzZGpmNnZhM2wyIn0.eTRldRCUC7AoFTaxcKEtPA"

const Map = ReactMapboxGl({ accessToken });

const mapStyle = {
    flex: 1
};

const center = [-81.23722314834593, 42.98549210410066];

const styles = {
    clusterMarker: {
        width: 30,
        height: 30,
        borderRadius: '50%',
        backgroundColor: '#51D5A0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        border: '2px solid #56C498',
        cursor: 'pointer'
    },
    marker: {
        width: 30,
        height: 30,
        borderRadius: '50%',
        backgroundColor: '#E0E0E0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid #C9C9C9'
    }
};
//https://github.com/alex3165/react-mapbox-gl/blob/master/example/src/demos/htmlCluster.tsx

export default class ClusterGeoMap extends Component {


    constructor(props) {
        super(props);
        this.state = {
            geoData: []
        };
    }

    componentWillReceiveProps(nextProps) {
        // this.setState((prevState, props) => ({
        //     geoData: nextProps.geoData
        // }));
        this.setState((prevState, props) => ({
            geoData: {
                type: "FeatureCollection",
                features: nextProps.geoData
            }
        }));
    }

    clusterMarker = (coordinates, pointCount) => {
        <Marker
            key={coordinates.toString()}
            coordinates={coordinates}
            style={styles.clusterMarker}
        >
            <div>{pointCount}</div>
        </Marker>
    }

    getEventHandlers() {
        return {
            onClick: (properties, coords, offset) =>
                this.renderPopup(properties, coords, offset),
            onMouseEnter: (properties, coords, offset) =>
                console.log(
                    `Receive event onMouseEnter at properties: ${properties}, coords: ${coords}, offset: ${offset}`
                ),
            onMouseLeave: (properties, coords, offset) =>
                console.log(
                    `Receive event onMouseLeave at properties: ${properties}, coords: ${coords}, offset: ${offset}`
                ),
            onClusterClick: (properties, coords, offset) =>
                console.log(
                    `Receive event onClusterClick at properties: ${properties}, coords: ${coords}, offset: ${offset}`
                )
        };
    }

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
                    }}
                >
                    <ReactMapboxGlCluster data={this.state.geoData} {...this.getEventHandlers()}  />
                </Map>
            </div>
        )
    }
}


// <Cluster ClusterMarkerFactory={this.clusterMarker}>
// {this.state.geoData.map((feature, key) => (
//     <Marker
//         key={key}
//         style={styles.marker}
//         coordinates={feature.geometry.coordinates}
//         data-feature={feature}
//     >
//         <div title={feature.properties.name}>
//             {feature.properties.name[0]}
//         </div>
//     </Marker>
// ))}
// </Cluster>
