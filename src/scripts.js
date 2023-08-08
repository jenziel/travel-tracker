// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";
import "./images/arrow-down.png";
import "./images/logo3.png";
import "./images/globe_logo.jpg";
import "./images/logo9.png";
import "./images/profile-logo.png";
import "./images/bell1.png";
import "./images/globe-icon.png";

// Import domUpdates

import {
  signInButton,
  showMainPage,
  showBookingPage,
  goToBookingBtn,
  updateTripsPage,
  createUpcomingCards,
  createPendingCards,
  createPastCards,
  populateLocationDropdown,
  locationDropdown,
  newBookingBtn,
  startDate,
  endDate,
  numberTravelers,
  location,
  bookingPage,
  bookingPanel,
  pendingTripBox,
  bookingPage2,
  createNewBookingCard,
  confirmBtn,
  backToBookingBtn
} from "./domUpdates";

//Import functions
import {
  getUserTrips,
  sortTripsByDate,
  addDates,
  addLocationInfo,
  dayjs,
  getUpcoming,
  getPending,
  getPast,
  getAnnualArray,
  getAnnualSpending,
  searchDestinationByName,
  calculateNumDays,
  sortSequentially,
  addDuration,
  sortTripsSequentially
} from "./functions";

// Import API Calls
import { getData, postNewTripBooking } from "./apiCalls";

// Main Data Object

const mainData = {
  today: dayjs(),
};

signInButton.addEventListener("click", showMainPage);
goToBookingBtn.addEventListener("click", showBookingPage);
locationDropdown.addEventListener("change", () => {
  const selectedValue = locationDropdown.value;
  console.log("Selected location:", selectedValue);
});

confirmBtn.addEventListener("click", function(){
  postNewTripBooking(mainData.currentUser, mainData.pendingVacation, searchDestinationByName(mainData.pendingVacation.locationName, mainData.destinations), mainData)
  .then(()=> { showMainPage()
    loadPage()})
})
window.addEventListener("load", () => {
  loadPage()
  // getData;
  // Promise.all(getData()).then((promises) => {
  //   mainData.trips = promises[0].trips;
  //   mainData.travelers = promises[1].travelers;
  //   mainData.destinations = promises[2].destinations;
  //   console.log("mainData", mainData);
  //   console.log("mainData.trips", mainData.trips);
  //   console.log("mainData.travelers", mainData.travelers);
  //   getUserData();
  //   getDescriptiveData();
  //   generatePage();
  });
// });
const loadPage = () => {
  getData;
  Promise.all(getData()).then((promises) => {
    mainData.trips = promises[0].trips;
    mainData.travelers = promises[1].travelers;
    mainData.destinations = promises[2].destinations;
    console.log("mainData", mainData);
    console.log("mainData.trips", mainData.trips);
    console.log("mainData.travelers", mainData.travelers);
    getUserData();
    getDescriptiveData();
    generatePage();
  });
}
newBookingBtn.addEventListener("click", () => {
  const vacation = {
    startDate: startDate.value,
    endDate: endDate.value,
    locationName: locationDropdown.value,
    travelers: numberTravelers.value,
  };
  mainData.pendingVacation = vacation;
  bookingPanel.classList.add("hidden");
  bookingPage2.classList.remove("hidden");
  const newDuration = calculateNumDays(mainData.pendingVacation.startDate, mainData.pendingVacation.endDate)
  mainData.pendingVacation.duration = newDuration
  console.log("vacation2", vacation);
  createNewBookingCard(mainData.pendingVacation, searchDestinationByName(vacation.locationName, mainData.destinations))
});

const getUserData = () => {
  mainData.currentUser = mainData.travelers[2];
  mainData.userTrips = getUserTrips(mainData.trips, mainData.currentUser.id);
  console.log("mainData.currentUser", mainData.currentUser);
  console.log("mainData.userTrips", mainData.userTrips);
};

const getDescriptiveData = () => {
  addDates(mainData.userTrips);
  addLocationInfo(mainData.userTrips, mainData.destinations);
  sortTripsByDate(mainData.userTrips);
  console.log("mainData.userTrips", mainData.userTrips);
  populateLocationDropdown(mainData.destinations);
};

const generatePage = () => {
  updateTripsPage(
    mainData.currentUser.name,
    getAnnualSpending(getAnnualArray(mainData.userTrips))
  );
  const pendingTrips = getPending(mainData.userTrips)
  const sortedPending = sortSequentially(pendingTrips)
  createPendingCards(sortedPending);
  createUpcomingCards(getUpcoming(mainData.userTrips));
  createPastCards(sortSequentially(getPast(mainData.userTrips)));
};

console.log("This is the JavaScript entry file - your code begins here.");
