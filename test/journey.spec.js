import * as fns from '../src/services/journey';
import 'mocha';
import { assert } from 'chai';

describe('getMiddleLegInJourney', () => {
  it('should return the middle leg where all legs are the same length, odd number of legs', () => {
    const legs = [
      {leg: 1, duration: 30, departurePoint: {}, arrivalPoint: {}},
      {leg: 2, duration: 30, departurePoint: {}, arrivalPoint: {}},
      {leg: 3,duration: 30, departurePoint: {}, arrivalPoint: {}},
      {leg: 4, duration: 30, departurePoint: {}, arrivalPoint: {}},
      {leg: 5, duration: 30, departurePoint: {}, arrivalPoint: {}},
    ];
    const result = fns.getMiddleLegInJourney(legs, 150);
    assert.equal(3, result.leg.leg);
    assert.equal(3, result.position);
    assert.equal(false, result.isStop);
  });
  it('should return isStop true where stop is within +/- 2 mins of middle of journey', () => {
    const legs = [
      {leg: 1, duration: 20, departurePoint: {}, arrivalPoint: {}},
      {leg: 2, duration: 10, departurePoint: {}, arrivalPoint: {}},
      {leg: 3,duration: 11, departurePoint: {}, arrivalPoint: {}},
      {leg: 4, duration: 30, departurePoint: {}, arrivalPoint: {}},
      {leg: 5, duration: 10, departurePoint: {}, arrivalPoint: {}},
    ];
    const result = fns.getMiddleLegInJourney(legs, 81);
    assert.equal(true, result.isStop);
    assert.equal(3, result.position);
    assert.equal(3, result.leg.leg);
  });
  it('should return the first leg if there is only one leg', () => {
    const legs = [
      {leg: 1, duration: 20, departurePoint: {}, arrivalPoint: {}},
    ];
    const result = fns.getMiddleLegInJourney(legs, 81);
    assert.equal(false, result.isStop);
    assert.equal(1, result.leg.leg);
    assert.equal(1, result.position);
  });
});

describe('getJourneySectionDurations', () => {
  const legs = [
    {leg: 1, duration: 20, departurePoint: {}, arrivalPoint: {}},
    {leg: 2, duration: 10, departurePoint: {}, arrivalPoint: {}},
    {leg: 3,duration: 11, departurePoint: {}, arrivalPoint: {}},
    {leg: 4, duration: 30, departurePoint: {}, arrivalPoint: {}},
    {leg: 5, duration: 10, departurePoint: {}, arrivalPoint: {}},
  ];

  it('should return durations before and after middle 2', () => {
    const { startDuration, middleDuration, endDuration } = fns.getJourneySectionDurations(legs, 2)
    assert.equal(startDuration, 20);
    assert.equal(middleDuration, 10);
    assert.equal(endDuration, 51);
  });

  it('should return durations before and after middle 3', () => {
    const { startDuration, middleDuration, endDuration } = fns.getJourneySectionDurations(legs, 3)
    assert.equal(startDuration, 30);
    assert.equal(middleDuration, 11);
    assert.equal(endDuration, 40);
  });

  it('should return durations before and after middle 5', () => {
    const { startDuration, middleDuration, endDuration } = fns.getJourneySectionDurations(legs, 5)
    assert.equal(startDuration, 71);
    assert.equal(middleDuration, 10);
    assert.equal(endDuration, 0);
  });
});


describe('getMiddleStopPointFromLeg', () => {
  const stopPoints = [{"id": "940GZZLUMED"}, {"id": "940GZZLUBWR"}, {"id": "940GZZLUBBB"}, {"id": "940GZZLUWHM"}];

  it('should return middle stop when total duration before is more than after', () => {
    const legDuration = 30;
    const totalDuration = 70;
    const timeStart = 30;
    const middleStop = fns.getMiddleStopPointFromLeg(stopPoints, legDuration, timeStart, totalDuration)
    const expectedMiddleStop = {"id": "940GZZLUMED"};
    assert.equal(expectedMiddleStop.id, middleStop.id);
  });

  it('should return middle stop when total duration before is left than after', () => {
    const legDuration = 20;
    const totalDuration = 70;
    const timeStart = 20;
    const middleStop = fns.getMiddleStopPointFromLeg(stopPoints, legDuration, timeStart, totalDuration)
    const expectedMiddleStop = {"id": "940GZZLUBBB"};
    assert.equal(expectedMiddleStop.id, middleStop.id);
  });

  it('should return only stopPoint if number of stop points is 1', () => {
    const stopPointsTwo =[{"id": "940GZZLUMED"}];
    const legDuration = 10;
    const totalDuration = 70;
    const timeStart = 30;
    const middleStop = fns.getMiddleStopPointFromLeg(stopPointsTwo, legDuration, timeStart, totalDuration)
    const expectedMiddleStop = {"id": "940GZZLUMED"};
    assert.equal(expectedMiddleStop.id, middleStop.id);
  });
});

describe('getMiddleStopPoint', () => {
  it('should return the middle point', () => {
    const legs = [
      {leg: 1, duration: 30, departurePoint: {}, arrivalPoint: {}},
      {leg: 2, duration: 30, departurePoint: {}, arrivalPoint: {}},
      {leg: 3, duration: 30, departurePoint: {}, arrivalPoint: {}, path: {stopPoints: [{"id": "940GZZLUSGN"}, {"id": "940GZZLUMED"}, {"id": "940GZZLUBWR"}, {"id": "940GZZLUBBB"}, {"id": "940GZZLUWHM"}]}},
      {leg: 4, duration: 30, departurePoint: {}, arrivalPoint: {}},
      {leg: 5, duration: 30, departurePoint: {}, arrivalPoint: {}},
    ];
    const result = fns.getMiddleStopPoint(legs, 150);
    assert.equal("940GZZLUBWR", result);
  });

  it('should return the middle point', () => {
    const legs = [
      {leg: 1, duration: 70, departurePoint: {}, arrivalPoint: {}},
      {leg: 2, duration: 20, departurePoint: {}, arrivalPoint: {}, path: {stopPoints: [{"id": "940GZZLUSGN"}, {"id": "940GZZLUMED"}, {"id": "940GZZLUBWR"}, {"id": "940GZZLUBBB"}, {"id": "940GZZLUWHM"}]}},
      {leg: 3, duration: 30, departurePoint: {}, arrivalPoint: {}},
      {leg: 4, duration: 20, departurePoint: {}, arrivalPoint: {}},
      {leg: 5, duration: 10, departurePoint: {}, arrivalPoint: {}},
    ];
    const result = fns.getMiddleStopPoint(legs, 150);
    assert.equal("940GZZLUMED", result);
  });

  it('should return the middle point', () => {
    const legs = [
      {leg: 1, duration: 70, departurePoint: {}, arrivalPoint: {}},
      {leg: 2, duration: 20, departurePoint: {}, arrivalPoint: { naptanId: "940GZZLUSGN"}},
      {leg: 3, duration: 30, departurePoint: {}, arrivalPoint: {}},
      {leg: 4, duration: 20, departurePoint: {}, arrivalPoint: {}},
      {leg: 5, duration: 10, departurePoint: {}, arrivalPoint: {}},
    ];
    const result = fns.getMiddleStopPoint(legs, 150);
    assert.equal("940GZZLUSGN", result);
  });

});

describe('findShortestJourney', () => {
  it('should return first element if only one in array', () => {
    const journeys = [{duration: 20}];
    const result = fns.findShortestJourney(journeys);
    assert.equal(result, journeys[0]);
  });
  it('should return lowest duration in array', () => {
    const journeys = [{duration: 20}, {duration: 12}, {duration: 40}];
    const result = fns.findShortestJourney(journeys);
    assert.equal(result, journeys[1]);
  });
});

describe('findJourneyToStop', () => {
  it('should return journey to given stop', () => {
    const journey = {
      a: "something",
      duration: 150,
      legs: [
        {leg: 1, duration: 70, departurePoint: {}, arrivalPoint: {}, path: {stopPoints: []}},
        {leg: 2, duration: 20, departurePoint: {}, arrivalPoint: {}, path: {stopPoints: [{"id": "940GZZLUSGN"}, {"id": "940GZZLUMED"}, {"id": "940GZZLUBWR"}, {"id": "940GZZLUBBB"}, {"id": "940GZZLUWHM"}]}},
        {leg: 3, duration: 30, departurePoint: {}, arrivalPoint: {}},
        {leg: 4, duration: 20, departurePoint: {}, arrivalPoint: {}},
        {leg: 5, duration: 10, departurePoint: {}, arrivalPoint: {}},
      ],
    };

    const expect = {
      a: "something",
      duration: 78,
      legs: [
        {leg: 1, duration: 70, departurePoint: {}, arrivalPoint: {}, path: {stopPoints: []}},
        {leg: 2, duration: 8, departurePoint: {}, arrivalPoint: {"id": "940GZZLUMED"}, path: {stopPoints: [{"id": "940GZZLUSGN"}]}},
      ]
    }
    const result = fns.findJourneyToStop(journey, "940GZZLUMED");
    assert.deepEqual(result, expect);
  });

  it('should return journey to given stop', () => {
    const journey = {
      duration: 150,
      legs: [
        {leg: 1, duration: 70, departurePoint: {}, arrivalPoint: {}, path: {stopPoints: []}},
        {leg: 2, duration: 20, departurePoint: {}, arrivalPoint: {}, path: {stopPoints: [{"id": "940GZZLUSGN"}, {"id": "940GZZLUMED"}, {"id": "940GZZLUBWR"}, {"id": "940GZZLUBBB"}, {"id": "940GZZLUWHM"}]}},
        {leg: 3, duration: 30, departurePoint: {}, arrivalPoint: {}},
        {leg: 4, duration: 20, departurePoint: {}, arrivalPoint: {}},
        {leg: 5, duration: 10, departurePoint: {}, arrivalPoint: {}},
      ],
    }

    const expect = {
      duration: 86,
      legs: [
        {leg: 1, duration: 70, departurePoint: {}, arrivalPoint: {}, path: {stopPoints: []}},
        {leg: 2, duration: 16, departurePoint: {}, arrivalPoint: {"id": "940GZZLUBBB"}, path: {stopPoints: [{"id": "940GZZLUSGN"}, {"id": "940GZZLUMED"}, {"id": "940GZZLUBWR"}]}},
      ]
    }
    const result = fns.findJourneyToStop(journey, "940GZZLUBBB");
    assert.deepEqual(result, expect);
  });
});

describe('reverseJourney', () => {
  it('should reverse legs in journey, updates walking instruction', () => {
    const journey = {
      legs: [
        {leg: 1, duration: 20, mode: {id: "a"}, instruction: {detailed: "a"}, departurePoint: {}, arrivalPoint: {commonName: "platform"}},
        {leg: 2, duration: 70, mode: {id: "walking"}, instruction: { detailed: "Walk to somewhere" }, departurePoint: {"id": 1}, arrivalPoint: {"id": 2}},
      ]
    };

    const expect = {
      legs: [
        {leg: 2, duration: 70, mode: {id: "walking"}, instruction: { detailed: "Walk to platform" }, departurePoint: {"id": 2}, arrivalPoint: {"id": 1}},
        {leg: 1, duration: 20, mode: {id: "a"}, instruction: {detailed: "a"}, departurePoint: {commonName: "platform"}, arrivalPoint: {}},
      ]
    };
    const result = fns.reverseJourney(journey);
    assert.deepEqual(result, expect);
  });

  it('should reverse legs in journey, updates tube instruction', () => {
    const journey = {
      legs: [
        {leg: 1, duration: 70, mode: {id: "tube"}, routeOptions: [{name: "Central"}], instruction: { detailed: "Central to somewhere" }, departurePoint: {"id": 1}, arrivalPoint: {"id": 2}},
        {leg: 2, duration: 20, mode: {id: "a"}, instruction: {detailed: "a"}, departurePoint: {commonName: "platform"}, arrivalPoint: {}},
      ]
    };

    const expect = {
      legs: [
        {leg: 2, duration: 20, mode: {id: "a"}, instruction: {detailed: "a"}, departurePoint: {}, arrivalPoint: {commonName: "platform"}},
        {leg: 1, duration: 70, mode: {id: "tube"}, routeOptions: [{name: "Central"}], instruction: { detailed: "Central line" }, departurePoint: {"id": 2}, arrivalPoint: {"id": 1}},
      ]
    };
    const result = fns.reverseJourney(journey);
    assert.deepEqual(result, expect);
  });

  it('should reverse legs and stopPoints in journey', () => {
    const journey = {
      legs: [
        {leg: 1, duration: 70, mode: {id: "a"}, instruction: {detailed: "a"}, departurePoint: {}, arrivalPoint: {}, path: {stopPoints: []}},
        {leg: 2, duration: 20, mode: {id: "a"}, instruction: {detailed: "a"}, departurePoint: {}, arrivalPoint: {}, path: {stopPoints: [{"id": "940GZZLUSGN"}, {"id": "940GZZLUMED"}, {"id": "940GZZLUBWR"}, {"id": "940GZZLUBBB"}, {"id": "940GZZLUWHM"}]}},
        {leg: 3, duration: 30, mode: {id: "a"}, instruction: {detailed: "a"}, departurePoint: {}, arrivalPoint: {}},
        {leg: 4, duration: 20, mode: {id: "a"}, instruction: {detailed: "a"}, departurePoint: {}, arrivalPoint: {}},
        {leg: 5, duration: 10, mode: {id: "a"}, instruction: {detailed: "a"}, departurePoint: {}, arrivalPoint: {}},
      ]
    };

    const expect = {
      legs: [
        {leg: 5, duration: 10, mode: {id: "a"}, instruction: {detailed: "a"}, departurePoint: {}, arrivalPoint: {}},
        {leg: 4, duration: 20, mode: {id: "a"}, instruction: {detailed: "a"}, departurePoint: {}, arrivalPoint: {}},
        {leg: 3, duration: 30, mode: {id: "a"}, instruction: {detailed: "a"}, departurePoint: {}, arrivalPoint: {}},
        {leg: 2, duration: 20, mode: {id: "a"}, instruction: {detailed: "a"}, departurePoint: {}, arrivalPoint: {}, path: {stopPoints: [{"id": "940GZZLUWHM"}, {"id": "940GZZLUBBB"}, {"id": "940GZZLUBWR"}, {"id": "940GZZLUMED"}, {"id": "940GZZLUSGN"}]}},
        {leg: 1, duration: 70, mode: {id: "a"}, instruction: {detailed: "a"}, departurePoint: {}, arrivalPoint: {}, path: {stopPoints: []}},
      ]
    };
    const result = fns.reverseJourney(journey);
    assert.deepEqual(result, expect);
  });
});

describe('trimLegStopPoints', () => {
  it('should do nothing if stopPoints is empty', () => {
    const leg = {departurePoint: {naptanId: "940GZZLUSGN"}, arrivalPoint: {naptanId: "random"}, path: {stopPoints: []}};
    const expect = {departurePoint: {naptanId: "940GZZLUSGN"}, arrivalPoint: {naptanId: "random"}, path: {stopPoints: []}};

    fns.trimLegStopPoints(leg);
    assert.deepEqual(leg, expect);
  });

  it('should remove from stopPoint if the only stopPoint is same as departure point', () => {
    const leg = {departurePoint: {naptanId: "940GZZLUSGN"}, arrivalPoint: {naptanId: "random"}, path: {stopPoints: [{"id": "940GZZLUSGN"}]}};
    const expect = {departurePoint: {naptanId: "940GZZLUSGN"}, arrivalPoint: {naptanId: "random"}, path: {stopPoints: []}};

    fns.trimLegStopPoints(leg);
    assert.deepEqual(leg, expect);
  });

  it('should remove from stopPoint if the only stopPoint is same as arrival point', () => {
    const leg = {departurePoint: {naptanId: "random"}, arrivalPoint: {naptanId: "940GZZLUSGN"}, path: {stopPoints: [{"id": "940GZZLUSGN"}]}};
    const expect = {departurePoint: {naptanId: "random"}, arrivalPoint: {naptanId: "940GZZLUSGN"}, path: {stopPoints: []}};

    fns.trimLegStopPoints(leg);
    assert.deepEqual(leg, expect);
  });

  it('should remove first from stopPoint array when is same as departure point', () => {
    const leg = {departurePoint: {naptanId: "940GZZLUSGN"}, arrivalPoint: {naptanId: "random"}, path: {stopPoints: [{"id": "940GZZLUSGN"}, {"id": "940GZZLUMED"}, {"id": "940GZZLUBWR"}, {"id": "940GZZLUBBB"}, {"id": "940GZZLUWHM"}]}};
    const expect = {departurePoint: {naptanId: "940GZZLUSGN"}, arrivalPoint: {naptanId: "random"}, path: {stopPoints: [{"id": "940GZZLUMED"}, {"id": "940GZZLUBWR"}, {"id": "940GZZLUBBB"}, {"id": "940GZZLUWHM"}]}};

    fns.trimLegStopPoints(leg);
    assert.deepEqual(leg, expect);
  });

  it('should remove last from stopPoint array when is same as arrival point', () => {
    const leg = {departurePoint: {naptanId: "nothing"}, arrivalPoint: {naptanId: "940GZZLUWHM"}, path: {stopPoints: [{"id": "940GZZLUSGN"}, {"id": "940GZZLUMED"}, {"id": "940GZZLUBWR"}, {"id": "940GZZLUBBB"}, {"id": "940GZZLUWHM"}]}};
    const expect = {departurePoint: {naptanId: "nothing"}, arrivalPoint: {naptanId: "940GZZLUWHM"}, path: {stopPoints: [{"id": "940GZZLUSGN"}, {"id": "940GZZLUMED"}, {"id": "940GZZLUBWR"}, {"id": "940GZZLUBBB"}]}};

    fns.trimLegStopPoints(leg);
    assert.deepEqual(leg, expect);
  });

  it('should not remove anything is departure and arrival not in stopPoints', () => {
    const leg = {departurePoint: {naptanId: "nothing"}, arrivalPoint: {naptanId: "nothing"}, path: {stopPoints: [{"id": "940GZZLUSGN"}, {"id": "940GZZLUMED"}, {"id": "940GZZLUBWR"}, {"id": "940GZZLUBBB"}]}};
    const expect = {departurePoint: {naptanId: "nothing"}, arrivalPoint: {naptanId: "nothing"}, path: {stopPoints: [{"id": "940GZZLUSGN"}, {"id": "940GZZLUMED"}, {"id": "940GZZLUBWR"}, {"id": "940GZZLUBBB"}]}};

    fns.trimLegStopPoints(leg);
    assert.deepEqual(leg, expect);
  });
});