//Query Selectors:

//PAGES:
export const loginPage = document.querySelector(".lower-pane-1");
export const tripsPage = document.querySelector(".lower-pane-2");
export const bookingPage = document.querySelector(".lower-pane-3");
export const confirmationPage = document.querySelector(".booking-panel-2");
export const allPages = document.querySelectorAll('.page')

//BUTTONS:
export const signInButton = document.querySelector("#signin");
export const newBookingBtn = document.querySelector("#newBookingBtn");
export const confirmBtn = document.querySelector("#confirm-btn");
export const backToBookingBtn = document.querySelector('#go-back-btn')
export const tripsHeaderBtn = document.querySelector(".trips")

//INPUTS:
export const userName = document.querySelector('#username')
export const passWord = document.querySelector('#current-password')
export const selectedLocation = document.getElementById('selected-location')
//ERROR MESSAGES
export const datesError = document.querySelector(".dates-error")
export const numTravelersError = document.querySelector(".numTravelersError")
export const usernameError = document.querySelector(".username-error")
export const passwordError = document.querySelector(".password-error")
export const locationError = document.querySelector(".location-error")

export const tripsTitle = document.querySelector(".trips-header");
export const tripsTest = document.querySelector(".user-trips");
export const upcomingTrip1 = document.querySelector(".location");
export const timeline = document.querySelector(".timeline");
export const numBookings = document.querySelector(".numBookings");
export const annualSpendingMsg = document.querySelector("#annual-spending");
export const goToBookingBtn = document.querySelector("#go-to-booking-page");
export const locationDropdown = document.getElementById("location-dropdown");
export const locationSection = document.querySelector(".location-section");
export const startDate = document.getElementById("start-date");
export const endDate = document.getElementById("end-date");
export const numberTravelers = document.getElementById("num-travelers");
export const location = document.getElementById("selected-location");
export const bookingPanel = document.querySelector(".booking-panel");
export const pendingTripBox = document.querySelector("#pendingTripContainer");

// Event Handlers:

export const showPage = (desiredPage) => {
    const pagesArray = Array.from(allPages);
    const currentPage = pagesArray.find(page => !page.classList.contains('hidden'))
    currentPage.classList.add("hidden")
    desiredPage.classList.remove("hidden")
}

export const updateTripsPage = (travelerName, annualSpending) => {
  tripsTitle.innerText = `${travelerName}'s Trips`;
  annualSpendingMsg.innerText = `This year you've spent $${annualSpending}.`;
};
export const createUpcomingCards = (userTrips) => {
  const upcomingContainer = document.getElementById("upcomingContainer");
  const cardsHTML = userTrips.reduce((html, card) => {

    const flightCost = (card.fullDestinationInfo.estimatedFlightCostPerPerson * card.travelers)
    const lodgingCost = (card.fullDestinationInfo.estimatedLodgingCostPerDay * card.travelers * card.duration)
    const total = (flightCost + lodgingCost)
    const totalPlusFees = total + (total * .1)
    let bookingQty = ' booking'
    if (card.travelers > 1){
        bookingQty = ' bookings'
    }
    return (html += `
            <div class="trip-card">
            <img src=${card.fullDestinationInfo.image} alt=${card.fullDestinationInfo.alt}>
             <div class="trip-info-container">
                <p class="location">${card.fullDestinationInfo.destination}</p>
                <p class="timeline">${card.startDate} - ${card.endDate}</p>
                <p class="numBookings">${card.travelers}${bookingQty}</p>
                <p class="total-nights">${card.duration} nights</p>
                <p class="total-cost">$${totalPlusFees}
            </div>
        `);
  }, "Upcoming:");
  upcomingContainer.innerHTML = cardsHTML;
};

export const createPendingCards = (userTrips) => {
  const pendingContainer = document.getElementById("pendingContainer");
  const cardsHTML = userTrips.reduce((html, card) => {
    const flightCost = (card.fullDestinationInfo.estimatedFlightCostPerPerson * card.travelers)
    const lodgingCost = (card.fullDestinationInfo.estimatedLodgingCostPerDay * card.travelers * card.duration)
    const total = (flightCost + lodgingCost)
    const totalPlusFees = total + (total * .1)
    let bookingQty = ' booking'
    if (card.travelers > 1){
        bookingQty = ' bookings'
    }
    return (html += `
            <div class="trip-card">
            <img src=${card.fullDestinationInfo.image} alt=${card.fullDestinationInfo.alt}>
             <div class="trip-info-container">
                <p class="location">${card.fullDestinationInfo.destination}</p>
                <p class="timeline">${card.startDate} - ${card.endDate}</p>
                <p class="numBookings">${card.travelers}${bookingQty}</p>
                <p class="total-nights">${card.duration} nights</p>
                <p class="total-cost">$${totalPlusFees}
            </div>
        `);
  }, "Pending:");
  pendingContainer.innerHTML = cardsHTML;
};

export const createPastCards = (userTrips) => {
  const pastContainer = document.getElementById("pastContainer");
  const cardsHTML = userTrips.reduce((html, card) => {
    const flightCost = (card.fullDestinationInfo.estimatedFlightCostPerPerson * card.travelers)
    const lodgingCost = (card.fullDestinationInfo.estimatedLodgingCostPerDay * card.travelers * card.duration)
    const total = (flightCost + lodgingCost)
    const totalPlusFees = total + (total * .1)
    let bookingQty = ' booking'
    if (card.travelers > 1){
        bookingQty = ' bookings'
    }
    return (html += `
            <div class="trip-card">
            <img src=${card.fullDestinationInfo.image} alt=${card.fullDestinationInfo.alt}>
             <div class="trip-info-container">
                <p class="location">${card.fullDestinationInfo.destination}</p>
                <p class="timeline">${card.startDate} - ${card.endDate}</p>
                <p class="numBookings">${card.travelers}${bookingQty}</p>
                <p class="total-nights">${card.duration} nights</p>
                <p class="total-cost">$${totalPlusFees}
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
    const flightCost = (destinationObj.estimatedFlightCostPerPerson * booking.travelers);
    const lodgingCost = (destinationObj.estimatedLodgingCostPerDay * booking.travelers * booking.duration);
    const total = (flightCost + lodgingCost);
    const totalPlusFees = total + (total * .1);
  pendingTripContainer.innerHTML = `
            <div class="trip-card">
            <img src=${destinationObj.image} alt=${destinationObj.alt}>
             <div class="trip-info-container">
                <p class="location">${destinationObj.destination}</p>
                <p class="timeline">${booking.startDate} - ${booking.endDate}</p>
                <p class="numBookings">${booking.travelers} booking(s)</p>
                <p class="total-nights">${booking.duration} nights</p>
                <p class="total-cost">$${totalPlusFees}
            </div>
        `;
};
