export const dayjs = require('dayjs');


export const getUserTrips = (allTrips, currentUserId) => {
    const filteredTrips = allTrips.filter(trip => {
    return trip.userID === currentUserId
 })
 return filteredTrips
}

export const addDates = (userTrips) => {
    const updatedTrips = userTrips.map((trip) => {
        const startDate = dayjs(trip.date);
        const formattedStartDate = startDate.format('MM-DD-YYYY');
        const endDate = startDate.add(trip.duration, 'day');
        const formattedEndDate = endDate.format('MM-DD-YYYY');
       trip.endDate = formattedEndDate;
       trip.startDate = formattedStartDate;
       delete trip.date
       return trip
    })
    return updatedTrips
}
export const sortSequentially = (updatedTrips) => {
    const sortedByClosestDate = updatedTrips.sort((a,b) =>{
        const startDateA = dayjs(a.startDate)
        const startDateB = dayjs(b.startDate)
        return startDateA.diff(startDateB, 'day')
    })
    return sortedByClosestDate
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
    return justPending
}

export const getUpcoming = (userTrips) => {
    const justUpcoming = userTrips.filter(trip => {
        return trip.category === "upcoming" 
    })
    return justUpcoming
}
export const getPast = (userTrips) => {
    const justPast = userTrips.filter(trip => trip.category === "past" );
    return justPast
}

export const getAnnualArray = (userTrips) => {
    const today = dayjs();
    const oneYearAgo = today.subtract(1, 'year');
    const pastYearData = userTrips.filter(trip => {
        const tripDate = dayjs(trip.startDate);
        return tripDate.isAfter(oneYearAgo) && tripDate.isBefore(today);
    })
    return pastYearData
}

export const getAnnualSpending = (annualTrips) => {
    const annualCost = annualTrips.reduce((sum, trip) => { 
        const numDays = trip.duration;
        const numBookings = trip.travelers;
        const dailyHotelCost = trip.fullDestinationInfo.estimatedLodgingCostPerDay;
        const roundTripFlight = trip.fullDestinationInfo.estimatedFlightCostPerPerson;
        const flightsTotal = (roundTripFlight * numBookings) 
        const lodgingsTotal = (numDays * dailyHotelCost) * numBookings 
        const totalBeforeTax = (flightsTotal) + (lodgingsTotal);
        const AllFeesIncluded = (totalBeforeTax * .1) + totalBeforeTax;
        sum += AllFeesIncluded;
        return sum
    }, 0)
    const dollarAmtFormat =  annualCost.toFixed(2)
    const convertedToNum = parseFloat(dollarAmtFormat)
    return convertedToNum
}
export const searchDestinationByName = (locationName, destinations) => {
    const destinationObject = destinations.find(destination => 
        destination.destination === locationName)
        return destinationObject
 }

 export const calculateNumDays = (startDate, endDate) => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const numDays = end.diff(start, 'day');
    return numDays
 }

 export const accessUserById = (uniqueID, travelers) => {
    const travelerObject = travelers.find(traveler => 
        traveler.id === uniqueID)
        return travelerObject
 }

 export const checkForValidUsername = (username) => {
    if (typeof username !== 'string' || username.length < 9) {
        return false
    }
    const firstPart = username.slice(0, 8);
    if(firstPart !== 'traveler') {
        return false
    }
    const secondPart = username.slice(8);
    if (secondPart.length > 2) {
        return false
    }
    const remainingNumber = Number(secondPart);
    if(isNaN(secondPart) || remainingNumber > 50 || remainingNumber === 0){
        return false
    }
    return true
  }
  export const checkPassword = (password) => {
    if (password === 'traveler'){
        return true
    }
    else return false
  }

  export const checkValidDates = (startDate, endDate) => {
    const today = dayjs();
    const parsedStartDate = dayjs(startDate);
    const parsedEndDate = dayjs(endDate);

  if (!parsedStartDate.isValid() || !parsedEndDate.isValid()) {
    return 'Invalid dates';
  }

  if (parsedStartDate.isAfter(parsedEndDate)) {
    return 'Start date must be before end date';
  }

  if (parsedStartDate.isBefore(today)) {
    return 'Start date cannot be in the past';
  }

  return 'Dates are valid';
}

export const checkValidNumPassengers = (number) => {
    if (number < 1 || number > 14){
        return 'Please enter a number between 1 and 14.'
    }
    return 'Number of passengers is valid'
}