import { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const SettingsContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

// Component
const Setting = () => {

  const [name, setName] = useState(JSON.parse(localStorage.getItem('user')).firstName + ' ' + JSON.parse(localStorage.getItem('user')).lastName);
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem('user')).email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleCurrentPasswordChange = (e) => setCurrentPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);

  const handleSaveChanges = () => {
    // Add logic to save changes (e.g., make API calls)
    console.log('Changes saved!');
  };

  const handleDeleteAccount = () => {
    // Add logic to delete user account (e.g., make API calls)
    console.log('Account deleted!');
  };

  return (
    <SettingsContainer>
      <SectionTitle>User Details</SectionTitle>
      <FormGroup>
        <Label>Name:</Label>
        <Input type="text" value={name} onChange={handleNameChange} disabled />
      </FormGroup>
      <FormGroup>
        <Label>Email:</Label>
        <Input type="email" value={email} onChange={handleEmailChange} disabled />
      </FormGroup>

      <SectionTitle>Change Password</SectionTitle>
      <FormGroup>
        <Label>Current Password:</Label>
        <Input type="password" value={currentPassword} onChange={handleCurrentPasswordChange} />
      </FormGroup>
      <FormGroup>
        <Label>New Password:</Label>
        <Input type="password" value={newPassword} onChange={handleNewPasswordChange} />
      </FormGroup>
      <Button onClick={handleSaveChanges}>Save Changes</Button>

      <SectionTitle>Delete Account</SectionTitle>
      <p>Once you delete your account, all your data will be lost. This action cannot be undone.</p>
      <Button onClick={handleDeleteAccount} style={{ backgroundColor: '#f44336' }}>
        Delete Account
      </Button>
    </SettingsContainer>
  );
};

export default Setting;
