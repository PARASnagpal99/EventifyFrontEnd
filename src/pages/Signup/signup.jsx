import { Divider } from 'primereact/divider';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';  // Import Axios
import "../Signup/signup.css";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            const config = {
                headers : {
                  'Content-Type' : 'application/json'
                }
              }
            const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
                email,
                firstName,
                lastName,
                password,
            },config);

            // Handle success
            console.log("Signup successful:", response.data);

            // Redirect to login page after successful signup
            Navigate('/login');
        } catch (error) {
            // Handle error
            console.error("Signup failed:", error.response.data);
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-card">
                <div className="signup-form">
                    <div className="input-group">
                        <label>Email</label>
                        <InputText id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="p-inputtext" />
                    </div>
                    <div className="input-group">
                        <label>First Name</label>
                        <InputText id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="p-inputtext" />
                    </div>
                    <div className="input-group">
                        <label>Last Name</label>
                        <InputText id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="p-inputtext" />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <InputText id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-inputtext" />
                    </div>
                    <Button label="Sign Up" icon="pi pi-user-plus" type="submit" className="p-button-success" onClick={handleSignUp} />
                </div>
                <div className="divider-container">
                    <Divider layout="vertical">
                        <b>OR</b>
                    </Divider>
                </div>
                <div className="login-section">
                    <Button label="Login" icon="pi pi-user" className="p-button-secondary" onClick={() => Navigate('/login')} />
                </div>
            </div>
        </div>
    );
}
