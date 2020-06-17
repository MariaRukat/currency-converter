import styled from 'styled-components';

export const Nav = styled.nav`
  margin: 2em 0;
  ul {
  height: 50px;
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a {
    color: #05386b;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.2em;
    margin: 0.25em 1.5em;
    &:hover {
      opacity: 0.7;
    }
  }
`;
