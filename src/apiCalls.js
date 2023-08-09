console.log("fetch requests go here");
const tripsUrl = "http://localhost:3001/api/v1/trips";
const travelersUrl = "http://localhost:3001/api/v1/travelers";
const specificTravelersUrl = `http://localhost:3001/api/v1/travelers/50`;
const destinationsUrl = "http://localhost:3001/api/v1/destinations";
const newTripUrl = "http://localhost:3001/api/v1/trips";
const endpoints = [tripsUrl, travelersUrl, destinationsUrl];
import dayjs from "dayjs";


export const getData = () => {
  console.log("fetch requests go here 2");
  return endpoints.map((url) =>
    fetch(url)
      .then((response) => response.json())
      .catch((error) => console.log(error))
  );
};


export const postNewTripBooking = (
  currentUser,
  bookingObj,
  destinationObj,
) => {
  const parsedDate = dayjs(bookingObj.startDate, "YYYY-MM-DD");
  const formattedDate = parsedDate.format("YYYY/MM/DD");
  let booking = {
    id: Date.now(),
    userID: parseInt(currentUser.id),
    destinationID: parseInt(destinationObj.id),
    locationName: bookingObj.locationName,
    travelers: parseInt(bookingObj.travelers),
    date: formattedDate,
    duration: bookingObj.duration,
    status: "pending",
    suggestedActivities: [],
  };
  return (
    fetch(newTripUrl, {
      method: "POST",
      body: JSON.stringify(booking),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed status: ${response.status}");
        }
        return response.json();
      })
      .then((data) => {
        console.log("response data:", data);
      })
      // .then(generatePage())
      .catch((error) => {
        console.log("Request error:", error);
        throw error;
      })
  );
};

export const signInUser = (id) => {
  console.log("sign in fetch request:");
  return fetch(`http://localhost:3001/api/v1/travelers/${id}`)
    .then((response) => {
      if (!response.status === 404) {
        throw new Error("Username not found");
      }
      return response.json();
    }).then((userObj) => {
    console.log('user object from fetch call', userObj)
    })
    .catch((error) => console.log(error));
};
