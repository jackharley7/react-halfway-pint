import React from 'react';
import styled from 'styled-components';
import { useQueryParams } from 'hookrouter';

import { useHalfwayPoint } from './../hooks/halfway';
import Journey from '../components/Journey';
import BeerMap from '../components/BeerMap';
import Box from '../components/Layout/Box';
import MapBox from '../components/Layout/MapBox';
import Loading from '../components/Loading';
import { screens } from '../theme';

const Wrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  @media ${screens.md} {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  };
`;

export default () => {
  const [queryParams] = useQueryParams();
  const { start, end } = getLatLngFromQueryParams(queryParams)
  
  const {halfway, loading} = useHalfwayPoint(start, end);

  if (loading) return <Loading />

  return (
    <Wrapper>
      <span>
        <Box title="My Journey" info={halfway.journeyA && Math.round(halfway.journeyA.duration)}>
          <Journey data={halfway.journeyA} />
        </Box>
        <Box title="Friends Journey" info={halfway.journeyB && Math.round(halfway.journeyB.duration)}>
          <Journey data={halfway.journeyB} />
        </Box>
      </span>
      <MapBox>
        <BeerMap
          lat={halfway.midPoint && halfway.midPoint.lat}
          lng={halfway.midPoint && halfway.midPoint.lng}/>
      </MapBox>
    </Wrapper>
  );
}

const getLatLngFromQueryParams = (q) => {
  const s = q.start.split(",");
  const e = q.end.split(",");
  return {
    start: { lat: s[0], lng: s[1] },
    end: { lat: e[0], lng: e[1] },
  };
};
