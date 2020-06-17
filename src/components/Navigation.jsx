import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from './styledElements/Nav';

export const Navigation = () => (
  <Nav>
    <ul>
      <li>
        <Link to="/">Przelicz waluty</Link>
      </li>
      <li>
        <Link to="/history">Zobacz historię</Link>
      </li>
    </ul>
  </Nav>
);
