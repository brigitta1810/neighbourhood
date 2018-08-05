import React, {Component} from 'react';

//The LocationFinder component is created. It is the component that includes a search field and the list of places. It filters the places according to the user's input in the search field. 
class LocationFinder extends Component {

    constructor() {
        super();

        //the state of this component includes: the array of places that are shown on the map, the text input that the user can use to look for places, and the info about places.
        this.state = {
            info: '',
            listOfLocations: [],
            searchedPlace: ''
        };
    }

    componentDidMount() {
        this.setState({listOfLocations: this.props.locationPoint});
    }

    open = () => {
        var filterSection = document.querySelector('.filterSection');

        filterSection.style.display === 'none' ? filterSection.style.display = 'block' : filterSection.style.display = 'none';
    }

    //when the user searches for places, the markers change on the map. Only the places that match the users input will be shown on the map.
    search = (event) => {
        var searchedPlace = event.target.value.toLowerCase();
        var listOfLocations = this.props.locationPoint;
        var updatedLocations = [];

        listOfLocations.forEach(function (marker) {
            if (marker.title.toLowerCase().indexOf(searchedPlace.toLowerCase()) >= 0) {
                marker.setVisible(true);
                updatedLocations.push(marker);
            } else {
                marker.setVisible(false);
            }
        });

        this.setState({listOfLocations: updatedLocations});
    }

    //info box appears
    seeInfobox(marker) {
        console.log(marker);
        this.props.openInfo(marker);
    }

    //Rendering the view: this component consist of the "Explore" button, and only when it is double-clicked, appears the list of locations and text input.
    render() {

        return (
            <div>
                <button className="explore-button" onClick={this.open}> Explore </button>     
                <div className="filterSection">
                    <div className="search-place" role="link">
                        <input type="text"
                               aria-label="filter" placeholder="Find cool places!"
                               className="text-input" role="search"
                               onChange={this.search}/>
                    </div>
                    <div>
                        <ul>
                            {this.state.listOfLocations && this.state.listOfLocations.length && this.state.listOfLocations.map((marker, i) =>
                                <li className="place-name" key={i}>
                                    <a href="localhost:3000/#" onKeyPress={this.props.openInfo.bind(this, marker)}
                                       onClick={this.props.openInfo.bind(this, marker)}
                                    tabIndex="0" role="button">{marker.title}</a>
                                </li>
                            )}

                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default LocationFinder;