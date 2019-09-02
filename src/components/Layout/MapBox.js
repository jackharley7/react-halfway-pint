import styled from 'styled-components';
import { screens } from './../../theme';

export default styled.div`
  width: 304px;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  @media ${screens.md} {
    height: 50vh;
    flex: 1;
    max-width: 500px;
    margin-left: 20px;
  };
`;