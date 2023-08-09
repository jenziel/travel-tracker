import chai from "chai";
const expect = chai.expect;

import {
  getUserTrips,
  addDates,
  addLocationInfo,
  sortTripsByDate,
  getAnnualArray,
  searchDestinationByName,
  calculateNumDays,
  sortSequentially,
  accessUserById,
  getAnnualSpending,
  getPast,
  getPending,
  getUpcoming,
  checkForValidUsername,
  checkPassword,
  checkValidDates,
  checkValidNumPassengers
} from "../src/functions.js";

describe("See if the tests are running", function () {
  it("should return true", function () {
    expect(true).to.equal(true);
  });
});

describe("Should filter a user's trip from all trips data", function () {
  let allTripsData;
  let currentUser;
  let currentUser2;

  beforeEach(() => {
    allTripsData = [
      {
        id: 1,
        userID: 44,
        destinationID: 49,
        travelers: 1,
        date: "2022/09/16",
        duration: 8,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 2,
        userID: 35,
        destinationID: 25,
        travelers: 5,
        date: "2022/10/04",
        duration: 18,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 161,
        userID: 44,
        destinationID: 48,
        travelers: 6,
        date: "2020/08/13",
        duration: 15,
        status: "approved",
        suggestedActivities: [],
      },
    ];

    currentUser = {
      id: 44,
      name: "Marijo MacNeilley",
      travelerType: "photographer",
    };

    currentUser2 = {
      id: 35,
      name: "Lorilyn Barlowe",
      travelerType: "shopper",
    };
  });

  it("should return an array of all trips booked by a user", function () {
    expect(getUserTrips(allTripsData, currentUser.id)).to.deep.equal([
      {
        id: 1,
        userID: 44,
        destinationID: 49,
        travelers: 1,
        date: "2022/09/16",
        duration: 8,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 161,
        userID: 44,
        destinationID: 48,
        travelers: 6,
        date: "2020/08/13",
        duration: 15,
        status: "approved",
        suggestedActivities: [],
      },
    ]);
    expect(getUserTrips(allTripsData, currentUser2.id)).to.deep.equal([
      {
        id: 2,
        userID: 35,
        destinationID: 25,
        travelers: 5,
        date: "2022/10/04",
        duration: 18,
        status: "approved",
        suggestedActivities: [],
      },
    ]);
  });
  it("should have a function to calculate the spending within the last year", function () {
    let tripsWithinAYear = [
      {
        category: "pending",
        destinationID: 14,
        duration: 3,
        endDate: "05-08-2023",
        fullDestinationInfo: {
          id: 14,
          destination: "Marrakesh, Morocco",
          estimatedLodgingCostPerDay: 70,
          estimatedFlightCostPerPerson: 830,
          image:
            "https://images.unsplash.com/photo-1517821362941-f7…f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80",
        },
        id: 1691544548090,
        locationName: "Marrakesh, Morocco",
        startDate: "05-05-2023",
        status: "pending",
        suggestedActivities: [],
        travelers: 1,
        userID: 6,
      },
      {
        category: "pending",
        destinationID: 24,
        duration: 5,
        endDate: "03-14-2023",
        fullDestinationInfo: {
          id: 24,
          destination: "Vilnius, Lithuania",
          estimatedLodgingCostPerDay: 65,
          estimatedFlightCostPerPerson: 1100,
          image:
            "https://images.unsplash.com/photo-1549891472-991e6…e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80",
        },
        id: 1691544575820,
        locationName: "Vilnius, Lithuania",
        startDate: "03-09-2023",
        status: "pending",
        suggestedActivities: [],
        travelers: 1,
        userID: 6,
      },
      {
        category: "pending",
        destinationID: 1,
        duration: 4,
        endDate: "01-05-2023",
        fullDestinationInfo: {
          id: 1,
          destination: "Lima, Peru",
          estimatedLodgingCostPerDay: 70,
          estimatedFlightCostPerPerson: 400,
          image:
            "https://images.unsplash.com/photo-1489171084589-9b…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
        },
        id: 1691544605749,
        locationName: "Lima, Peru",
        startDate: "01-01-2023",
        status: "pending",
        suggestedActivities: [],
        travelers: 1,
        userID: 6,
      },
    ];
    expect(getAnnualSpending(tripsWithinAYear)).to.deep.equal(3459.5);
  });
});

describe("it should integrate destination data with the trip data", function () {
  let allTripsData;
  let currentUser;
  let currentUser2;
  let allDestinationsData;
  let userTrips1;
  let userTrips2;
  beforeEach(() => {
    allTripsData = [
      {
        id: 1,
        userID: 44,
        destinationID: 49,
        travelers: 1,
        date: "2022/09/16",
        duration: 8,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 2,
        userID: 35,
        destinationID: 25,
        travelers: 5,
        date: "2022/10/04",
        duration: 18,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 161,
        userID: 44,
        destinationID: 48,
        travelers: 6,
        date: "2020/08/13",
        duration: 15,
        status: "approved",
        suggestedActivities: [],
      },
    ];

    currentUser = {
      id: 44,
      name: "Marijo MacNeilley",
      travelerType: "photographer",
    };

    currentUser2 = {
      id: 35,
      name: "Lorilyn Barlowe",
      travelerType: "shopper",
    };
    allDestinationsData = [
      {
        id: 48,
        destination: "Dar es Salaam, Tanzania",
        estimatedLodgingCostPerDay: 1200,
        estimatedFlightCostPerPerson: 100,
        image:
          "https://images.unsplash.com/photo-1568625502763-2a5ec6a94c47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
        alt: "aerial photography of high-rise building",
      },
      {
        id: 25,
        destination: "New York, New York",
        estimatedLodgingCostPerDay: 175,
        estimatedFlightCostPerPerson: 200,
        image:
          "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "people crossing the street during the day surrounded by tall buildings and advertisements",
      },
      {
        id: 49,
        destination: "Castries, St Lucia",
        estimatedLodgingCostPerDay: 650,
        estimatedFlightCostPerPerson: 90,
        image:
          "https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
        alt: "aerial photography of rocky mountain under cloudy sky",
      },
    ];
    userTrips1 = [
      {
        id: 1,
        userID: 44,
        destinationID: 49,
        travelers: 1,
        date: "2022/09/16",
        duration: 8,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 161,
        userID: 44,
        destinationID: 48,
        travelers: 6,
        date: "2020/08/13",
        duration: 15,
        status: "approved",
        suggestedActivities: [],
      },
    ];
    userTrips2 = [
      {
        id: 2,
        userID: 35,
        destinationID: 25,
        travelers: 5,
        date: "2022/10/04",
        duration: 18,
        status: "approved",
        suggestedActivities: [],
      },
    ];
  });

  it("it should generate an end-date", function () {
    expect(addDates(userTrips2)).to.deep.equal([
      {
        id: 2,
        userID: 35,
        destinationID: 25,
        travelers: 5,
        startDate: "10-04-2022",
        duration: 18,
        endDate: "10-22-2022",
        status: "approved",
        suggestedActivities: [],
      },
    ]);
  });

  it("Should add descriptive locations", function () {
    let formattedUserTrips = addDates(userTrips2);
    expect(
      addLocationInfo(formattedUserTrips, allDestinationsData)
    ).to.deep.equal([
      {
        id: 2,
        userID: 35,
        destinationID: 25,
        travelers: 5,
        duration: 18,
        fullDestinationInfo: {
          alt: "people crossing the street during the day surrounded by tall buildings and advertisements",
          destination: "New York, New York",
          estimatedFlightCostPerPerson: 200,
          estimatedLodgingCostPerDay: 175,
          id: 25,
          image:
            "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        },
        endDate: "10-22-2022",
        locationName: "New York, New York",
        startDate: "10-04-2022",
        status: "approved",
        suggestedActivities: [],
      },
    ]);
  });

  it("Should add a 'category' key to describe past, pending, upcoming", function () {
    let formattedUserTrips = addDates(userTrips2);
    let tripsWithLocations = addLocationInfo(
      formattedUserTrips,
      allDestinationsData
    );
    expect(sortTripsByDate(tripsWithLocations)).to.deep.equal([
      {
        id: 2,
        userID: 35,
        category: "past",
        destinationID: 25,
        travelers: 5,
        duration: 18,
        fullDestinationInfo: {
          alt: "people crossing the street during the day surrounded by tall buildings and advertisements",
          destination: "New York, New York",
          estimatedFlightCostPerPerson: 200,
          estimatedLodgingCostPerDay: 175,
          id: 25,
          image:
            "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        },
        endDate: "10-22-2022",
        locationName: "New York, New York",
        startDate: "10-04-2022",
        status: "approved",
        suggestedActivities: [],
      },
    ]);
  });
});

describe("should calculate the total cost spent for a given year", function () {
  let userTrips;
  beforeEach(() => {
    userTrips = [
      {
        category: "past",
        destinationID: 33,
        duration: 6,
        endDate: "10-23-2022",
        fullDestinationInfo: {
          id: 33,
          destination: "Brussels, Belgium",
          estimatedLodgingCostPerDay: 1000,
          estimatedFlightCostPerPerson: 110,
          image:
            "https://images.unsplash.com/photo-1559113202-c916b…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        },
        id: 12,
        locationName: "Brussels, Belgium",
        startDate: "10-17-2022",
        status: "approved",
        suggestedActivities: [],
        travelers: 6,
        userID: 33,
      },
      {
        category: "past",
        destinationID: 29,
        duration: 5,
        endDate: "07-22-2020",
        fullDestinationInfo: {
          id: 29,
          destination: "Willemstad, Curaçao",
          estimatedLodgingCostPerDay: 80,
          estimatedFlightCostPerPerson: 1100,
          image:
            "https://images.unsplash.com/photo-1541748603027-cb…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80",
        },
        id: 30,
        locationName: "Willemstad, Curaçao",
        startDate: "07-17-2020",
        status: "approved",
        suggestedActivities: [],
        travelers: 1,
        userID: 33,
      },
    ];
  });
  it("should return an array of trips booked within a year", function () {
    expect(getAnnualArray(userTrips)).to.deep.equal([
      {
        category: "past",
        destinationID: 33,
        duration: 6,
        endDate: "10-23-2022",
        fullDestinationInfo: {
          id: 33,
          destination: "Brussels, Belgium",
          estimatedLodgingCostPerDay: 1000,
          estimatedFlightCostPerPerson: 110,
          image:
            "https://images.unsplash.com/photo-1559113202-c916b…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        },
        id: 12,
        locationName: "Brussels, Belgium",
        startDate: "10-17-2022",
        status: "approved",
        suggestedActivities: [],
        travelers: 6,
        userID: 33,
      },
    ]);
  });
});

describe("should search for a destination object by destination name", function () {
  let destinations1;
  beforeEach(() => {
    destinations1 = [
      {
        id: 1,
        destination: "Lima, Peru",
        estimatedLodgingCostPerDay: 70,
        estimatedFlightCostPerPerson: 400,
        image:
          "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
        alt: "overview of city buildings with a clear sky",
      },
      {
        id: 33,
        destination: "Brussels, Belgium",
        estimatedLodgingCostPerDay: 1000,
        estimatedFlightCostPerPerson: 110,
        image:
          "https://images.unsplash.com/photo-1559113202-c916b8e44373?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "brown concrete gate",
      },
    ];
  });
  it("should access and return destination object if given the destination name", function () {
    expect(
      searchDestinationByName("Brussels, Belgium", destinations1)
    ).to.deep.equal({
      id: 33,
      destination: "Brussels, Belgium",
      estimatedLodgingCostPerDay: 1000,
      estimatedFlightCostPerPerson: 110,
      image:
        "https://images.unsplash.com/photo-1559113202-c916b8e44373?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      alt: "brown concrete gate",
    });
  });
});

describe("A function to calculate number of days between 2 dates.", function () {
  it("should return a number to describe the span of time between two dates", function () {
    expect(calculateNumDays("2023-08-09", "2023-08-12")).to.equal(3);
  });
});

describe("A function to sort an array of dates sequentially", function () {
  let pendingTrips;
  beforeEach(() => {
    pendingTrips = [
      {
        category: "pending",
        destinationID: 3,
        duration: 7,
        endDate: "08-22-2023",
        fullDestinationInfo: {
          id: 3,
          destination: "Sydney, Austrailia",
          estimatedLodgingCostPerDay: 130,
          estimatedFlightCostPerPerson: 950,
          image:
            "https://images.unsplash.com/photo-1506973035872-a4…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        },
        id: 1691510116411,
        locationName: "Sydney, Austrailia",
        startDate: "08-15-2023",
        status: "pending",
        suggestedActivities: [],
        travelers: 2,
        userID: 3,
      },
      {
        category: "pending",
        destinationID: 14,
        duration: 8,
        endDate: "10-24-2023",
        fullDestinationInfo: {
          id: 14,
          destination: "Marrakesh, Morocco",
          estimatedLodgingCostPerDay: 70,
          estimatedFlightCostPerPerson: 830,
          image:
            "https://images.unsplash.com/photo-1517821362941-f7…f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80",
        },
        id: 1691514805613,
        locationName: "Marrakesh, Morocco",
        startDate: "10-16-2023",
        status: "pending",
        suggestedActivities: [],
        travelers: 4,
        userID: 3,
      },
      {
        category: "pending",
        destinationID: 4,
        duration: 7,
        endDate: "08-16-2023",
        fullDestinationInfo: {
          id: 4,
          destination: "Cartagena, Colombia",
          estimatedLodgingCostPerDay: 65,
          estimatedFlightCostPerPerson: 350,
          image:
            "https://images.unsplash.com/photo-1558029697-a7ed1…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
        },
        id: 1691509022886,
        locationName: "Cartagena, Colombia",
        startDate: "08-09-2023",
        status: "pending",
        suggestedActivities: [],
        travelers: 2,
        userID: 3,
      },
    ];
  });
  it("it should arrange an array of trips from closest to furthest away in time", function () {
    expect(sortSequentially(pendingTrips)).to.deep.equal([
      {
        category: "pending",
        destinationID: 4,
        duration: 7,
        endDate: "08-16-2023",
        fullDestinationInfo: {
          id: 4,
          destination: "Cartagena, Colombia",
          estimatedLodgingCostPerDay: 65,
          estimatedFlightCostPerPerson: 350,
          image:
            "https://images.unsplash.com/photo-1558029697-a7ed1…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
        },
        id: 1691509022886,
        locationName: "Cartagena, Colombia",
        startDate: "08-09-2023",
        status: "pending",
        suggestedActivities: [],
        travelers: 2,
        userID: 3,
      },
      {
        category: "pending",
        destinationID: 3,
        duration: 7,
        endDate: "08-22-2023",
        fullDestinationInfo: {
          id: 3,
          destination: "Sydney, Austrailia",
          estimatedLodgingCostPerDay: 130,
          estimatedFlightCostPerPerson: 950,
          image:
            "https://images.unsplash.com/photo-1506973035872-a4…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        },
        id: 1691510116411,
        locationName: "Sydney, Austrailia",
        startDate: "08-15-2023",
        status: "pending",
        suggestedActivities: [],
        travelers: 2,
        userID: 3,
      },
      {
        category: "pending",
        destinationID: 14,
        duration: 8,
        endDate: "10-24-2023",
        fullDestinationInfo: {
          id: 14,
          destination: "Marrakesh, Morocco",
          estimatedLodgingCostPerDay: 70,
          estimatedFlightCostPerPerson: 830,
          image:
            "https://images.unsplash.com/photo-1517821362941-f7…f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80",
        },
        id: 1691514805613,
        locationName: "Marrakesh, Morocco",
        startDate: "10-16-2023",
        status: "pending",
        suggestedActivities: [],
        travelers: 4,
        userID: 3,
      },
    ]);
  });
});

describe("find a user object if given an id", function () {
  let travelers;
  beforeEach(() => {
    travelers = [
      {
        id: 1,
        name: "Ham Leadbeater",
        travelerType: "relaxer",
      },
      {
        id: 2,
        name: "Rachael Vaughten",
        travelerType: "thrill-seeker",
      },
      {
        id: 3,
        name: "Sibby Dawidowitsch",
        travelerType: "shopper",
      },
    ];
  });
  it("should retrieve the corresponding user object from the travelers array", function () {
    expect(accessUserById(3, travelers)).to.deep.equal({
      id: 3,
      name: "Sibby Dawidowitsch",
      travelerType: "shopper",
    });
  });
});
describe("should have a function to filter trips for upcoming, past and present", function () {
  let userTrips;
  beforeEach(() => {
    userTrips = [
      {
        category: "past",
        destinationID: 36,
        duration: 19,
        endDate: "04-14-2020",
      },
      {
        category: "upcoming",
        destinationID: 47,
        duration: 19,
        endDate: "09-05-2023",
      },
      {
        category: "pending",
        destinationID: 14,
        duration: 3,
        endDate: "05-08-2023",
      }
    ];
  });
  it('should return only past trips', function(){
    expect(getPast(userTrips)).to.deep.equal([{
      category: "past",
      destinationID: 36,
      duration: 19,
      endDate: "04-14-2020",
    }])
  })
  it('should return only upcoming trips', function(){
    expect(getUpcoming(userTrips)).to.deep.equal([{

        category: "upcoming",
        destinationID: 47,
        duration: 19,
        endDate: "09-05-2023"
    }])
  })
  it('should return only past trips', function(){
    expect(getPending(userTrips)).to.deep.equal([{
      category: "pending",
      destinationID: 14,
      duration: 3,
      endDate: "05-08-2023",
    }])
  })
});
describe(' functions to validate login input', function(){
  it('should not allow usernames with the last 2 digits exceeding 50', function(){
    expect(checkForValidUsername('traveler55')).to.equal(false)
    expect(checkForValidUsername('traveler50')).to.equal(true)
  })
  it('should check for a minimum length of 9 characters', function(){
    expect(checkForValidUsername('travelr1')).to.equal(false)
    expect(checkForValidUsername('traveler1')).to.equal(true)
  })
  it('should not allow a user to pass in traveler0', function(){
    expect(checkForValidUsername('traveler0')).to.equal(false)
    expect(checkForValidUsername('traveler00')).to.equal(false)
  })
  it('should check that the first 8 characters are always traveler', function(){
    expect(checkForValidUsername(123456789)).to.equal(false)
  })
  it('should check that the password is traveler', function(){
    expect(checkPassword('traveler1')).to.equal(false)
    expect(checkPassword('traveler')).to.equal(true)
  })
})

describe('functions to validate calendar inputs', function(){
  it('should check that all fields are filled out completely', function(){
    expect(checkValidDates('05-08-0000', '05-00-2023')).to.equal('Invalid dates')
  })
  it('should check that start date happens before end date', function(){
    expect(checkValidDates('10-08-2023', '10-06-2023')).to.equal('Start date must be before end date')
  })
  it('should not allow start date to be before today', function(){
    expect(checkValidDates('08-08-2023', '10-06-2023')).to.equal('Start date cannot be in the past')
  })
})

describe('functions to validate number inputs', function(){
  it('Should check that only whole numbers 1-14 can be passed in', function(){
    expect(checkValidNumPassengers(18)).to.equal( 'Please enter a number between 1 and 14.')
    expect(checkValidNumPassengers(0)).to.equal( 'Please enter a number between 1 and 14.')
  })
})