// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/down-arrow.png'
import './images/logo3.png'
import './images/globe_logo.jpg'
import './images/logo9.png'
import './images/profile-logo.png'
import './images/bell1.png'
import './images/globe-icon.png'



// Import domUpdates

import 
{signInButton,
showMainPage,
showBookingPage,
goToBookingBtn,
updateTripsPage,
createUpcomingCards,
createPendingCards,
createPastCards, 
populateLocationDropdown,
locationInput,
locationList,
accordionBtn
} from './domUpdates';

//Import functions
import { getRandomCurrentUser, getUserTrips, sortTripsByDate, addDates, addLocationInfo, dayjs, getUpcoming, getPending, getPast, getAnnualArray, getAnnualSpending } from './functions';

// Import API Calls
import {getData, postNewTripBooking} from './apiCalls';

// Import Flatpickr
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';

// flatpickr('#date-picker', {
 
// });

// Main Data Object

const mainData = {
    today: dayjs(),
}

signInButton.addEventListener('click', showMainPage)
goToBookingBtn.addEventListener('click', showBookingPage)
accordionBtn.addEventListener('click', () => {
  locationList.style.display = locationList.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', event => {
  if (!accordionBtn.contains(event.target) && !locationList.contains(event.target)) {
    locationList.style.display = 'none';
  }
});

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
        getDescriptiveData()
        generatePage()
    })
    // .then(getDescriptiveData())
    // .then(generatePage())
  })



  const getUserData = () => {
    mainData.currentUser =    getRandomCurrentUser(mainData.travelers)
    // mainData.travelers[32]
    mainData.userTrips = getUserTrips(mainData.trips, mainData.currentUser.id)
    console.log('mainData.currentUser',  mainData.currentUser)
    console.log('mainData.userTrips', mainData.userTrips)
  }
  const getDescriptiveData = () => {
    addDates(mainData.userTrips);
    addLocationInfo(mainData.userTrips, mainData.destinations);
    sortTripsByDate(mainData.userTrips);
    console.log('mainData.userTrips', mainData.userTrips)
    populateLocationDropdown(mainData.destinations)
  }
  const generatePage = () => {
    updateTripsPage(mainData.currentUser.name, getAnnualSpending(getAnnualArray(mainData.userTrips)));
    createPendingCards(getPending(mainData.userTrips));
    createUpcomingCards(getUpcoming(mainData.userTrips));
    createPastCards(getPast(mainData.userTrips))

  }


console.log('This is the JavaScript entry file - your code begins here.');
