import React, { useState } from "react";
import styled, { ThemeProvider } from 'styled-components';
import ToggleButton from './components/Buttons/ToggleButton';
import { colorPrimaryA, textColorDark } from './theme';
import * as storage from './services/storage';

const Wrapper = styled.div`
  background-color: ${colorPrimaryA};
  flex: 1;
  flex-direction: column;
  display: flex;
  color: ${textColorDark};
  padding-top: 30px;
`;

export const MyThemeProvider = ({ children }) => {

  const themeFromStorage = storage.get('theme');

  const [themeState, setThemeState] = useState({
    mode: themeFromStorage || 'dark'
  });

  const toggle = () => {
    const mode = (themeState.mode === 'light' ? `dark` : `light`);
    storage.set('theme', mode);
    setThemeState({ mode: mode });
  };

  return (
    <ThemeProvider
      theme={{
        mode: themeState.mode
      }}>
      <Wrapper>
        <ToggleButton onClick={toggle} mode={themeState.mode}/>
        {children}
      </Wrapper>
    </ThemeProvider>
  );
};

