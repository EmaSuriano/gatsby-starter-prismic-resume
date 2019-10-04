import React from 'react';
import styled from '@emotion/styled';
import { MdFileDownload } from 'react-icons/md';

const MenusWrap = styled.div`
  position: absolute;
  right: -130px;
`;

const HeaderMenu = styled.div`
  color: #a1a5a7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.7;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

const Header = ({ name, contact, showMenu }) => (
  <header style={{ position: 'relative' }}>
    {showMenu && (
      <MenusWrap>
        <a href="/static/cv.pdf" download={`${name} - CV`}>
          <HeaderMenu>
            <MdFileDownload size={24} />
            <h2>Download</h2>
          </HeaderMenu>
        </a>
      </MenusWrap>
    )}
    <h1>{name}</h1>
  </header>
);

export default Header;
