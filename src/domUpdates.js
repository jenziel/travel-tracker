//Query Selectors:
export const signInButton = document.querySelector("#signin");
export const loginPage = document.querySelector(".lower-pane-1");
export const tripsPage = document.querySelector(".lower-pane-2");
export const tripsTitle = document.querySelector(".trips-header");
export const tripsTest = document.querySelector(".user-trips");
export const upcomingTrip1 = document.querySelector(".location");
export const timeline = document.querySelector(".timeline");
export const numBookings = document.querySelector(".numBookings");
export const annualSpendingMsg = document.querySelector("#annual-spending");
export const goToBookingBtn = document.querySelector("#go-to-booking-page");
export const bookingPage = document.querySelector(".lower-pane-3");
export const locationDropdown = document.getElementById("location-dropdown");
export const locationSection = document.querySelector(".location-section");
export const newBookingBtn = document.querySelector("#newBookingBtn");
export const startDate = document.getElementById("start-date");
export const endDate = document.getElementById("end-date");
export const numberTravelers = document.getElementById("num-travelers");
export const location = document.getElementById("selected-location");
export const bookingPanel = document.querySelector(".booking-panel");
export const bookingPage2 = document.querySelector(".booking-panel-2");
export const pendingTripBox = document.querySelector("#pendingTripContainer");
export const confirmBtn = document.querySelector("#confirm-btn");
export const backToBookingBtn = document.querySelector('#go-back-btn')

// Event Handlers:

// signInButton.addEventListener('click', showMainPage)

export const showMainPage = () => {
    bookingPage2.classList.add("hidden")
  // console.log( "hi" ,document.querySelectorAll('.lower-pane-1'))
  loginPage.classList.add("hidden");
  tripsPage.classList.remove("hidden");
};
export const showBookingPage = () => {
  tripsPage.classList.add("hidden");
  bookingPage.classList.remove("hidden");
};

export const updateTripsPage = (travelerName, annualSpending) => {
  tripsTitle.innerText = `${travelerName}'s Trips`;
  annualSpendingMsg.innerText = `This year you've spent $${annualSpending}.`;
};
export const createUpcomingCards = (userTrips) => {
  const upcomingContainer = document.getElementById("upcomingContainer");
  console.log("upcoming trips", userTrips);
  const cardsHTML = userTrips.reduce((html, card) => {
    console.log("html", html);
    return (html += `
            <div class="trip-card">
            <img src=${card.fullDestinationInfo.image} alt=${card.fullDestinationInfo.alt}>
             <div class="trip-info-container">
                <p class="location">${card.fullDestinationInfo.destination}</p>
                <p class="timeline">${card.startDate} - ${card.endDate}</p>
                <p class="numBookings">${card.travelers} booking(s)</p>
                <p class="total">${card.duration}
            </div>
        `);
  }, "Upcoming:");

  upcomingContainer.innerHTML = cardsHTML;
};

export const createPendingCards = (userTrips) => {
  const pendingContainer = document.getElementById("pendingContainer");
  console.log("pending trips", userTrips);
  const cardsHTML = userTrips.reduce((html, card) => {
    console.log("html", html);
    return (html += `
            <div class="trip-card">
            <img src=${card.fullDestinationInfo.image} alt=${card.fullDestinationInfo.alt}>
             <div class="trip-info-container">
                <p class="location">${card.fullDestinationInfo.destination}</p>
                <p class="timeline">${card.startDate} - ${card.endDate}</p>
                <p class="numBookings">${card.travelers} booking(s)</p>
                <p class="total">${card.duration}
            </div>
        `);
  }, "Pending:");
  pendingContainer.innerHTML = cardsHTML;
};

export const createPastCards = (userTrips) => {
  const pastContainer = document.getElementById("pastContainer");
  const cardsHTML = userTrips.reduce((html, card) => {
    return (html += `
            <div class="trip-card">
            <img src=${card.fullDestinationInfo.image} alt=${card.fullDestinationInfo.alt}>
             <div class="trip-info-container">
                <p class="location">${card.fullDestinationInfo.destination}</p>
                <p class="timeline">${card.startDate} - ${card.endDate}</p>
                <p class="numBookings">${card.travelers} booking(s)</p>
                <p class="total">$${card.duration}
            </div>
        `);
  }, "Past:");
  pastContainer.innerHTML = cardsHTML;
};

export const populateLocationDropdown = (destinations) => {
  destinations.forEach((destination) => {
    const option = document.createElement("option");
    option.value = destination.destination;
    option.textContent = destination.destination;
    locationDropdown.appendChild(option);
  });
};

export const createNewBookingCard = (booking, destinationObj) => {
const flightCost = (destinationObj.estimatedFlightCostPerPerson * booking.travelers)
const lodgingCost = (destinationObj.estimatedLodgingCostPerDay * booking.travelers * booking.duration)
const total = (flightCost + lodgingCost)
const totalPlusFees = total + (total * .1)
  console.log("booking", booking);
  pendingTripContainer.innerHTML = `
            <div class="trip-card">
            <img src=${destinationObj.image} alt=${destinationObj.alt}>
             <div class="trip-info-container">
                <p class="location">${destinationObj.destination}</p>
                <p class="timeline">${booking.startDate} - ${booking.endDate}</p>
                <p class="numBookings">${booking.travelers} booking(s)</p>
                <p class="total-days">${booking.duration} nights</p>
                <p class="total-cost">$${totalPlusFees}
            </div>
        `;
};
