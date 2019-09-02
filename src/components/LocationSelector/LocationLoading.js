import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
`;

const Content = styled.div`
  font-size: 12px;
  font-weight: 200;
  margin-left: 10px;
`;

const Icon = styled(FontAwesomeIcon)`
  animation: fa-spin 2s linear infinite;
`;

export default ({value}) => (
  <Wrapper>
    <Icon  icon={faSpinner} />
    <Content>{value}</Content>
  </Wrapper>
);
