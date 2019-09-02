import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrownOpen as notFoundIcon } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-direction: column;
`;

const H1 = styled.h1``;

export default () => (
  <Wrapper>
    <FontAwesomeIcon style={{fontSize: 72}} icon={notFoundIcon} />
    <H1>Page Not Found</H1>
  </Wrapper>
);