import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../store/authSlice';
import TitleBar from './TitleBar';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { UpdateNotifier } from './UpdateNotifier';
import AuthModal from './AuthModal';
import styled from 'styled-components';

const AppContainer = styled.div
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #1a1a1a;
;

const ContentContainer = styled.div
  display: flex;
  flex: 1;
  overflow: hidden;
;

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
      <AppContainer>
          <TitleBar />
          <ContentContainer>
              <Sidebar />
              <MainContent />
          </ContentContainer>
          <AuthModal />
          <UpdateNotifier />
      </AppContainer>
  );
};

export default App;
