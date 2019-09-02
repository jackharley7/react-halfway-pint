import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DurationWrapper = styled.div`
  font-size: 10px;
  font-weight: 200;
  white-space: nowrap;
`;

export default ({duration, children}) => (
  <Wrapper>
    <span>{children}</span>
    <DurationWrapper>{Math.round(duration)} min</DurationWrapper>
  </Wrapper>
);