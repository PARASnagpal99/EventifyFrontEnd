import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import InterestsSection from "../../components/InterestsSection";
import { useNavigate } from "react-router-dom";
import { Card  } from "primereact/card";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ProfilePage() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
  });
  const [events, setEvents] = useState([]);
  //console.log(events);
  const navigate = useNavigate();
  const navigateToSettings = () => {
    navigate("/setting");
  };

  const fetchData = async () => {
    try {
      // Fetch user details from local storage
      const userId = JSON.parse(localStorage.getItem("user")).userId;
      const storedFirstName =
        JSON.parse(localStorage.getItem("user")).firstName || "";
      const storedLastName =
        JSON.parse(localStorage.getItem("user")).lastName || "";
      setUser({
        firstName: storedFirstName,
        lastName: storedLastName,
        interests: [],
      });

      // Fetch events from backend
      const eventsResponse = await axios.get(
        `http://localhost:3000/api/v1/user/userRegisteredEvents/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("auth")
            )}`,
          },
        }
      );
      //console.log(eventsResponse.data);
      const data = eventsResponse.data ;
      setEvents(data);

      // Hardcoded interest names (excluding the provided ones)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData(); 
    }, 60000); 
    return () => {
      clearInterval(intervalId); 
    };
  }, []);

  const unregisterEvent = async (event_id) => {
    try {
      const userId = JSON.parse(localStorage.getItem("user")).userId;
      const token = JSON.parse(localStorage.getItem("auth"));
  
      const headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      };
  
      const requestBody = {
        event_id: event_id,
      };
  
      const response = await axios.delete(
        `http://localhost:3000/api/v1/user/cancelUserRegistration/${userId}`,
        {
          headers: headers,
          data: requestBody,
        }
      );
  
      // Assuming the server responds with an updated list of events after unregistration
      const tempEvents = response.data.events;
      setEvents(tempEvents);
      toast.success('Successfully unregistered from the event!', {
        position: 'top-right',
        autoClose: 3000, // Set the duration for the toast
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      console.log(`Unregister from event with ID ${event_id}`);
    } catch (error) {
      console.error("Error unregistering from event:", error.response.data);
      toast.error('Error unregistering from the event!', {
        position: 'top-right',
        autoClose: 3000, // Set the duration for the toast
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  

  const cardStyle = {
    width: '300px',
    margin: 'auto',
    marginTop: '100px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  };

  const buttonStyle = {
    backgroundColor: '#3498db',
    color: '#fff',
    textDecoration: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    display: 'inline-block',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#2980b9',
  };

  //console.log("events" , events);
  return (
    <div className="profile-page">
      <div className="profile-box">
        <h2>Profile</h2>
        <div className="user-info">
          <p>Name: {`${user.firstName} ${user.lastName}`}</p>
          <p>Email: {JSON.parse(localStorage.getItem("user")).email || ""}</p>
        </div>
        <Button label="Change Account Details" onClick={navigateToSettings} />
      </div>

      <InterestsSection />

      <div className="events-section">
    <h2>Registered Events</h2>
    {events.length > 0 ? (
      <DataTable value={events} tableStyle={{ minWidth: "50rem" }}>
        <Column field="event_id" header="Event Id"></Column>
        <Column field="event_name" header="Name"></Column>
        <Column field="event_description" header="Category"></Column>
        <Column
          body={(rowData) => (
            <Button
              label="Unregister"
              icon="pi pi-times"
              onClick={() => {
                //console.log("rowData" , rowData.event_id);
                unregisterEvent(rowData.event_id)
              }}
              className="p-button-danger"
            />
          )}
        />
      </DataTable>
    ) : (
      <Card style={cardStyle}>
        <p>You have not registered for any event.</p>
       <Button
         label="Go to Home"
         className="p-button-raised"
         style={buttonStyle}
         hoverStyle={buttonHoverStyle}
         onClick={() => navigate('/')}
      />
    </Card>
    )}
  </div>
  <ToastContainer />
    </div>
  );
}
