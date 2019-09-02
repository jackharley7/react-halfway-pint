import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon as darkIcon} from '@fortawesome/free-solid-svg-icons'
import { faMoon as lightIcon} from '@fortawesome/free-regular-svg-icons'

const Wrapper = styled.div`
  cursor: pointer;
  font-size: 36px;
  position: absolute;
  right: 15px;
  top: 5px;
`;

export default ({onClick, mode}) => (
  <Wrapper onClick={onClick}>
    { mode === 'light' ? <FontAwesomeIcon icon={lightIcon} /> : <FontAwesomeIcon icon={darkIcon} /> }
  </Wrapper>
);