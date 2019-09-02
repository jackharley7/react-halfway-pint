import React from 'react';
import styled from 'styled-components';
import { borderColor, colorLight } from './../../theme';

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  height: 16vh;
  border-bottom: 1px solid ${borderColor};
  background: ${colorLight};
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h3``;
const Body = styled.h5``;

const Image = styled.div`
  flex: 1;
  min-width: 120px;
  max-width: 120px;
  background: ${props => `url(${props.src})`};
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 8px;
  margin: 12px;
  border: 1px solid ${borderColor};
`;

export default ({location}) => {
  if (!location) return <Wrapper></Wrapper>;
  return (
    <Wrapper>
      { location.photos && location.photos[0] && <Image src={location.photos[0].getUrl({maxWidth: 400, maxHeight: 400})}/> }
      <Content>
        <Title>{location.name}</Title>
        <Body>{location.vicinity}</Body>
      </Content>
    </Wrapper>
  )
}
