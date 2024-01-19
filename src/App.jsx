import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/Signup/signup';
import { PrimeReactProvider } from 'primereact/api';
import "/node_modules/primeflex/primeflex.css"
import 'primereact/resources/themes/lara-light-indigo/theme.css';  
import 'primeflex/primeflex.css';             
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';                      
import LoginPage from './pages/Login/login';
import Profile from './pages/Profile/profile' ;

function Home() {
  return <h1>Hello world</h1>;
}

function App() {
  return (
    <>
    <PrimeReactProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
    </>
  );
}

export default App;
