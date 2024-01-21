import { Divider } from 'primereact/divider';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import '../Login/login.css';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const toast = useRef(null);

    const handleLogin = async () => {
        try {
            console.log(email, password);
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.post('http://localhost:3000/api/v1/user/login', { email, password }, config);
            const { user, auth } = response.data;

            // Store user details in local storage
            console.log(user, auth);
            if (auth) {
                localStorage.setItem('user', JSON.stringify(user))
                localStorage.setItem('auth', JSON.stringify(auth));
                navigate('/');
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.error("Login failed:", error.response.data);

            // Show errors using Toast
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Login failed. Please check your credentials and try again.' });
        }
    };

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-form">
                    <div className="input-group">
                        <label>Email</label>
                        <InputText
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-inputtext"
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <InputText
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-inputtext"
                        />
                    </div>
                    <Button label="Login" icon="pi pi-user" className="p-button-primary" onClick={handleLogin} />
                </div>
                <div className="divider-container">
                    <Divider layout="vertical">
                        <b>OR</b>
                    </Divider>
                </div>
                <div className="signup-section">
                    <Button label="Sign Up" icon="pi pi-user-plus" className="p-button-secondary" onClick={handleSignUpClick} />
                </div>
            </div>

            {/* Toast component for displaying errors */}
            <Toast ref={toast} />
        </div>
    );
}
