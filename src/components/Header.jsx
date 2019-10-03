import React from 'react';
import styled from '@emotion/styled';

const MenusWrap = styled.div`
  position: absolute;
  right: -130px;
`;

const Header = ({ name, contact }) => (
  <header style={{ position: 'relative' }}>
    <MenusWrap>
      <a href="https://emasuriano.com">
        <div className="icon share-icon"></div>
        <span>Download</span>
      </a>
    </MenusWrap>
    <h1>{name}</h1>
  </header>
);

export default Header;
