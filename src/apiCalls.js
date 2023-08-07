console.log('fetch requests go here')
const tripsUrl = 'http://localhost:3001/api/v1/trips'
const travelersUrl = 'http://localhost:3001/api/v1/travelers'
// const specificTravelersUrl = 'http://localhost:3001/api/v1/travelers/<id>'
const destinationsUrl = 'http://localhost:3001/api/v1/destinations'
const newTripUrl = 'http://localhost:3001/api/v1/trips'
const endpoints = [tripsUrl, travelersUrl, destinationsUrl]

export const getData = () => {
    console.log('fetch requests go here 2')
    return endpoints.map((url) =>
    fetch(url)
    .then(response => response.json())
    .catch((error) => console.log(error))
    )
}
export const postNewTripBooking = (currentUser , input, today) => {
    console.log('post requests go here')
    let booking = {id: Date.now(),
         userID: currentUser.id,
             destinationID: 0,
                 travelers: 1,
                     date: 'YYYY/MM/DD',
                      duration: 1,
                         status: 'pending',
                          suggestedActivities: []}; 

    return fetch(newTripUrl, {
        method: 'POST',
        body: JSON.stringify(booking),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(generatePage())
        .catch((error) => {
        console.log(error);
        throw error;
    })
}