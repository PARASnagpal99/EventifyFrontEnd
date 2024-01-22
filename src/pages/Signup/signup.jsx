import { Divider } from 'primereact/divider';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import '../Signup/signup.css';


export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const Navigate = useNavigate();
    const toast = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('auth');
        if (token) {
            Navigate('/');
        }
    }, []);

    const handleSignUp = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            await axios.post('http://localhost:3000/api/v1/user/signup', {
                email,
                firstName,
                lastName,
                password
            }, config);

            toast.current.show({
                severity: 'success',
                summary: 'Your Account has been created successfully. You will be redirected to the login page.'
            });

            setTimeout(() => {
                Navigate('/login');
            }, 1000);

        } catch (error) {
            console.error('Signup failed:', error.response.data);

            setErrors(error.response.data.errors || []);

            toast.current.show({ severity: 'error', summary: 'Error', detail: JSON.stringify(error.response.data.error) });
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
                <div className="back-to-welcome">
                    <Link to="/" className="back-link">Back to Welcome Page</Link>
                </div>
            </div>

            <Toast ref={toast} />

            {errors.length > 0 && (
                <div className="p-grid">
                    <div className="p-col-12">
                        <div className="p-messages p-component p-messages-error">
                            <ul>
                                {errors.map((error, index) => (
                                    <li key={index}>{error.msg}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
