import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import EventCard from "./EventCard";
import Spinner from "./Spinner";

import ContextProvider from "../context/ContextProvider";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const EventsContainer = styled.div`
  text-align: center;
`;

const Events = () => {

  const {eventData,isLoading} = useContext(ContextProvider);


  if(isLoading){
    console.log('Loading events');
    return <Spinner />
  }

  return (
      <EventsContainer>
        {eventData.map((item) => (
          <EventCard
            key={item._id} // Make sure to provide a unique key for each item in the array
            avatarSrc="path/to/avatar.jpg"
            title={item.event_name}
            description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Event ${item.event_description}`}
            onRegisterClick={() => alert(`Register clicked for Event ${item}!`)}
          />
        ))}
      </EventsContainer>
  );
};

export default Events;
