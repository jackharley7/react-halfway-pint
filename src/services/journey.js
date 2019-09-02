import * as tfl from './tfl.api';

export const getMiddleLegInJourney = (legs, T) => {
  let m = {};
  let t = 0;
  let isStop = false;

  let i = 0;
  while (t < (T/2)) {
    if (legs[i] !== undefined) {
      m = legs[i]
      t = t + m.duration;
      if (t < (T/2 + 2) && t > (T/2 - 2)) {
        isStop = true
      }
      i++;
    } else {
      t = T
    }
  }

  return {
    position: i,
    leg: m,
    isStop,
  };
}

// 40 mins, 20 mins
export const getMiddleStopPointFromLeg = (stopPoints, d, ts, T) => {

  const noOfStops = stopPoints.length;
  const estimatedTimeBetweenStops = d/noOfStops;

  let t = ts;
  let i = 0;
  let m = {};

  while (t < (T/2)) {
    if (stopPoints[i] != undefined) {
      m = stopPoints[i]
      t = t + estimatedTimeBetweenStops;
      i++;
    } else {
      t = T
    }
  }

  return m;

}

export const getJourneySectionDurations = (legs, middlePos) => {
  let sD = 0;
  let mD = 0;
  let eD = 0;

  legs.forEach((leg, i) => {
    const j = i+1;
    if (j < middlePos) {
      sD = sD + leg.duration;
    } else if (j > middlePos) {
      eD = eD + leg.duration;
    } else {
      mD = leg.duration;
    }
  });

  return {
    startDuration: sD,
    middleDuration: mD,
    endDuration: eD,
  };
}

export const getMiddleStopPoint = (legs, T) => {
  const middleLeg = getMiddleLegInJourney(legs, T);

  const { startDuration, middleDuration, endDuration } = getJourneySectionDurations(legs, middleLeg.position);

  let middlePoint = middleLeg.leg.arrivalPoint;
  if (middleLeg.leg.path && middleLeg.leg.path.stopPoints && middleLeg.leg.path.stopPoints.length > 0) {
    middlePoint = getMiddleStopPointFromLeg( middleLeg.leg.path.stopPoints, middleDuration, startDuration, T)
  }

  return middlePoint.naptanId || middlePoint.id
};

export const reverseJourney = (j) => {
  const journey = JSON.parse(JSON.stringify(j));
  journey.legs = journey.legs.map((l, i) => {
    if (l.path && l.path.stopPoints) {
      l.path.stopPoints = l.path.stopPoints.reverse();
    }
    l.instruction.detailed = getReverseInstruction(l, journey.legs[i - 1])
    const tempArrivalPoint = l.arrivalPoint;
    l.arrivalPoint = l.departurePoint;
    l.departurePoint = tempArrivalPoint;
    return l;
  });
  journey.legs = journey.legs.reverse();
  return journey;
};

const getReverseInstruction = (leg, nextLeg) => {
  let instruction = leg.instruction && leg.instruction.detailed;
  switch (leg.mode.id) {
    case "walking":
      if (nextLeg) {
        instruction = "Walk to " + (nextLeg.departurePoint.commonName || nextLeg.departurePoint.name);
      }
      break;
    case "bus":
    case "dlr":
    case "tube":
    case "overground":
        instruction = `${leg.routeOptions && leg.routeOptions[0].name} line`;
      break;
    default:
      break;
    }
  return instruction;
};

export const findJourneyToStop = (j, mp) => {
  const journey = {...j, legs: [], duration: 0};

  j.legs.some((l, i) => {
    journey.legs.push({...l, path: {...l.path, stopPoints: []}});
    if (l.arrivalPoint.naptanId === mp) return true;
    if (l.path && l.path.stopPoints) {
      const noOfStops = l.path.stopPoints.length;
      const estimatedTimeBetweenStops = l.duration/noOfStops;
      let t = 0;
    
      const res = l.path.stopPoints.some(sp => {
        const id = sp.naptanId || sp.id
        t = t + estimatedTimeBetweenStops;
        if (id === mp) {
          journey.legs[i].duration = t;
          journey.legs[i].arrivalPoint = sp;
          return true
        };
        journey.legs[i].path.stopPoints.push(sp);
      });
      journey.duration = journey.duration + journey.legs[i].duration;
      return res;
    }
  });
  return journey;
};

export const findShortestJourney = (journeys) => (
  journeys.reduce((a, j) => {
    if (!a.duration) return j;
    return j.duration < a.duration ? j : a;
  })
);

// Removes stopPoint if stopPoint is also arrival or departure point
export const trimLegStopPoints = (leg) => {
  if (leg.path.stopPoints.length === 0) {
    return leg;
  }
  const arrivalId = leg.arrivalPoint.naptanId;
  const departureId = leg.departurePoint.naptanId;
  if (leg.path.stopPoints[0].id === departureId) {
    leg.path.stopPoints.shift();
  }
  if (leg.path.stopPoints.length > 0 && leg.path.stopPoints[leg.path.stopPoints.length - 1].id === arrivalId) {
    leg.path.stopPoints.pop();
  }
};

export const trimJourneyStopPoints = (j) => {
  j.legs.forEach(trimLegStopPoints)
};

export default async (start, end) => {
  const j = await tfl.getJourney(start, end)
  const shortest = findShortestJourney(j.data.journeys)

  const naptanId = getMiddleStopPoint(shortest.legs, shortest.duration);
  const stopPoint = await tfl.getStopPointInfo(naptanId);

  const midPoint = {
    lat: stopPoint.data.lat,
		lng: stopPoint.data.lon,
  };

  const journeyA = findJourneyToStop(shortest, naptanId);
  const reversed = reverseJourney(shortest);
  const journeyB = findJourneyToStop(reversed, naptanId);

  trimJourneyStopPoints(journeyA);
  trimJourneyStopPoints(journeyB);

  return {
    journeyA,
    journeyB,
    midPoint,
  }
}