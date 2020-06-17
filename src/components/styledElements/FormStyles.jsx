import styled from 'styled-components';

export const FormStyles = styled.form`
  display: grid;
  grid-template-columns: 100px auto;
  grid-row-gap: 0.5em;
  .inputBox {
    display: flex;
    flex-direction: column;
    span {
      font-size: 0.75em;
      color: #8b0000;
      margin: 0.25em;
    }
  }
  label {
    line-height: 2.5em;
  }
  select {
    padding: 0.75em;
  }
  input {
    padding: 0.75em;
  }
`;
