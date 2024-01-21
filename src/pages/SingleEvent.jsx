// Import necessary libraries
import React from "react";
import styled from "styled-components";

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
  margin: auto 100px;
  height: 100vh;
`;
const PageContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  width:100%;
`;

const CardContainer = styled.div`
  max-width: 500px;
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
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;

  &:last-child {
    border-bottom: none;
  }
`;

// Main component
const SingleEvent = () => {
  return (
    <Container>
      <PageContainer>
        {/* Left Side */}
        <CardContainer>
          <img src={cardData.imageUrl} alt="Card" style={{ width: "400px", height: "250px" }} />
          <h2>{cardData.title}</h2>
          <p>{cardData.description}</p>
          <button>Register</button>
        </CardContainer>

        {/* Right Side */}
        <UserListContainer>
          <h2>Registered Users</h2>
          {userList.map((user, index) => (
            <UserListItem key={index}>
              <span>{user.name}</span>
              <button>{user.status}</button>
            </UserListItem>
          ))}
        </UserListContainer>
      </PageContainer>
    </Container>
  );
};

export default SingleEvent;
