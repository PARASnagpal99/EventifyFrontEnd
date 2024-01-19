import React from "react";
import styled from "styled-components";
import NavBar from "./NavBar";
import Events from "./Events";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const NavBarContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  margin-bottom: 20px; /* Adjust the margin as needed for the gap */
  
`;

const ScrollableSection = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px; 
  margin: 0 auto;
  &::-webkit-scrollbar {
    width: 0; /* Hide scrollbar for Chrome, Safari, and Opera */
  }
  scrollbar-width: thin;
`;

const AppLayout = () => {
  return (
    <AppContainer>
      <ScrollableSection>
        <Events />
      </ScrollableSection>
    </AppContainer>
  );
};

export default AppLayout;
