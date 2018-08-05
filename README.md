# Visit Aalborg: Neighbourhood map built in React



## Application

The Neighbourhood React app is built to show visitors interesting locations in the city, and give them basic information about the locations, such as the address. When clicking on the "Explore" button, a search bar appears on the left side, which helps users find interesting places quickly and locate them on the map. 

## Launching the project

After you have cloned this project to your device, all you need to do is cd into the project in the terminal, and run "npm install". After that you should run "npm start". The project should open at localhost:3000

## Third party API providing info about locations, using Foursquare

By clicking on the markers, a window pops up with the name and address of the locations. To get this info, I used Foursquare, a 3rd party API.

## Google Maps
Google Maps has a central role in this application. I created an API key on https://console.developers.google.com/apis, which is used in this neighbourhood map project. Google Maps is used for showing various locations of interest - in this case places worth visiting in the city of Aalborg, Denmark. 
The specific locations with markers were hard coded: I used the website "https://www.latlong.net/convert-address-to-lat-long.html" to convert addresses into lat-long coordinates, and then, I entered the numbers in app.js.


## Foursquare
I used Foursquare, a 3rd party API to get info about the specified locations. I used the "Get details of a venue" product to get the information: https://developer.foursquare.com/docs/api/venues/details

I created my own project on Foursquare's website in order to get a client ID and client Secret. I used these numbers in the project.

## How to launch and use the app
After you have downloaded the project from GitHub, first you need to "cd" into the project in your terminal. Then, run "npm run" to open the project
in the browser. it will open the project at localhost:3000. 

Once the project is open in the browser, you can see the markers and by cliking on any of them a window will pop up
with the name and address of the place. To see the whole liste of places, double-click the "Explore" green button in the right upper corner. 
An input field will appear in the left bottom corner, where you can start typing in the name of a location. For example typing in the letter "A"
will make all places that include "a" appear in the list. If you delete the text input, all the places will appear, and you can click on any of them, 
and the marker will bounce on the map, showing you where the place is - and at the same time the info window also becomes visible to the place you chose from the filter sidebar:) 


## Using the app offline

 
The app is usable offline as well :) 

## Problems during building the project
While I was working on the project, Google has changed its policies...and maps are not available for free the same way they were before. Therefore, the map is darkened and watermarked with
"For development purposes only". I tried to resolve the issue but Google asked for my credit card info, picture of my creditcard (covering half of the numbers on the photo), and a 
verification picture (such as ID, passport or driving licence).
I did not feel like sharing this sensitive info with Google, so I would rather leave the map darkened - 
the app still functions well in spite of that, so it should not prevent me from meet all project specifications.


## References:

Getting the API key for the map: https://console.developers.google.com/apis

Converting adresses to lat-long coordinates: https://www.latlong.net/convert-address-to-lat-long.html

Using 3rd party API to get details about places: https://developer.foursquare.com/docs/api/venues/details

Bouncing markers: https://developers.google.com/maps/documentation/javascript/examples/marker-animations

Serviceworker: it was automatically created by React and I did not change the code in it. 



