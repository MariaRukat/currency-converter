import styled from "styled-components";

export const Button = styled.button`
  border: 1px solid #05386b;
  background: ${props => props.light ? '#ffffff' : '#05386b'};
  color: ${props => props.light ? '#05386b' : '#ffffff'};
  border-radius: 0.25em;
  padding: 0.5em 0.75em;
  cursor: pointer;
  outline: none;
  font-size: 1em;
`;
