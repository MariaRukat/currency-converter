import React from 'react';
import styled from 'styled-components';

export const EmptyList = styled(props => (
  <p {...props}>Brak zapisanych konwersji.</p>
))`
  text-align: center;
  margin: 2em;
`;
