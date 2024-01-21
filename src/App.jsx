import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/Signup/signup";
import { PrimeReactProvider } from "primereact/api";
import LoginPage from "./pages/Login/login";
import Profile from "./pages/Profile/profile";

import Home from "./pages/Home";
import Setting from "./pages/Setting";
import SingleEvent from "./pages/SingleEvent";
import PageNotFound from "./pages/PageNotFound";
import ContextProvider from "./context/ContextProvider";
import PrivateComponent from "./components/PrivateComponent";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import NavBar from "./components/NavBar";
import { useState } from "react";

function App() {
  const [city, setCity] = useState(null);
  const [interest, setInterest] = useState(null);
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const auth = localStorage.getItem("auth");

  return (
    <>
      <ContextProvider.Provider
        value={{
          city,
          interest,
          setCity,
          setInterest,
          eventData,
          setEventData,
          isLoading,
          setIsloading,
        }}
      >
        <PrimeReactProvider>
          <BrowserRouter>
            {auth && <NavBar />}
            <Routes>
              <Route element={<PrivateComponent />}>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/event/register/isregister=/:isRegister/:event_id" element={<SingleEvent />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
          </BrowserRouter>
        </PrimeReactProvider>
      </ContextProvider.Provider>
    </>
  );
}

export default App;
