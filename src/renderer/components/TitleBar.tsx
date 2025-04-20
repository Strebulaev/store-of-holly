import React from 'react';
import { ipcRenderer } from 'electron';
import styled from 'styled-components';

const TitleBarContainer = styled.div
  height: 30px;
  background-color: #2a2a2a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  -webkit-app-region: drag;
;

const Title = styled.div
  color: #ffffff;
  font-size: 12px;
;

const WindowControls = styled.div
  display: flex;
  -webkit-app-region: no-drag;
;

const ControlButton = styled.button
  background: none;
  border: none;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  padding: 0 10px;
  height: 30px;

  &:hover {
    background-color: #3a3a3a;
  }
;

const CloseButton = styled(ControlButton)
  &:hover {
    background-color: #e81123;
  }
;

const TitleBar: React.FC = () => {
  return (
    <TitleBarContainer>
      <Title>Store Of Holly</Title>
      <WindowControls>
        <ControlButton onClick={() => ipcRenderer.send('minimize-window')}>
          &minus;
        </ControlButton>
        <ControlButton onClick={() => ipcRenderer.send('maximize-window')}>
          □
        </ControlButton>
        <CloseButton onClick={() => ipcRenderer.send('close-window')}>
          ×
        </CloseButton>
      </WindowControls>
    </TitleBarContainer>
  );
};

export default TitleBar;
