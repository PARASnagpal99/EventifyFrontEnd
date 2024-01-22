import  { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import EventCard from "./EventCard";
import Spinner from "./Spinner";

import ContextProvider from "../context/ContextProvider";

// const CenteredContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
// `;

const EventsContainer = styled.div`
  text-align: center;
`;

const Events = () => {

  const {eventData,isLoading} = useContext(ContextProvider);
  const [eventIds, setEventIds] = useState(new Set());
  const userId = JSON.parse(localStorage.getItem("user")).userId;

  const fetchEventIds = async ()=>{
    try {
      const response = await fetch(`http://localhost:3000/api/v1/user/getEventIdofUser/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const eventIdsArray = await response.json();
      const eventIdsSet = new Set(eventIdsArray);
  
      setEventIds(eventIdsSet);

      console.log(eventIdsSet);
      console.log('Event IDs Set:', eventIdsSet);
    } catch (error) {
      console.error('Error:', error.message);
      setEventIds(new Set()); 
    }
  }

  useEffect(() => {
    fetchEventIds();
  }, []);


  if(isLoading){
    console.log('Loading events');
    return <Spinner />
  }

  return (
      <EventsContainer>
        {eventData.map((item) => (
          <EventCard
            key={item._id} // Make sure to provide a unique key for each item in the array
            event_id = {item.event_id}
            avatarSrc="path/to/avatar.jpg"
            title={item.event_name}
            description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Event ${item.event_description}`}
            onRegisterClick={() => alert(`Register clicked for Event ${item}!`)}
            isRegister={eventIds.has(item.event_id)}
          />
        ))}
      </EventsContainer>
  );
};

export default Events;
