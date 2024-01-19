import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import InterestsSection from '../../components/InterestsSection';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
    });
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const navigateToSettings = () => {
        navigate('/settings');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user details from local storage
                const storedFirstName = localStorage.getItem('firstName') || '';
                const storedLastName = localStorage.getItem('lastName') || '';
                setUser({
                    firstName: storedFirstName,
                    lastName: storedLastName,
                    interests: [],
                });

                // Fetch events from backend
                const eventsResponse = await axios.get(`http://localhost:3000/api/v1/user/userRegisteredEvents/${localStorage.getItem('userId')}`);
                setEvents(eventsResponse.data);

                // Hardcoded interest names (excluding the provided ones)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const unregisterEvent = async (eventId) => {
        try {
            // Logic to unregister from the event
            console.log(`Unregister from event with ID ${eventId}`);
        } catch (error) {
            console.error('Error unregistering from event:', error);
        }
    };

    return (
        <div className="profile-page">
            <div className="profile-box">
                <h2>Profile</h2>
                <div className="user-info">
                    <p>Name: {`${user.firstName} ${user.lastName}`}</p>
                     <p>Email: {localStorage.getItem('email')}</p>
                </div>
                <Button label="Change Account Details" onClick={navigateToSettings} />
            </div>

            <InterestsSection/>
           

            <div className="events-section">
                <h2>Registered Events</h2>
                <DataTable value={events} className="p-datatable-striped">
                    <Column field="name" header="Event Name" />
                    <Column field="date" header="Event Date" />
                    <Column
                        body={(rowData) => (
                            <Button
                                label="Unregister"
                                icon="pi pi-times"
                                onClick={() => unregisterEvent(rowData.id)}
                                className="p-button-danger"
                            />
                        )}
                    />
                </DataTable>
            </div>
        </div>
    );
}
