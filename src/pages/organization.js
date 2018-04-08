import React from 'react';
import GoogleMapReact from 'google-map-react';
import {googleKey} from '../config/config'
import { Link } from 'react-router-dom'

class Organization extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orgInfo: {}
        }
    }

    componentWillMount() {
        this.setState({
            orgInfo: this.props.location.state
        });
    }

    renderMap = () => {
        if (this.state.orgInfo.latitude && this.state.orgInfo.longitude) {
            const center = {lat: parseFloat(this.state.orgInfo.latitude) , lng: parseFloat(this.state.orgInfo.longitude)};
            return (
                <div style={{width: '100%', height: '400px'}}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: googleKey }}
                        defaultCenter={center}
                        defaultZoom={17} 
                    >
                        <div 
                            style={{border: '2px solid black', background: 'rgba(255,255,255,0.6)', height: '30px', width: '30px'}}
                            lat={center.lat}
                            lng={center.lng}
                        >
                        </div>
                    </GoogleMapReact>
                </div>
            )
        } else {
            return (
                <div> Sorry no location info on this organization</div>
            )
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Link to={'/'}>Back to organization directory</Link>
                </div>
                {
                    this.state.orgInfo ?
                        <div>
                            <div>{this.state.orgInfo.organizationname}</div>
                            <div>{this.state.orgInfo.description}</div>
                            <div><a href={this.state.orgInfo.url}>{this.state.orgInfo.url}</a></div>
                            {this.renderMap()}
                        </div>
                        :
                        <div>No info currently on this organization</div>
                }
            </div>
        )
    }

}

export default Organization;