import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-direction: column;
`;

const Icon = styled(FontAwesomeIcon)`
  animation: fa-spin 2s linear infinite;
  font-size: 36px;
`;

const H1 = styled.h1``;

export default () => (
  <Wrapper>
    <Icon icon={faSpinner} />
    <H1>Loading...</H1>
  </Wrapper>
);