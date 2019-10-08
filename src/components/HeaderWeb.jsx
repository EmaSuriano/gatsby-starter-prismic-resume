import React from 'react';
import styled from '@emotion/styled';
import { MdFileDownload } from 'react-icons/md';
import { darken } from 'polished';
import theme from '../theme.json';

const MenusWrap = styled.div`
  position: absolute;
  right: -90px;
  top: 0;
`;

const HeaderMenu = styled.div`
  color: ${darken(0.4)(theme.background)};
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

const HeaderWeb = ({ name, contact }) => (
  <header style={{ position: 'relative' }}>
    <h1>{name}</h1>
    <MenusWrap>
      <a href="/static/cv.pdf" download={`${name} - CV`}>
        <HeaderMenu>
          <MdFileDownload size={24} />
          <h2>Download</h2>
        </HeaderMenu>
      </a>
    </MenusWrap>
  </header>
);

export default HeaderWeb;
