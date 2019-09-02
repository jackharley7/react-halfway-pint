import React from 'react';
import styled from 'styled-components';
import { colorLight, colorPrimaryB, borderColor } from './../../theme';

const BoxWrapper = styled.div`
  width: 304px;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  border: ${props => { return props.theme.mode === 'light' ? 'none' : `1px solid ${borderColor(props)}`}};
`;

const BoxHeader = styled.div`
  background: ${colorPrimaryB};
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BoxHeaderTitle = styled.h4`
  margin: 0;
  color: ${colorLight};
  text-transform: uppercase;
`;

const BoxHeaderInfo = styled.h6`
  margin: 0;
  color: ${colorLight};
`;

const BoxContent = styled.div`
  background: ${colorLight};
  flex: 1;
`;

export default ({title, info, children, style}) => {
  return (
    <BoxWrapper style={style}>
      { title && (
        <BoxHeader>
          <BoxHeaderTitle>{title}</BoxHeaderTitle>
          { info && <BoxHeaderInfo>{info}</BoxHeaderInfo>}
        </BoxHeader>
      ) }
      <BoxContent>{children}</BoxContent>
    </BoxWrapper>
  );
};