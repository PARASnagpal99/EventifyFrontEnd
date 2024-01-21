// Import necessary libraries
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../components/Spinner";
import { Button } from "primereact/button";

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
  console.log(event_id);

  useEffect(() => {
    const fetchEventById = async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/events/getEventBy/${event_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}`,
          },
        }
      );
      const data = await response.json();
      setEvent(data);
      console.log(data);
      setIsloading(false);
    };
    fetchEventById();
  }, []);

  const handleRegisteruser = async () => {
    const userId = JSON.parse(localStorage.getItem("user")).userId;
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
            <Button label="Register" onClick={handleRegisteruser} />
          </div>
        </CardContainer>

        {/* Right Side */}
        <UserListContainer>
          <h2>Registered Users</h2>
          {userList.map((user, index) => (
            <UserListItem key={index}>
              <span>{user.name}</span>
              <div className="card flex justify-content-center">
                <Button label="Add friend" />
              </div>
            </UserListItem>
          ))}
        </UserListContainer>
      </PageContainer>
    </Container>
  );
};

export default SingleEvent;
