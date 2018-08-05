import React, {Component} from 'react';

//The GoogleMap component is created and rendered & returned in the view. It is a very simple component consisting of only one div with the id "location-area", which wraps the div with the id "map". The the div covers the whole page, as specified in the stylesheet.
class GoogleMap extends Component {


    render() {

        return (
            <div id="location-area">
                <div id="map" role="application">

                </div>
            </div>
        )
    }
}

export default GoogleMap;