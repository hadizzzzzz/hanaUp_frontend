import styled from 'styled-components';
import color from '../../styles/color';

const ProgressContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${color.grayscale.gray2};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px gba(0, 0, 0, 0.2);
`;

const ProgressBarComp = styled.div`
  border-radius: 8px;

  height: 100%;
  background: ${color.brand.grad};
  transition: width 0.3s ease-in-out;
`;

const CustomProgressBar = ({ percent }) => {
  return (
    <ProgressContainer>
      <ProgressBarComp style={{ width: `${percent}%` }} />
    </ProgressContainer>
  );
};

export default CustomProgressBar;
