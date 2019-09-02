import React from 'react';
import styled from 'styled-components';
import { stopColor } from './../../../../theme';

const Wrapper = styled.li`
  font-weight: 300;
  font-size: 12px;
  position: relative;
`;

const Point = styled.span`
  width: 4px;
  height: 4px;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  background: ${stopColor};
  margin-left: -12px;
  top: calc(50% - 2px);
  display: inline-block;
  position: absolute;
`;

export default ({children}) => (
  <Wrapper>
    <Point />
    {children}
  </Wrapper>
)