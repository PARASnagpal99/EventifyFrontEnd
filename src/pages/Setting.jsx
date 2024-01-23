import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast , ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const Setting = () => {
  const [name, setName] = useState(JSON.parse(localStorage.getItem('user')).firstName + ' ' + JSON.parse(localStorage.getItem('user')).lastName);
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem('user')).email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleCurrentPasswordChange = (e) => setCurrentPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);

  const handleSaveChanges = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user")).userId;
      const token = JSON.parse(localStorage.getItem("auth"));
      
      const requestBody = {
        newPassword: newPassword,
        oldPassword: currentPassword,
      };
  
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
  
      const response = await axios.put(
        `http://localhost:3000/api/v1/user/changePassword/${userId}`,
        requestBody, 
        {
          headers: headers,
        }
      );
  
      const { message } = response.data;
      toast.success(message);
    } catch (error) {
      console.error("Error Changing the password ", error.response.data);
      toast.error("Error changing password");
    }
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

      <ToastContainer/>
    </SettingsContainer>
  );
};

export default Setting;
