import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import StorePage from '../pages/StorePage';
import LibraryPage from '../pages/LibraryPage';
import FriendsPage from '../pages/FriendsPage';
import AchievementsPage from '../pages/AchievementsPage';
import SettingsPage from '../pages/SettingsPage';

const Content = styled.div
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #1a1a1a;
;

const MainContent: React.FC = () => {
  return (
    <Content>
      <Routes>
        <Route path="/store" element={<StorePage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<StorePage />} />
      </Routes>
    </Content>
  );
};

export default MainContent;
