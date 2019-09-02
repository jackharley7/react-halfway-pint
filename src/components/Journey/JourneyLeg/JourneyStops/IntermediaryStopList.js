import React from 'react';
import styled from 'styled-components';
import { stopColor } from './../../../../theme';

const Li = styled.li`
  margin-left: 5px;
  display: flex;
  position: relative;
  margin-bottom: 10px;
`;

const Ul = styled.ul`
  margin-left: 5px;
`;

const Line = styled.span`
  width: 4px;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  background: ${stopColor};
  margin-right: 5px;
  display: inline-block;
`;

export default ({children, onClick}) => (
  <Li>
    <Line />
    <Ul onClick={onClick}>
      {children}
    </Ul>
  </Li>
)