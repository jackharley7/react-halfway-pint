import React from 'react';
import styled from 'styled-components';
import { stopColor } from './../../../../theme';

const Wrapper = styled.li`
  font-weight: 200;
  font-size: 15px;
  display: flex;
`;

const Bullet = styled.span`
  min-width: 14px;
  height: 14px;
  border-radius: 7px;
  background: ${stopColor};
  margin-right: 4px;
  display: inline-block;
`;

export default ({children}) => (
  <Wrapper>
    <Bullet />
    {children}
  </Wrapper>
)