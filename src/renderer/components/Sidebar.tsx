import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div
  width: 200px;
  background-color: #2a2a2a;
  padding: 20px 0;
;

const NavItem = styled(NavLink)
  display: block;
  padding: 10px 20px;
  color: #cccccc;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background-color: #3a3a3a;
    color: #ffffff;
  }

  &.active {
    background-color: #1e90ff;
    color: #ffffff;
  }
;

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <NavItem to="/store">Store</NavItem>
      <NavItem to="/library">Library</NavItem>
      <NavItem to="/friends">Friends</NavItem>
      <NavItem to="/achievements">Achievements</NavItem>
      <NavItem to="/settings">Settings</NavItem>
    </SidebarContainer>
  );
};

export default Sidebar;
