import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import EventCard from "../components/EventCard";
import Events from "../components/Events";
import AppLayout from "../components/AppLayout";
import ContextProvider from "../context/ContextProvider";

const Home = () => {
  const { city, interest, eventData, setEventData,setIsloading } = useContext(ContextProvider);

  const fetchDataByCity = async(city)=>{
    const response = await fetch(`http://localhost:3000/api/v1/events/city/${city}`,{
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem("auth")
        )}`,
      },
    });
    const res = await response.json();
    setEventData(res);
    // console.log(res);
    setIsloading(false);
  }

  const fetchData = async()=>{
    // console.log(localStorage.getItem("auth"));
    const response = await fetch('http://localhost:3000/api/v1/events/',{
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem("auth")
        )}`,
      },
    });
    const res = await response.json();
    console.log(res);
    setEventData(res);
    setIsloading(false);
  }

  const fetchDataByInterest = async(interest)=>{
    const response = await fetch(`http://localhost:3000/api/v1/events/interest/${interest}`,{
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem("auth")
        )}`,
      },
    });
    const res = await response.json();
    setEventData(res);
    setIsloading(false);
  }

  const fetchDataByCityAndInterest = async(cityName, interestName)=>{
    const response = await fetch(`http://localhost:3000/api/v1/events/search/city/${cityName}/interest/${interestName}`,{
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem("auth")
        )}`,
      },
    });
    const res = await response.json();
    console.log(res);
    setEventData(res);
    setIsloading(false);
  }

  // useEffect(() =>{
  //   fetchData();
  // },[]);

  useEffect(() => {
    console.log(city, interest);
    if(city!==null && interest!==null){
      fetchDataByCityAndInterest(city,interest);
    }else if(interest!==null){
      fetchDataByInterest(interest);
    }
    else if(city!==null){
      fetchDataByCity(city);
    }else{
      fetchData();
    }
  }, [city, interest]);

  return <AppLayout />;
};

export default Home;
