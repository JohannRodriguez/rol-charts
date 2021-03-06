import styled, { css } from 'styled-components';
import colors from './colors.json';

export const Input = styled.input`
  width: 100%;
  height: 100%;
  background: ${colors.dark};
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  color: ${colors.light};
  transition: 0.2s;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 4px 2px ${colors.focusBlue};
    transition: 0.2s;
  }
  ::placeholder {
  color: ${colors.paleBlue};
  opacity: 1;
}
`;

export const Select = styled.select`
  width: 100%;
  height: 100%;
  background: ${colors.dark};
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  color: ${colors.paleBlue};
  appearance: none;
  cursor: pointer;
`;

export const BlueBorderInput = styled.div`
  position: relative;
  width: 100%;
  padding: 1px;
  border-radius: 5px;
  height: ${props => props.styles.height};
  margin: ${props => props.styles.margin};
  background: linear-gradient(340deg, ${colors.blue}, ${colors.darkBlue});
  ${props => props.select && css`
    &::after {
      right: 15px;
      top: 10px;
      content: '\\22CE';
      color: ${colors.paleBlue};
      position: absolute;
      z-index: 0;
      transition: 0.3s;
    }
  `}
`;
BlueBorderInput.defaultProps = {
  styles: {},
};

export const BlueButton = styled.button`
  cursor: pointer;
  width: ${props => props.styles.width || '100%'};
  height: ${props => props.styles.height || 'auto'};
  ${props => props.styles.margin && css`margin: ${props.styles.margin};`}
  background-color: ${colors.blue};
  position: relative;
  color: ${colors.light};
  border: none;
  border-radius: 40px;
  font-weight: bold;
  font-size: 20px;
`;
BlueButton.defaultProps = {
  styles: {},
};