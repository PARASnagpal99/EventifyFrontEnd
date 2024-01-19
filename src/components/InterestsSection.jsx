import { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import axios from 'axios';

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
    const toast = useRef(null);

    useEffect(() => {
        // Fetch user interests from backend (replace with actual API call)
        fetchUserInterests();
    }, []);

    const fetchUserInterests = async () => {
        try {
            // Placeholder URL, replace with your actual backend URL
            const response = await axios.get(`http://localhost:3000/api/v1/user/userInterest/${localStorage.getItem('userId')}`);

            // Assuming the response contains the user interests as an array
            setUserInterests(response.data || []);
        } catch (error) {
            console.error('Error fetching user interests:', error);
        }
    };

    const addInterest = async () => {
        try {
            const userId = localStorage.getItem('userId');
            console.log(userId);
            const apiUrl = `http://localhost:3000/api/v1/user/addInterest/${userId}`;
            
            // Check if a valid interest is selected
            if (!selectedInterest || !selectedInterest.label) {
                console.error('Invalid selected interest');
                return;
            }
    
            // Make the API call to add the interest
            const response = await axios.put(apiUrl, {
                interest: selectedInterest.label
            });
            console.log(response);
            // Check if the API call was successful
            if (response.status === 200) {
                // Fetch updated user interests
                fetchUserInterests();
    
                // Display success toast
                toast.current.show({
                    severity: 'success',
                    summary: 'Interest Added',
                    detail: `Added interest: ${selectedInterest.label}`,
                    life: 3000,
                });
            } else {
                // Display error toast if the API call was not successful
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
    
            // Display error toast for unexpected errors
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to add interest. Please try again.',
                life: 3000,
            });
        }
    };
    
    const removeInterest = async (interestToRemove) => {
        try {
            // Placeholder URL, replace with your actual backend URL
            await axios.post('YOUR_BACKEND_API_URL/removeInterest', {
                interest: interestToRemove,
            });

            // Fetch updated user interests
            fetchUserInterests();

            // Display success toast
            toast.current.show({
                severity: 'success',
                summary: 'Interest Removed',
                detail: `Removed interest: ${interestToRemove}`,
                life: 3000,
            });
        } catch (error) {
            console.error('Error removing interest:', error);

            // Display error toast
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
                <h1>Add Interests</h1>
                <Dropdown
                    value={selectedInterest}
                    options={hardcodedInterests}
                    onChange={(e) => setSelectedInterest(e.value)}
                    placeholder="Select Interest"
                    className="p-mb-2"
                />
                <Button
                    label="Add Interest"
                    icon="pi pi-plus"
                    className="p-button-secondary"
                    onClick={() => addInterest()}
                    disabled={!selectedInterest}
                />
            </div>

            <div className="interests-container">
                {userInterests && userInterests.length > 0 ? userInterests.map((interest) => (
                    <Card
                        key={interest}
                        title={interest}
                        className="p-mb-3 p-mr-3"
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
                    />
                )) : <h1>No Interests Added Yet</h1>}
            </div>
            <Toast ref={toast} />
        </div>
    );
};

export default InterestsSection;
