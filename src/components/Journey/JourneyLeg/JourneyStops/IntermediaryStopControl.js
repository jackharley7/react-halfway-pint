import React from 'react';
import styled from 'styled-components';
import { stopColor, textColorDark, textColorLight } from './../../../../theme';

const Wrapper = styled.li`
  margin-left: 5px;
  margin-top: 10px;
  font-weight: 500;
  font-size: 13px;
  color: ${textColorLight};
  cursor: pointer;
  display: flex;
  :hover {
    color: ${textColorDark};
  }
`;

const Line = styled.span`
  width: 4px;
  border-radius: 2px;
  background: ${stopColor};
  margin-right: 8px;
  display: inline-block;
`;

const showStyles = {
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
};

export default ({children, onClick, show}) => (
  <Wrapper onClick={onClick} style={show ? {} : {marginBottom: 10}}>
    <Line style={show ? showStyles : {}} />
    {children}
  </Wrapper>
);