import React from 'react';
import styled from 'styled-components';
import JourneyInstruction from './JourneyLeg/JourneyInstruction';
import JourneyStops from './JourneyLeg/JourneyStops';
import { borderColor } from './../../theme';

// Walk to xyz
const Wrapper = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${borderColor};
`;

const JourneyDescription = styled.div`
  font-weight: 600;
  font-size: 13px;
`;

const JourneyDescriptionService = styled(JourneyDescription)`
  padding-bottom: 10px;
  border-bottom: 1px solid ${borderColor};
  margin-bottom: 10px;
`;

export default ({data}) => {  
  let instruction = null;
  let service = null
  switch (data.mode.id) {
    case "walking":
      instruction = <JourneyDescription>{data.instruction.detailed}</JourneyDescription>;
      break;
    case "bus":
    case "dlr":
    case "tube":
    case "overground":
      service = <JourneyDescriptionService>{data.instruction.detailed}</JourneyDescriptionService>;
      instruction = <JourneyStops arrivalPoint={data.arrivalPoint} departurePoint={data.departurePoint} stopPoints={data.path.stopPoints} />;
      break;
    default:
      break;
  }
  return (
    <Wrapper>
      { service }
      <JourneyInstruction duration={data.duration}>{ instruction }</JourneyInstruction>
    </Wrapper>
  );
};