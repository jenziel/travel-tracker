// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";

// IMAGES
import "./images/turing-logo.png";
import "./images/arrow-down.png";
import "./images/logo3.png";
import "./images/globe_logo.jpg";
import "./images/logo9.png";
import "./images/profile-logo.png";
import "./images/bell1.png";
import "./images/globe-icon.png";

//DOM UPDATES
import {
  signInButton,
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
  bookingPage,
  confirmationPage,
  createNewBookingCard,
  confirmBtn,
  backToBookingBtn,
  tripsHeaderBtn,
  showPage,
  tripsPage,
  userName,
  passWord,
  datesError,
  numTravelersError
} from "./domUpdates";

//FUNCTIONS
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
  sortTripsSequentially,
  checkForValidUsername,
  checkPassword,
  checkValidDates,
  checkValidNumPassengers,
  justDigits
} from "./functions";

// API CALLS
import { getData, postNewTripBooking, signInUser} from "./apiCalls";

//DATA MODEL:
const mainData = {
  today: dayjs(),
};

// ON-PAGE-LOAD EVENTS:
window.addEventListener("load", () => {
  loadPage()
  });

const loadPage = () => {
  getData;
  Promise.all(getData()).then((promises) => {
    mainData.trips = promises[0].trips;
    mainData.travelers = promises[1].travelers;
    mainData.destinations = promises[2].destinations;
    const signedInUser = mainData.currentUser
    getUserData(signedInUser);
 
    getDescriptiveData();
    generatePage();
  });
}

// BUTTON CLICK EVENTS:
tripsHeaderBtn.addEventListener("click", ()=> {
  showPage(tripsPage)
});

//SUBMIT LOGIN INFO EVENT:
signInButton.addEventListener("click", (e) => {
  e.preventDefault()
  const usernameInput = userName.value
  const passwordInput = passWord.value
  const signInData = {
    un: usernameInput,
    pw: passwordInput,
  }
  if(checkForValidUsername === true && checkPassword === true){
    const uniqueID = justDigits(signInData.un)
    signInUser(uniqueID)
  }
 
  // .then(() => mainData.currentUser = data.id)
  .then(() => showPage(tripsPage))
});

goToBookingBtn.addEventListener("click", () => {
  showPage(bookingPage)
});

backToBookingBtn.addEventListener("click", () => {
  showPage(bookingPage)
})

newBookingBtn.addEventListener("click", () => {
  if(checkValidDates(startDate.value, endDate.value) !== 'Dates are valid'){
    return datesError.innerText = checkValidDates(startDate.value, endDate.value)
 }
 if(checkValidDates(startDate.value, endDate.value) === 'Dates are valid'){
  datesError.innerText = ''
}
 if(checkValidNumPassengers(numberTravelers.value) !== 'Number of passengers is valid'){
  return numTravelersError.innerText = checkValidNumPassengers(numberTravelers.value)
 }
 if(checkValidNumPassengers(numberTravelers.value) === 'Number of passengers is valid'){
  numTravelersError.innerText = ''
 }
  const vacation = {
    startDate: startDate.value,
    endDate: endDate.value,
    locationName: locationDropdown.value,
    travelers: numberTravelers.value,
  };
  
  mainData.pendingVacation = vacation;
  showPage(confirmationPage);
  const newDuration = calculateNumDays(mainData.pendingVacation.startDate, mainData.pendingVacation.endDate)
  mainData.pendingVacation.duration = newDuration
  console.log("vacation2", vacation);
  createNewBookingCard(mainData.pendingVacation, searchDestinationByName(vacation.locationName, mainData.destinations))
  
});

confirmBtn.addEventListener("click", () => {
  postNewTripBooking(mainData.currentUser, mainData.pendingVacation, searchDestinationByName(mainData.pendingVacation.locationName, mainData.destinations), mainData)
  .then(()=> { showPage(tripsPage)
    loadPage()})
})

const getUserData = () => {
  mainData.currentUser = mainData.travelers[5];
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
