import React, { Component } from 'react';

//importing components and stylesheets
import './App.css';
import GoogleMap from './Components/GoogleMap'
import LocationFinder from "./Components/LocationFinder";


class App extends Component {

    constructor(props) {
        super(props);

//specifying which places should be marked on the map.
//I hard coded the lat long coordinates. Looked up the lat long of various places on https://www.latlong.net/convert-address-to-lat-long.html
        this.state = {
            information: '',
            map: '',
            listOfLocations: [
                {   title: 'Aalborg Zoo',
                    lat: 57.038344,
                    long: 9.899764},
                {
                    lat: 57.049465,
                    long: 9.926184,
                    title: 'Utzon Center',
                },
                {
                    lat: 57.047625,
                    long: 9.932935,
                    title: 'Musikkens Hus'
                },
                {
                    lat: 57.042719,
                    long: 9.905935,
                    title: 'Museum of Modern Arts'
                },
                {
                    lat: 57.078249,
                    long: 9.910073,
                    title: 'Lindholm Høje Museum'
                },
                {
                    lat: 57.045987,
                    long: 9.931611,
                    title: 'Nordkraft'
                },
                {
                    lat: 57.041595,
                    long: 9.904918,
                    title: 'Aalborg Tower'
                },
                {
                    lat: 57.059168,
                    long: 9.893590,
                    title: 'Maritime Adventure Center'
                },
                 {
                    lat: 57.042722,
                    long: 9.913369,
                    title: 'The Singing Trees'
                },
                {
                    lat: 57.046556,
                    long: 9.931354,
                    title: 'Danish Jazz History Center'
                },
                {
                    lat: 57.033714,
                    long: 9.934117,
                    title: 'Fun Center'
                },
                {
                    lat: 57.018351,
                    long: 9.963104,
                    title: 'Gigantium'
                },
                {
                    lat: 57.051763,
                    long: 9.898442,
                    title: 'Aalborg Stadion'
                },
                {   lat: 57.043481,
                    long: 9.912027,
                    title: 'Congress and Culture Center'
                },
                {   lat: 57.041760,
                    long: 9.918482,
                    title: 'Bio City Cinema'
                },
                {   lat: 57.046995,
                    long: 9.916470,
                    title: 'Aalborg Theatre'
                }

            ],
            locationPoints: []
        };

        //Using the bind method on the initMap, createLocationIcon to have markers on map, and seeInfobox function that contains info about the places, and the "this" keyword set to the provided value 
        this.initMap = this.initMap.bind(this);
        this.createLocationIcons = this.createLocationIcons.bind(this);
        this.seeInfobox = this.seeInfobox.bind(this);
    }

    

   //In order to get the map, I used Google maps with my API key
    componentDidMount() {
        window.initMap = this.initMap;
        getMap('https://maps.googleapis.com/maps/api/js?key=AIzaSyBp8oaiSbbT5dqAzQbSGkkk5v2IRc265Jw&callback=initMap');
    }
    //initializing the map, which is zoomed to 12 when the user opens the app in the browser - it gives a good overview of the city. 
    //The map shows Aalborg, a city in Denmark.
    initMap() {
        let map;
        map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: {lat: 57.046707, lng: 9.935932}
        });

        //infoWindow created and stored in a variable. It will show information about the chosen place
        const infowindow = new window.google.maps.InfoWindow({});

        this.setState({map: map, information: infowindow});
        this.createLocationIcons(map);
    }

    //A function for creating location icons on the map
    createLocationIcons(map) {
        let infowindow = this;

        //looping through the location icons, so all places get a marker on the map
        this.state.listOfLocations.forEach(marker => {
            var locations = {lat: marker.lat, lng: marker.long}

            let locationicon = new window.google.maps.Marker({
                map: map,
                position: locations,
                title: marker.title
            });

            //event listeners added to the markers: when the user clicks a marker, the infobox can be seen
            locationicon.addListener('click', function () {
                infowindow.seeInfobox(locationicon);
            });

            let locationPt = this.state.locationPoints;
            locationPt.push(locationicon);
            
                  
        });
    }
    
    //When the user clicks on markers, some information shows up about the place, such as the name and address. To get this info, I used Foursquare's Places API products (https://developer.foursquare.com/docs/api/getting-started), and chose "Venue"
    seeInfobox(marker = '') {
        var clientId = "O1OIVJFTPYCUUFCHGFOKSAVFX4VBDJ3E1PSWEDYKOIOIIVE1\n";
        var clientSecret = "FSJ2RFDUBWCFHOQIDOZYLZVMGMLJM5SNG4QTT5SLNTBF3IN1\n";
        //userless authentication according to Forsquares documentation: https://developer.foursquare.com/docs/api/configuration/authentication
        var url = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20130815&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";

        //When a location icon/marker is clicked, a bouncing animation is added to the icons that last 1500ms
        if (this.state.information.marker !== marker) {
            this.state.information.marker = marker;
            this.state.information.open(this.state.map, marker);
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
            setTimeout(function(){ marker.setAnimation(null); }, 1500);
            this.state.information.addListener('closeClick', function () {
            this.state.information.setMarker(null);
            });

            this.placeDescription(url);
        }
    }

    //info window with relevant information about the given place. I chose to show the places' address and city, since I think this is the information the user needs the most when searching a map.
    //The data is fetched from Foursquare, a 3rd party API. If there are any problems or data missing, a message reporting the loading error will appear.
    placeDescription(url) {
        let infowindow = this.state.information;
        let place;
        fetch(url)
            .then(function (response) {
                if (response.status !== 200) {
                    var fail = "Unable to load data at the moment...";
                 this.state.information.setContent(fail);
                }
                response.json().then(function (data) {
                    var place = data.response.venues[0];
                    

                    var information =
                        "<div id='marker'>" +
                            "<h2>" + infowindow.marker.title + "</h2>" + "<p><b>Address:</b> " + place.location.address + ", " + place.location.city + "</p>" + "</div>";
                    infowindow.setContent(information);
                });

                console.log(place);
            })
            .catch(function (fail) {
                var error = "Unable to load data at the moment...";
                infowindow.setContent(error);
            });

    }

    //Rendering the view: Besides the map, the Location Finder section - that lists and filters the recommended places on the map is the major component of the app. It makes the map application more user-friendly and interactive.
    render() {
        return (
            <div>
                <aside>
                    <LocationFinder
                        infoWindow={this.state.information}
                        openInfo={this.seeInfobox}
                        locationPoint={this.state.locationPoints}
                    >

                    </LocationFinder>
                    <h1 id="title">Visit Aalborg</h1>
                </aside>
                <GoogleMap listOfLocations={this.state.listOfLocations}></GoogleMap>
            </div>
        );
    }
}



function getMap(url) {
    let tag = window.document.getElementsByTagName('script')[0];
    let script = window.document.createElement('script');

    script.src = url;
    script.async = true;

    script.onerror = function () {
    document.write("Google Maps can't be loaded");
    };
    tag.parentNode.insertBefore(script, tag);
}

export default App;

