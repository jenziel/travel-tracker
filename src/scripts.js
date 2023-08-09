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
  numTravelersError,
  usernameError,
  passwordError,
  locationError,
  selectedLocation,
  clearForm,
  bookingForm
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
  checkForValidUsername,
  checkPassword,
  checkValidDates,
  checkValidNumPassengers,
  justDigits,
  accessUserById,
} from "./functions";

// API CALLS
import { getData, postNewTripBooking, signInUser } from "./apiCalls";

//DATA MODEL:
const mainData = {
  today: dayjs(),
  currentUser: {
    id: 1,
    name: "Ham Leadbeater",
    travelerType: "relaxer",
  },
};

// ON-PAGE-LOAD EVENTS:
window.addEventListener("load", () => {
  loadPage();
});

// BUTTON CLICK EVENTS:
tripsHeaderBtn.addEventListener("click", () => {
  showPage(tripsPage);
});

goToBookingBtn.addEventListener("click", () => {
  showPage(bookingPage);
});

backToBookingBtn.addEventListener("click", () => {
  showPage(bookingPage);
});

//SUBMIT LOGIN INFO EVENT:
signInButton.addEventListener("click", (e) => {
  e.preventDefault();
  const usernameInput = userName.value;
  console.log(usernameInput);
  const passwordInput = passWord.value;
  console.log(passwordInput);
  const signInData = {
    un: usernameInput,
    pw: passwordInput,
  };
  if (!checkForValidUsername(signInData.un)) {
    usernameError.innerText = "Username not found";
  }
  if (!checkPassword(signInData.pw)) {
    passwordError.innerText = "Password incorrect";
  }
  if (checkForValidUsername(signInData.un) && checkPassword(signInData.pw)) {
    const uniqueID = justDigits(signInData.un);
    mainData.currentUser = accessUserById(uniqueID, mainData.travelers);
    console.log("mainData.currentUser", mainData.currentUser);
    signInUser(uniqueID).then(loadPage()).then(showPage(tripsPage));
  }
});

// SUBMIT BOOKING INFO EVENT:
newBookingBtn.addEventListener("click", () => {
  if (checkValidDates(startDate.value, endDate.value) !== "Dates are valid") {
    return (datesError.innerText = checkValidDates(
      startDate.value,
      endDate.value
    ));
  }
  if (checkValidDates(startDate.value, endDate.value) === "Dates are valid") {
    datesError.innerText = "";
  }
  if (
    checkValidNumPassengers(numberTravelers.value) !==
    "Number of passengers is valid"
  ) {
    return (numTravelersError.innerText = checkValidNumPassengers(
      numberTravelers.value
    ));
  }
 
  if (
    checkValidNumPassengers(numberTravelers.value) ===
    "Number of passengers is valid"
  ) {
    numTravelersError.innerText = "";
  }
  if(!locationDropdown.value){
   return locationError.innerText = 'Please select a location'
  }

  const vacation = {
    startDate: startDate.value,
    endDate: endDate.value,
    locationName: locationDropdown.value,
    travelers: numberTravelers.value,
  };
console.log("vacation", vacation)
  mainData.pendingVacation = vacation;
  showPage(confirmationPage);
  const newDuration = calculateNumDays(
    mainData.pendingVacation.startDate,
    mainData.pendingVacation.endDate
  );
  mainData.pendingVacation.duration = newDuration;
  createNewBookingCard(
    mainData.pendingVacation,
    searchDestinationByName(vacation.locationName, mainData.destinations)
  );
  const errorElements = [locationError, numTravelersError,  datesError]
  errorElements.forEach(error => {
    error.innerText = ""
  })
  clearForm()
});

confirmBtn.addEventListener("click", () => {
  postNewTripBooking(
    mainData.currentUser,
    mainData.pendingVacation,
    searchDestinationByName(
      mainData.pendingVacation.locationName,
      mainData.destinations
    ),
    mainData
  ).then(() => {
    showPage(tripsPage);
    loadPage();
  });
});

const getUserData = () => {
  mainData.userTrips = getUserTrips(mainData.trips, mainData.currentUser.id);
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
  const pendingTrips = getPending(mainData.userTrips);
  const sortedPending = sortSequentially(pendingTrips);
  createPendingCards(sortedPending);
  createUpcomingCards(getUpcoming(mainData.userTrips));
  createPastCards(sortSequentially(getPast(mainData.userTrips)));
};

const loadPage = () => {
  getData;
  Promise.all(getData()).then((promises) => {
    mainData.trips = promises[0].trips;
    mainData.travelers = promises[1].travelers;
    mainData.destinations = promises[2].destinations;
    const signedInUser = mainData.currentUser;
    getUserData(signedInUser);
    getDescriptiveData();
    generatePage();
  });
};
