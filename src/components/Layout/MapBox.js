import styled from 'styled-components';
import { screens } from './../../theme';
import { borderColor } from './../../theme';

export default styled.div`
  width: 304px;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  border: ${props => { return props.theme.mode === 'light' ? 'none' : `1px solid ${borderColor(props)}`}};
  @media ${screens.md} {
    flex: 1;
    max-width: 500px;
    margin-left: 20px;
  };
`;