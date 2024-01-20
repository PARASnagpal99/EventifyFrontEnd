import { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import axios from 'axios';

import '../components/InterestsSection.css'; 

const hardcodedInterests = [
    { label: 'Music' },
    { label: 'Dance' },
    { label: 'Visual Arts' },
    { label: 'Literature' },
    { label: 'Sports' },
    { label: 'Cooking' },
    { label: 'Photography' },
    { label: 'Travel' },
    { label: 'Gardening' },
    { label: 'Technology' },
];

const InterestsSection = () => {
    const [userInterests, setUserInterests] = useState([]);
    const [selectedInterest, setSelectedInterest] = useState(null);
    const userId = JSON.parse(localStorage.getItem('user')).userId;
    const toast = useRef(null);

    useEffect(() => {
        fetchUserInterests();
    }, []);

    const fetchUserInterests = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/user/userInterest/${userId}`,{
                headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${JSON.parse(
                    localStorage.getItem("auth")
                  )}`,
                },
              });
            setUserInterests(response.data || []);
        } catch (error) {
            console.error('Error fetching user interests:', error);
        }
    };

    const addInterest = async () => {
        try {
            const apiUrl = `http://localhost:3000/api/v1/user/addInterest/${userId}`;

            if (!selectedInterest || !selectedInterest.label) {
                console.error('Invalid selected interest');
                return;
            }

            const response = await axios.put(apiUrl, {
                interest: selectedInterest.label
            },{
                headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${JSON.parse(
                    localStorage.getItem("auth")
                  )}`,
                },
              });

            if (response.status === 200) {
                fetchUserInterests();

                toast.current.show({
                    severity: 'success',
                    summary: 'Interest Added',
                    detail: `Added interest: ${selectedInterest.label}`,
                    life: 3000,
                });
            }else if(response.status === 202){
                console.log("Interest already exists")
                toast.current.show({
                    severity: 'warning',
                    summary: 'Interset Already Exists',
                    detail: `Warning Interset Already Exists: ${selectedInterest.label}`,
                    life: 3000,
                });
            } 
            else {
                console.log("Interest already exists222222")
                console.error('Error adding interest. API response:', response.data);
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to add interest. Please try again.',
                    life: 3000,
                });
            }
        } catch (error) {
            console.error('Error adding interest:', error);

            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to add interest. Please try again.',
                life: 3000,
            });
        }
    };

    const removeInterest = async (interestToRemove) => {
        console.log(interestToRemove)
        try {
            await axios.put(`http://localhost:3000/api/v1/user/removeInterest/${userId}`, {
                interest: interestToRemove,
            },{
                headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${JSON.parse(
                    localStorage.getItem("auth")
                  )}`,
                },
              });

            fetchUserInterests();

            toast.current.show({
                severity: 'success',
                summary: 'Interest Removed',
                detail: `Removed interest: ${interestToRemove}`,
                life: 3000,
            });
        } catch (error) {
            console.error('Error removing interest:', error);

            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to remove interest. Please try again.',
                life: 3000,
            });
        }
    };

    return (
        <div className="interests-section">
        <div className="header">
        <h1>My Interests</h1>
        <div className="header-controls">
            <div className="dropdown-container">
                <label className="dropdown-label">Select Interest:</label>
                <div className="dropdown-wrapper">
                    <Dropdown
                        value={selectedInterest}
                        options={hardcodedInterests}
                        onChange={(e) => setSelectedInterest(e.value)}
                        placeholder="Choose an Interest"
                        className="p-dropdown-custom"
                    />
                </div>
            </div>
            <Button
                label="Add Interest"
                icon="pi pi-check"
                className="p-button-primary"
                onClick={() => addInterest()}
                disabled={!selectedInterest}
            />
        </div>
    </div>
    

 <div className="interests-container">
    {userInterests && userInterests.length > 0 ? (
        userInterests.map((interest) => (
            <Card
                key={interest}
                className="p-card-custom p-mb-3 p-mr-3"
                header={
                    <div className="card-header">
                        <Button
                            icon="pi pi-times"
                            className="p-button-rounded p-button-danger"
                            tooltip="Remove Interest"
                            tooltipOptions={{ position: 'top' }}
                            onClick={() => removeInterest(interest)}
                        />
                    </div>
                }
            >
                <div className="card-content">
                    <h2 className="card-title">{interest}</h2>
                </div>
            </Card>
          ))
      ) : (
         <h1>No Interests Added Yet</h1>
      )}
   </div>

            <Toast ref={toast} />
        </div>
    );
};

export default InterestsSection;
