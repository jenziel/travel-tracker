// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/logo3.png'
import './images/globe_logo.jpg'
import './images/logo9.png'
import './images/profile-logo.png'
import './images/bell1.png'
import './images/globe-icon.png'
import './images/italy.png'

// Import domUpdates

import 
{signInButton,
showMainPage,
updateTripsPage,
getDestinationNums,
getDestinationNames, 
} from './domUpdates';

//Import functions
import { getUserTrips, getUpcomingTrips, createTripCard  } from './functions';

// Import API Calls
import {getData} from './apiCalls';

// Main Data Object

const mainData = {
    today: '2023/08/04',
}

signInButton.addEventListener('click', showMainPage)

window.addEventListener('load', () => {
    getData
    Promise.all(getData()).then((promises) => {
        mainData.trips = promises[0].trips;
        mainData.travelers = promises[1].travelers;
        mainData.destinations = promises[2].destinations;
        console.log('mainData', mainData);
        console.log('mainData.trips', mainData.trips)
        console.log('mainData.travelers', mainData.travelers)
        getUserData()
    })
    .then(getDescriptiveData())
    .then(generatePage())
  })



  const getUserData = () => {
    mainData.currentUser = mainData.travelers[2].id
    mainData.userTrips = getUserTrips(mainData.trips, mainData.currentUser)
    console.log('mainData.currentUser',  mainData.currentUser)
    console.log('mainData.userTrips', mainData.userTrips)
  }
  const getDescriptiveData = () => {
    mainData.userNums = getDestinationNums(mainData.userTrips)
    mainData.locationNames = getDestinationNames(mainData.userNums, mainData.destinations)
    console.log("mainData.userNums", mainData.userNums)
    console.log("mainData.locationNames", mainData.locationNames)
    mainData.tripCards = createTripCard(mainData.userTrips, mainData.destinations)
  }
  const generatePage = () => {
    mainData.currentUser = mainData.travelers[0];
    updateTripsPage(mainData.travelers[0].name, mainData.locationNames, mainData.trips[0].destinationID)
  }


console.log('This is the JavaScript entry file - your code begins here.');
