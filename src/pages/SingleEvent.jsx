// Import necessary libraries
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../components/Spinner";
import { Button } from "primereact/button";
import ContextProvider from "../context/ContextProvider";

// Dummy data for the card and user list
const cardData = {
  title: "Lorem Ipsum",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.  ",
  imageUrl: "https://placekitten.com/200/300", // Replace with your image URL
};

const userList = [
  { name: "Ritesh", status: "Add Friend" },
  { name: "John", status: "Add Friend" },
  { name: "Jane", status: "Add Friend" },
];

// Styled components
const Container = styled.div`
  ${"" /* margin: auto 100px; */}
  height: 100vh;
`;
const PageContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  width: 100%;
`;

const CardContainer = styled.div`
  max-width: 800px;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const UserListContainer = styled(CardContainer)`
  width: 400px;
  margin: 20px;
`;

const UserListItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
`;

// Main component
const SingleEvent = () => {
  const [event, setEvent] = useState();
  const { event_id } = useParams();
  const [isLoading, setIsloading] = useState(true);
  const [registerUser, setRegisterUser] = useState([]);
  const [friendIds, setFriendIds] = useState(new Set());
  const [change,setChange] = useState(true);

  // const { isRegister, setIsRegister } = useContext(ContextProvider);
  const [isregister, setIsRegister] = useState(false);
  console.log(isregister);
  // console.log("IsRegister: " + isRegister);

  const userId = JSON.parse(localStorage.getItem("user")).userId;

  const getRegisterUserForEvent = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/events/getUserForEvent/${event_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.message === "NODATA") {
        setRegisterUser([]);
      } else {
        setRegisterUser(data);
      }
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  };

  const getFriend = async ()=>{
    try {
      const response = await fetch(`http://localhost:3000/api/v1/user/getUserFriends/${userId}`,{
         headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}`,
      }});
      const result = await response.json();
      console.log(result);
  
      if (response.ok) {
        console.log('User friends:', result);
        const friendIdsSet = new Set(result.friends);
        setFriendIds(friendIdsSet);
        // Handle the friendIds as needed
      } else {
        console.error('Error fetching user friends:', result.error);
        // Handle the error accordingly
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Handle other types of errors
    }
  }

  useEffect(() => {
    getRegisterUserForEvent();
  }, [isregister]);

  useEffect(() => {
    getFriend();
  },[change])

  useEffect(() => {
    const fetchEventById = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/events/getEventBy/${event_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${JSON.parse(
                localStorage.getItem("auth")
              )}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setEvent(data);
        setIsloading(false);
        const currentValue = JSON.parse(localStorage.getItem("registeredUser"));
        const isEventIdRegistered = currentValue.includes(event_id);

        console.log("Is event_id in the set?", isEventIdRegistered);
        setIsRegister(isEventIdRegistered);

      } catch (error) {
        console.error("Error:", error.message);
        throw error; // or handle the error as needed
      }
    };
    fetchEventById();
    getRegisterUserForEvent();
    getFriend();
  }, []);

  const handleRegisteruser = async () => {
    const { event_name, event_description, event_id, event_url } = event;
    console.log(event_name, event_description, event_id, event_url);
    const response = await fetch(
      `http://localhost:3000/api/v1/user/registerEvent/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}`,
        },
        body: JSON.stringify({
          event_name,
          event_description,
          event_id,
          event_url,
        }),
      }
    );
    const result = await response.json();
    console.log(result);
    alert("Registration done");
    const storedValues = JSON.parse(localStorage.getItem("registeredUser")) || [];

    const newValue = event_id;
    storedValues.push(newValue);

    localStorage.setItem("registeredUser", JSON.stringify(storedValues));

    setIsRegister(true); 

  };

  const handleAddFriend = async (user) => {
    try {
      const friendId = user.userId; 
      const name = user.name; 
      //console.log(friendId,name);
      const response = await fetch(`http://localhost:3000/api/v1/user/addFriend/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}`,
        },
        body: JSON.stringify({ friendId, name }),
      });
  
      const result = await response.json();
  
      if (response.ok && response.message=="Success") {
        console.log('Friend added successfully');
        alert('Friend added successfully');
        // Handle any additional logic here
      } else {
        console.error('Error adding friend:', result.error);
        alert(result.message);
        // Handle error accordingly
      }
      setChange(!change);
      
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      <PageContainer>
        {/* Left Side */}
        <CardContainer>
          <img
            src={cardData.imageUrl}
            alt="Card"
            style={{ width: "400px", height: "250px" }}
          />
          <h2>{event.event_name}</h2>
          <p>{event.event_description}</p>
          <div className="card flex justify-content-center">
            <Button
              label={isregister ? "Already Registered" : "Register"}
              onClick={handleRegisteruser}
              disabled={isregister ? true : false}
            />
          </div>
        </CardContainer>

        {/* Right Side */}
        <UserListContainer>
          <h2>Registered Users</h2>
          {registerUser && registerUser.length > 0 ? (
            registerUser.map((user, index) => (
              <UserListItem key={index}>
                <span>{user.name}</span>
                <div className="card flex justify-content-center">
                  <Button
                    label={user.userId === userId ? "You" : friendIds.has(user.userId)? "Friend":"Add Friend"}
                    onClick={()=>{handleAddFriend(user)}}
                    disabled={user.userId === userId || friendIds.has(user.userId)}
                  />
                </div>
              </UserListItem>
            ))
          ) : (
            <p>No users yet.</p>
          )}
        </UserListContainer>
      </PageContainer>
    </Container>
  );
};

export default SingleEvent;