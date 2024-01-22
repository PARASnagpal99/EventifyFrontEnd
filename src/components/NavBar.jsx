import { useContext, useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { FcCancel } from "react-icons/fc";
import styled from "styled-components";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ContextProvider from "../context/ContextProvider";

// Styled Components
const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #14e0c2;
  color: white;
`;

const Logo = styled.img`
  height: 40px;
`;

const CenterSection = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled(InputText)`
  margin: 0 10px;
  width: 200px;
  padding: 10px;
`;

const Select = styled(Dropdown)`
  margin: 0 10px;
  width: 200px;
`;

// const SubmitButton = styled(Button)`
//   width: 150px;
//   height: 40px;
//   font-size: 16px;
//   margin-left: 10px;
// `;

const AvatarContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const AvatarIcon = styled(RxAvatar)`
  font-size: 2rem;
  color: #fff;
  margin-left: 10px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #2c3e50;
  padding: 10px;
  display: ${(props) => (props.showMenu ? "block" : "none")};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  color: #fff;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #34495e;
    }

    a {
      text-decoration: none;
      color: #fff;
      font-weight: bold;
    }
  }
`;

// Component

const cities = [
  { name: "Mumbai" },
  { name: "Delhi" },
  { name: "Bangalore" },
  { name: "Hyderabad" },
  { name: "Chennai" },
  { name: "Kolkata" },
  { name: "Pune" },
  { name: "Ahmedabad" },
  { name: "Jaipur" },
  { name: "Surat" },
];

// const interests = [
//   { name: "Music" },
//   { name: "Dance" },
//   { name: "Visual Arts" },
//   { name: "Literature" },
//   { name: "Sports" },
//   { name: "Cooking" },
//   { name: "Photography" },
//   { name: "Travel" },
//   { name: "Gardening" },
//   { name: "Technology" },
// ];

const NavBar = () => {


  const [showMenu, setShowMenu] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedInterest, setSelectedInterest] = useState(null);
  const [userInterset, setUserInterest] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPageUrl = location.pathname + location.search;
  console.log(currentPageUrl);

  console.log(selectedCity, selectedInterest);

  const {setCity, setInterest, setEventData } =
    useContext(ContextProvider);

  const clearFilter = () => {
    setCity(null);
    setInterest(null);
    setSelectedCity(null);
    setSelectedInterest(null);
  };

  const handleAvatarClick = () => {
    setShowMenu(!showMenu);
  };

  const logout = () => {
    console.log("Logout");
    localStorage.clear();
    setShowMenu(!showMenu);
  };

  const onChangeCity = (event) => {
    console.log(event.target.value.name);
    setSelectedCity(event.value);
    setCity(event.target.value.name);
  };

  const onChangeInterest = (event) => {
    console.log(event.target.value.name);
    setSelectedInterest(event.value);
    setInterest(event.target.value.name);
  };

  const handleSearch = async (event) => {
    console.log(event.target.value);
    const searchTerm = event.target.value;
    if (searchTerm.trim() === "") return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/events/search/eventByName?query=${searchTerm}`,{
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("auth")
            )}`,
          },
        }
      );
      const data = await response.json();
      setEventData(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // if (searchTerm.trim() !== "") {
  //   fetchSearchResults();
  // } else {
  //   setSearchResults([]);
  // }

  useEffect(() => {
    const fetchInterest = async () => {
      const userId = JSON.parse(localStorage.getItem("user")).userId;
      console.log(userId)
      const response = await fetch(
        `http://localhost:3000/api/v1/user/userInterest/${userId}`,{
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("auth")
            )}`,
          },
        }
      );
      const interests = await response.json();
      console.log(interests);
      const interestArray = [];

      for (let i = 0; i < interests.length; i++) {
        interestArray.push({ name: interests[i] });
      }
      setUserInterest(interestArray);
      localStorage.setItem("userInterest", JSON.stringify(interestArray));
    };

    const auth = JSON.parse(localStorage.getItem("auth"));
    auth && fetchInterest();
  }, []);

  return (
    <NavBarContainer>
    <Link to="/">
       <Logo src="/logo2.jpeg" alt="Logo" style={{ width: '55px', height: '55px' }} />
     </Link>
      {currentPageUrl === "/" && (
        <CenterSection>
          <SearchInput placeholder="Search" onChange={handleSearch} />
          <Select
            value={selectedCity}
            onChange={onChangeCity}
            options={cities}
            optionLabel="name"
            placeholder="Select a City"
          />
          <Select
            value={selectedInterest}
            onChange={onChangeInterest}
            options={userInterset}
            optionLabel="name"
            placeholder="Select an Interest"
          />
          {(selectedCity || selectedInterest) && (
            <FcCancel style={{ fontSize: "2rem" }} onClick={clearFilter} />
          )}

          {/* <SubmitButton label="Submit" /> */}
        </CenterSection>
      )}
      <AvatarContainer>
        <AvatarIcon onClick={handleAvatarClick} />
        <DropdownMenu showMenu={showMenu}>
          <ul>
            <li>
              <Link to="/profile" onClick={()=>{setShowMenu(!showMenu)}}>Profile</Link>
            </li>
            <li>
              <Link to="/setting" onClick={()=>{setShowMenu(!showMenu)}} >Settings</Link>
            </li>
            <li>
              <Link onClick={logout} to="/login">
                Logout
              </Link>
            </li>
          </ul>
        </DropdownMenu>
      </AvatarContainer>
    </NavBarContainer>
  );
};

export default NavBar;
