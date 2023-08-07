import chai from 'chai';
const expect = chai.expect;

import {getUserTrips,
  addDates,
  addLocationInfo,
  sortTripsByDate,
  getAnnualArray} 
from '../src/functions.js';

describe('See if the tests are running', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });
});

describe('Should filter a user\'s trip from all trips data', function(){
  let allTripsData;
  let currentUser;
  let currentUser2;

  beforeEach(() => {
    allTripsData = [
      {
      "id": 1,
      "userID": 44,
      "destinationID": 49,
      "travelers": 1,
      "date": "2022/09/16",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": []
      },
      {
      "id": 2,
      "userID": 35,
      "destinationID": 25,
      "travelers": 5,
      "date": "2022/10/04",
      "duration": 18,
      "status": "approved",
      "suggestedActivities": []
      },
      {
        "id": 161,
        "userID": 44,
        "destinationID": 48,
        "travelers": 6,
        "date": "2020/08/13",
        "duration": 15,
        "status": "approved",
        "suggestedActivities": []
        }];

      currentUser = {
        "id": 44,
        "name": "Marijo MacNeilley",
        "travelerType": "photographer"
        };

      currentUser2 = {
          "id": 35,
          "name": "Lorilyn Barlowe",
          "travelerType": "shopper"
        };
  });

  it('should return an array of all trips booked by a user', function() {
    expect(getUserTrips(allTripsData, currentUser.id)).to.deep.equal(
      [
        {
          "id": 1,
          "userID": 44,
          "destinationID": 49,
          "travelers": 1,
          "date": "2022/09/16",
          "duration": 8,
          "status": "approved",
          "suggestedActivities": []
        },
         {
        "id": 161,
        "userID": 44,
        "destinationID": 48,
        "travelers": 6,
        "date": "2020/08/13",
        "duration": 15,
        "status": "approved",
        "suggestedActivities": []
        }
      ]
    )
    expect(getUserTrips(allTripsData, currentUser2.id)).to.deep.equal(
      [  {
        "id": 2,
        "userID": 35,
        "destinationID": 25,
        "travelers": 5,
        "date": "2022/10/04",
        "duration": 18,
        "status": "approved",
        "suggestedActivities": []
        }]
    )
    })
  })

describe('it should integrate destination data with the trip data', function(){
  let allTripsData;
  let currentUser;
  let currentUser2;
  let allDestinationsData;
  let userTrips1;
  let userTrips2;
  beforeEach(() => {
    allTripsData = [
      {
      "id": 1,
      "userID": 44,
      "destinationID": 49,
      "travelers": 1,
      "date": "2022/09/16",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": []
      },
      {
      "id": 2,
      "userID": 35,
      "destinationID": 25,
      "travelers": 5,
      "date": "2022/10/04",
      "duration": 18,
      "status": "approved",
      "suggestedActivities": []
      },
      {
        "id": 161,
        "userID": 44,
        "destinationID": 48,
        "travelers": 6,
        "date": "2020/08/13",
        "duration": 15,
        "status": "approved",
        "suggestedActivities": []
        }];

      currentUser = {
        "id": 44,
        "name": "Marijo MacNeilley",
        "travelerType": "photographer"
        };

      currentUser2 = {
          "id": 35,
          "name": "Lorilyn Barlowe",
          "travelerType": "shopper"
        };
        allDestinationsData = [{
          "id": 48,
          "destination": "Dar es Salaam, Tanzania",
          "estimatedLodgingCostPerDay": 1200,
          "estimatedFlightCostPerPerson": 100,
          "image": "https://images.unsplash.com/photo-1568625502763-2a5ec6a94c47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
          "alt": "aerial photography of high-rise building"
          },
          {
            "id": 25,
            "destination": "New York, New York",
            "estimatedLodgingCostPerDay": 175,
            "estimatedFlightCostPerPerson": 200,
            "image": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
            "alt": "people crossing the street during the day surrounded by tall buildings and advertisements"
            },
            {
              "id": 49,
              "destination": "Castries, St Lucia",
              "estimatedLodgingCostPerDay": 650,
              "estimatedFlightCostPerPerson": 90,
              "image": "https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
              "alt": "aerial photography of rocky mountain under cloudy sky"
              }
        ]
        userTrips1 = [
          {
            id: 1,
            userID: 44,
            destinationID: 49,
            travelers: 1,
            date: '2022/09/16',
            duration: 8,
            status: 'approved',
            suggestedActivities: []
          },
          {
            id: 161,
            userID: 44,
            destinationID: 48,
            travelers: 6,
            date: '2020/08/13',
            duration: 15,
            status: 'approved',
            suggestedActivities: []
          }
        ]
        userTrips2 = [
          {
            id: 2,
            userID: 35,
            destinationID: 25,
            travelers: 5,
            date: '2022/10/04',
            duration: 18,
            status: 'approved',
            suggestedActivities: []
          }
        ]
  });


  it('it should generate an end-date', function(){
    expect(addDates(userTrips2)).to.deep.equal(
      [  {
        "id": 2,
        "userID": 35,
        "destinationID": 25,
        "travelers": 5,
        "startDate": "10-04-2022",
        "duration": 18,
        "endDate": "10-22-2022",
        "status": "approved",
        "suggestedActivities": []
        }])
      }
)

it('Should add descriptive locations', function(){
  let formattedUserTrips = addDates(userTrips2)
  expect(addLocationInfo(formattedUserTrips, allDestinationsData)).to.deep.equal([{
        "id": 2,
        "userID": 35,
        "destinationID": 25,
        "travelers": 5,
        "duration": 18,
        "fullDestinationInfo": {
              "alt": "people crossing the street during the day surrounded by tall buildings and advertisements",
              "destination": "New York, New York",
              "estimatedFlightCostPerPerson": 200,
              "estimatedLodgingCostPerDay": 175,
              "id": 25,
              "image": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        },
        "endDate": "10-22-2022",
        "locationName": "New York, New York",
        "startDate": "10-04-2022",
        "status": "approved",
        "suggestedActivities": []
  }])
})

it('Should add a \'category\' key to describe past, pending, upcoming', function(){
  let formattedUserTrips = addDates(userTrips2);
  let tripsWithLocations = addLocationInfo(formattedUserTrips, allDestinationsData);
  expect(sortTripsByDate(tripsWithLocations)).to.deep.equal([{
    "id": 2,
    "userID": 35,
    "category": "past",
    "destinationID": 25,
    "travelers": 5,
    "duration": 18,
    "fullDestinationInfo": {
          "alt": "people crossing the street during the day surrounded by tall buildings and advertisements",
          "destination": "New York, New York",
          "estimatedFlightCostPerPerson": 200,
          "estimatedLodgingCostPerDay": 175,
          "id": 25,
          "image": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    },
    "endDate": "10-22-2022",
    "locationName": "New York, New York",
    "startDate": "10-04-2022",
    "status": "approved",
    "suggestedActivities": []
}])
})
      })
describe('it should calculate the total cost spent for a given year', function(){
  it('should return an array of trips booked within a year', function(){
    let userTrips = [{category: "past",
    destinationID: 33,
    duration: 6,
    endDate: "10-23-2022",
    fullDestinationInfo: {id: 33, destination: 'Brussels, Belgium', estimatedLodgingCostPerDay: 1000, estimatedFlightCostPerPerson: 110, image: 'https://images.unsplash.com/photo-1559113202-c916b…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'},
    id: 12,
    locationName: "Brussels, Belgium",
    startDate: "10-17-2022",
    status: "approved",
    suggestedActivities: [],
    travelers: 6,
    userID: 33},
    {
    category: "past",
    destinationID: 29,
    duration: 5,
    endDate: "07-22-2020",
    fullDestinationInfo: {id: 29, destination: 'Willemstad, Curaçao', estimatedLodgingCostPerDay: 80, estimatedFlightCostPerPerson: 1100, image: 'https://images.unsplash.com/photo-1541748603027-cb…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80'},
    id: 30,
    locationName: "Willemstad, Curaçao",
    startDate: "07-17-2020",
    status: "approved",
    suggestedActivities: [],
    travelers: 1,
    userID: 33
    }]
    expect(getAnnualArray(userTrips)).to.deep.equal([{
      category: "past",
      destinationID: 33,
      duration: 6,
      endDate: "10-23-2022",
      fullDestinationInfo: {id: 33, destination: 'Brussels, Belgium', estimatedLodgingCostPerDay: 1000, estimatedFlightCostPerPerson: 110, image: 'https://images.unsplash.com/photo-1559113202-c916b…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'},
      id: 12,
      locationName: "Brussels, Belgium",
      startDate: "10-17-2022",
      status: "approved",
      suggestedActivities: [],
      travelers: 6,
      userID: 33}])
  })
  
})


