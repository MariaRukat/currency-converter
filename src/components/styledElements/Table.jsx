import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  td, th {
    border: 1px solid #dddddd;
    padding: 0.75em 0.5em;
    text-align: left;
  }
  .numberCell {
    text-align: right;
  }
`;
