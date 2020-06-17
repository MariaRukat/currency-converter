import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyles} from './styles/GlobalStyles';
import { Main } from './components/Main';
import { Navigation } from './components/Navigation';
import { Container } from './components/styledElements/Container';

export const App = () => (
  <>
    <GlobalStyles />
    <BrowserRouter>
      <Navigation />
      <Container>
        <Main />
      </Container>
    </BrowserRouter>
  </>
);
