import React, { useState } from 'react';
import PrimaryStop from './JourneyStops/PrimaryStop';
import IntermediaryStopControl from './JourneyStops/IntermediaryStopControl';
import IntermediaryStopList from './JourneyStops/IntermediaryStopList';
import IntermediaryStop from './JourneyStops/IntermediaryStop';

export default ({arrivalPoint, departurePoint, stopPoints}) => {
  let points = [...stopPoints];

  const [show, setShow] = useState(false)

  const toggleShow = () => {
    setShow(!show);
  };

  const hasStops = points.length > 0;
  const stopsStr = hasStops ? `${points.length} stops` : '1 stop';

  return (
    <ul>
      <PrimaryStop>{departurePoint.commonName || departurePoint.name}</PrimaryStop>
      <IntermediaryStopControl onClick={hasStops ? toggleShow : () => {}} show={show}>{stopsStr}</IntermediaryStopControl>
      { 
        show && (
          <IntermediaryStopList>
            { points.map((stop, i) => <IntermediaryStop key={i}>{ stop.name }</IntermediaryStop>) }
          </IntermediaryStopList>
        )
      }
      <PrimaryStop>{arrivalPoint.commonName || arrivalPoint.name}</PrimaryStop>
    </ul>
  );
};
