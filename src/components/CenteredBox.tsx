import styled from 'styled-components';
import theme from '../theme';

const CenteredBox = styled.div`
  width: 100%;
  min-height: ${theme.spacing(16)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;

export default CenteredBox;
