import React from 'react';
import styled from 'styled-components';
// import data from './../services/data/journey.json';
import JourneyLeg from './Journey/JourneyLeg';

// Walk to xyz
const Wrapper = styled.div`
  margin-bottom: 20px;
`;

export default ({data}) => {
  if (!data) return null;
  return (
    <Wrapper>
      { data.legs.map((leg, i) => <JourneyLeg key={i} data={leg}/>) }
    </Wrapper>
  );
};