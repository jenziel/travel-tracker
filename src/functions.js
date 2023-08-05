export const getUserTrips = (allTrips, currentUserId) => {
 const filteredTrips = allTrips.filter(trip => {
    return trip.userID === currentUserId
 })
 return filteredTrips
}

export const createTripCard = (userTrips, allDestinations) => {
    const newTrips = userTrips.reduce((acc, trip) => {
        acc.push({destinationID: trip.destinationID,
                startDate: trip.date,
                endDate: `${trip.date} + ${trip.duration} days`})
        return acc
    }, [])
    return newTrips
}
export const getUpcomingTrips = (userTrips) => {
    const futureTrips = userTrips.reduce((acc, trip) => {
        const tripDate = trip.date
        if (tripDate[3] < 3 ){
            return acc
        } else if (tripDate[3] === 3){
            return acc
        } else if (tripDate[3] > 3){
            acc.push(trip)
        }
        return acc
        
    }, [])
    return futureTrips
}
// export const getDestinationNums = (userTrips) => {
//     const justNums = userTrips.map(destination => {
//         return destination.id
//     })
//     return justNums
// }
export const getDestinationNames = (destinationNumbers, allDestinations) => {
    const locations = destinationNumbers.forEach(number => {
        allDestinations.find(destination => {
            return destination.id === number
        })
    })
    const locationInfo = locations.map(location => {
        return location.destination
    })
    return locationInfo
}