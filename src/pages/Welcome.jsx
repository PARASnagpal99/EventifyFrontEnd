import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const WelcomeContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftColumn = styled.div`
  flex: 1;
  background-image: url('/EventifyXBackground.jpeg'); /* Update the path to your image */
  background-size: cover;
  background-position: center;
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa; /* Set background color for the right column */
  color: #333; /* Set text color for the right column */
  padding: 20px;
`;

const WelcomeHeading = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const WelcomeText = styled.p`
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 30px;
`;

const WelcomeLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const WelcomeLink = styled(Link)`
  text-decoration: none;
  padding: 15px 30px;
  background-color: #fff;
  color: #3498db;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #3498db;
    color: #fff;
  }
`;

const WelcomePage = () => {
  const Navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('auth');
    if (token) {
      Navigate('/');
    }
  }, []);

  return (
    <WelcomeContainer>
      <LeftColumn />
      <RightColumn>
        <WelcomeHeading>Welcome to EventifyX</WelcomeHeading>
        <WelcomeText>
          Discover exciting events and connect with people who share your interests.
        </WelcomeText>
        <WelcomeLinks>
          <WelcomeLink to="/login">Login</WelcomeLink>
          <WelcomeLink to="/signup">Signup</WelcomeLink>
        </WelcomeLinks>
      </RightColumn>
    </WelcomeContainer>
  );
};

export default WelcomePage;
