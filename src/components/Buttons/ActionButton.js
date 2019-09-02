import React from 'react';
import styled from 'styled-components';
import { buttonDisabledColor, colorPrimaryB, colorPrimaryC, colorDark, colorLight } from './../../theme';

const Wrapper = styled.a`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: ${props => props.disabled ? buttonDisabledColor : colorPrimaryB};
  color: ${props => props.disabled ? colorDark : colorLight};
  box-shadow: ${props => props.disabled ? 'none' : 'rgba(0,0,0,0.2) 0px 2px 2px'};
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background: ${props => props.disabled ? buttonDisabledColor : colorPrimaryC};
  }
`;

export default ({children, disabled, url}) => (
  <Wrapper href={ !disabled ? url : undefined } disabled={disabled}>
    {children}
  </Wrapper>
);