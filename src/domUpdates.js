//Query Selectors:
export const signInButton = document.querySelector('#signin')
export const loginPage = document.querySelector('.lower-pane-1')
export const tripsPage = document.querySelector('.lower-pane-2')
export const tripsTitle = document.querySelector('.trips-header')
export const tripsTest = document.querySelector('.user-trips')
export const upcomingTrip1 = document.querySelector('.location')
export const timeline = document.querySelector('.timeline')
export const numBookings = document.querySelector('.numBookings')
export const annualSpendingMsg = document.querySelector('#annual-spending')
export const goToBookingBtn = document.querySelector('#go-to-booking-page')
export const bookingPage = document.querySelector('.lower-pane-3')
export const locationInput = document.getElementById('location-input');
export const locationList = document.getElementById('location-list');
export const accordionBtn = document.getElementById('accordion-btn');
// Event Handlers:

// signInButton.addEventListener('click', showMainPage)

export const showMainPage = () => {

    // console.log( "hi" ,document.querySelectorAll('.lower-pane-1'))
    loginPage.classList.add('hidden');
    tripsPage.classList.remove('hidden');
}
export const showBookingPage = () => {
    tripsPage.classList.add('hidden')
    bookingPage.classList.remove('hidden')
}

export const updateTripsPage = (travelerName, annualSpending) => {
    tripsTitle.innerText = `${travelerName}'s Trips`;
    annualSpendingMsg.innerText = `This year you've spent $${annualSpending}.`
}
export const createUpcomingCards = (userTrips) => {
    const upcomingContainer = document.getElementById('upcomingContainer');
    console.log('upcoming trips', userTrips)
    const cardsHTML = userTrips.reduce((html, card) => {
        console.log("html", html)
        return html += `
            <div class="trip-card">
            <img src=${card.fullDestinationInfo.image} alt=${card.fullDestinationInfo.alt}>
             <div class="trip-info-container">
                <p class="location">${card.fullDestinationInfo.destination}</p>
                <p class="timeline">${card.startDate} - ${card.endDate}</p>
                <p class="numBookings">${card.travelers} booking(s)</p>
                <p class="total">${card.duration}
            </div>
        `;
    }, 'Upcoming:');
    
    upcomingContainer.innerHTML = cardsHTML;
}
export const createPendingCards = (userTrips) => {
    const pendingContainer = document.getElementById('pendingContainer');
    console.log('pending trips', userTrips)
    const cardsHTML = userTrips.reduce((html, card) => {
        console.log("html", html)
        return html += `
            <div class="trip-card">
            <img src=${card.fullDestinationInfo.image} alt=${card.fullDestinationInfo.alt}>
             <div class="trip-info-container">
                <p class="location">${card.fullDestinationInfo.destination}</p>
                <p class="timeline">${card.startDate} - ${card.endDate}</p>
                <p class="numBookings">${card.travelers} booking(s)</p>
                <p class="total">${card.duration}
            </div>
        `;
    }, 'Pending:');
    pendingContainer.innerHTML = cardsHTML;
}

export const createPastCards = (userTrips) => {
    const pastContainer = document.getElementById('pastContainer');
    console.log('user trips', userTrips)
    const cardsHTML = userTrips.reduce((html, card) => {
        console.log("html", html)
        return html += `
            <div class="trip-card">
            <img src=${card.fullDestinationInfo.image} alt=${card.fullDestinationInfo.alt}>
             <div class="trip-info-container">
                <p class="location">${card.fullDestinationInfo.destination}</p>
                <p class="timeline">${card.startDate} - ${card.endDate}</p>
                <p class="numBookings">${card.travelers} booking(s)</p>
                <p class="total">$${card.duration}
            </div>
        `;
    }, 'Past:');
    pastContainer.innerHTML = cardsHTML;
  
}

export const populateLocationDropdown = (destinations) => {
    const locationListUl = locationList.querySelector('ul');
    locationListUl.innerHTML = '';
    destinations.forEach(destination => {
      const listItem = document.createElement('li');
      listItem.textContent = destination.destination;
      listItem.addEventListener('click', () => {
        accordionBtn.textContent = destination.destination;
        locationList.style.display = 'none';
      });
      locationListUl.appendChild(listItem);
    });
  }
  


