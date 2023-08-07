export const dayjs = require('dayjs');

export const getRandomCurrentUser = (travelers) => {
    const randomIndex = Math.floor(Math.random() * travelers.length);
    let currentUser = travelers[randomIndex];
    return currentUser;
  };

export const getUserTrips = (allTrips, currentUserId) => {
    const filteredTrips = allTrips.filter(trip => {
    return trip.userID === currentUserId
 })
 console.log('getUserTrips result:', filteredTrips)
 return filteredTrips
}

export const addDates = (userTrips) => {
    console.log('userTrips', userTrips)
   
    const updatedTrips = userTrips.map((trip) => {
        console.log('trip', trip)
        const startDate = dayjs(trip.date);
        const formattedStartDate = startDate.format('MM-DD-YYYY');
        const endDate = startDate.add(trip.duration, 'day');
        const formattedEndDate = endDate.format('MM-DD-YYYY');
       trip.endDate = formattedEndDate;
       trip.startDate = formattedStartDate;
       delete trip.date
       return trip
    })
    console.log('updatedTrips', updatedTrips)
    return updatedTrips
}
export const addLocationInfo = (userTrips, allDestinations) => {
    const updatedTrips = userTrips.map(trip => {
        const destination =  allDestinations.find(destination => destination.id === trip.destinationID);
          if(destination) {
            trip.locationName = destination.destination
            trip.fullDestinationInfo = destination
          }
          return trip
        })
        console.log("updated trips hi", updatedTrips)
        return updatedTrips
    };
   

export const sortTripsByDate = (userTrips) => {
   const today = dayjs();
    const updatedTrips = userTrips.map(trip => {
        let otherDate = dayjs(trip.startDate)
        if(trip.status !== "approved") {
            trip.category = "pending"
        }
        else if (otherDate.isBefore(today)) {
            trip.category = "past"
        } else if (otherDate.isAfter(today)) {
           trip.category = "upcoming"
        }
        return trip
    })
    return updatedTrips
}
export const getPending = (userTrips) => {
    const justPending = userTrips.filter(trip => trip.category === "pending");
    console.log("justPending", justPending)
    return justPending
}

export const getUpcoming = (userTrips) => {
    const justUpcoming = userTrips.filter(trip => {
        return trip.category === "upcoming" 
    })
    console.log("justUpcoming". justUpcoming)
    return justUpcoming
}
export const getPast = (userTrips) => {
    const justPast = userTrips.filter(trip => trip.category === "past" );
    console.log("justPast:", justPast)
    return justPast
}

export const getAnnualArray = (userTrips) => {
    const today = dayjs();
    const oneYearAgo = today.subtract(1, 'year');
    const pastYearData = userTrips.filter(trip => {
        const tripYear = dayjs(item.startDate).year();
        return tripYear.isBetween(lastYear, today, null, '[]');
    })
    return pastYearData
}

export const getAnnualSpending = (annualTrips) => {
    
}