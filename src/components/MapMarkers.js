import styled from 'styled-components';

const Marker = styled.div`
  position: absolute;
  transition: all .1s ease-in-out;
  transform: ${props => props.$hover ? "scale(1.4)" : "scale(1)"};
  background-repeat: no-repeat;
  background-size: contain;
`;

export const MiddlePointMarker = styled(Marker)`
  left: -16px;
  top: -14px;
  height: 32px;
  width: 28px;
  border-radius: 13px;
  background-image: url('/icons/middlemarker.png');
`;

export const BeerMarker = styled(Marker)`
  left: -12px;
  top: -10px;
  height: 42px;
  width: 36px;
  border-radius: 21px;
  background-image: url('/icons/beermarker.png');
`;
