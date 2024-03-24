import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import styled from 'styled-components';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AdminDashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.div`
  width: 400px;
  margin-top: 50px;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
`;

const FormItem = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const UploadLabel = styled.label`
  display: inline-block;
  margin-bottom: 10px;
  color: #333;
  cursor: pointer;
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 5px;
`;

const AdminDashboard = () => {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedVenue, setSelectedVenue] = useState('');
  const [imageS3Key , setImageS3Key] = useState('');
  const [error, setError] = useState('');

  // Dummy data for dropdowns
  const categories = [
    { label: 'Music', value: '101' },
    { label: 'Dance', value: '102' },
    { label: 'Visual Arts', value: '103' },
    { label : 'Literature' , value : '104'} ,
    { label : 'Sports' , value : '105'} ,
    { label : 'Cooking' , value : '106'} ,
    { label : 'Photography' , value : '107'} ,
    { label : 'Travel' , value : '108'} ,
    { label : 'Gardening' , value : '109'} ,
    { label : 'Technology' , value : '110'}
  ];

  const venues = [
    { label: 'Mumbai', value: '1001' },
    { label: 'Delhi', value: '1002' },
    { label: 'Bengaluru', value: '1003' },
    { label : 'Hyderabad' , value : '1004'} ,
    { label : 'Chennai' , value : '1005'} ,
    { label : 'Kolkata' , value : '1006'} ,
    { label : 'Pune' , value : '1007'} ,
    { label : 'Ahmedabad' , value : '1008'} ,
    { label : 'Jaipur' , value : '1009'} , 
    { label : 'Surat' , value : '1010'} 
  ];

  const validateInputs = () => {
    if (!eventName || !description || !start || !end || !selectedCategory || !selectedVenue || !imageS3Key) {
      setError('Please fill in all fields');
      toast.error('Please Fill in all fields');
      return false;
    }
    setError('');
    return true;
  };
 
  useEffect(()=>{
     localStorage.removeItem('eventImage');
  },[])

  const resetFields =()=>{
        setEventName('');
        setDescription('');
        setStart('');
        setEnd('');
        setSelectedCategory('');
        setSelectedVenue('');
        setImageS3Key('');
        localStorage.removeItem('eventImage');
  }


  const handleEventSubmit = async() => {
    if (!validateInputs()) {
      return;
    }

    try{
         const payload = {
              eventName : eventName,
              description: description,
              start: { timezone: 'UTC', utc: start },
              end: { timezone: 'UTC', utc: end },
              category_id: selectedCategory,
              venue_id: selectedVenue,
              image_s3_key : imageS3Key, 
              currency : 'USD' ,
              created_by : localStorage.getItem('user').email
            };
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
           console.log(payload);
           const URL =  "http://localhost:3000/api/v1/admin/createEvent";
           const response = await axios.post(URL,payload,config);
           toast.success('Your Event has been created Successfully!');
           console.log("Event Details" , response.data);
           resetFields();
           //console.log(response);
         }catch(error){
            console.error('Error Creating Event:', error);
            toast.error('Failed to Create Event');
        }
   
    // Make API call with payload

    console.log(payload);
  };


  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = async(event) => {
      const imageDataUrl = event.target.result;
      localStorage.setItem('eventImage', imageDataUrl);
      try{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}`
            }
        };
        const response = await axios.put('http://localhost:3000/api/v1/awsS3/uploadImage', {image : localStorage.getItem('eventImage') }, config);
        const s3Key = response.data.s3Key ;
        setImageS3Key(s3Key);
        toast.success('Image uploaded successfully!');
      }catch(error){
        console.error('Error uploading image:', error);
        toast.error('Failed to upload image');
      }
    };

    reader.readAsDataURL(file);
  };
  
  return (
    <AdminDashboardContainer>
      <FormContainer>
      <h2>Create Event</h2>
        <FormItem>
          <Label>Event Name</Label>
          <Input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
        </FormItem>
        <FormItem>
          <Label>Description</Label>
          <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormItem>
        <FormItem>
          <Label>Start</Label>
          <Input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} />
        </FormItem>
        <FormItem>
          <Label>End</Label>
          <Input type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} />
        </FormItem>
        <FormItem>
          <Label>Category</Label>
          <Dropdown
            value={selectedCategory}
            options={categories}
            onChange={(e) => {
                setSelectedCategory(e.value);
            }}
            placeholder="Select a Category"
          />
        </FormItem>
        <FormItem>
          <Label>City</Label>
          <Dropdown
            value={selectedVenue}
            options={venues}
            onChange={(e) => {
                setSelectedVenue(e.value);
            }}
            placeholder="Select a Venue"
          />
        </FormItem>
        <FormItem>
          <UploadLabel>
            Upload Image
            <UploadInput type="file" accept="image/*" onChange={handleImageChange} />
          </UploadLabel>
        </FormItem>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <UploadButton label="Create Event" onClick={handleEventSubmit} />
      </FormContainer>
      <ToastContainer />
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;
