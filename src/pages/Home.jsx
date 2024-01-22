import { useContext, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import ContextProvider from "../context/ContextProvider";

const Home = () => {
  const { city, interest, setEventData, setIsloading } = useContext(ContextProvider);

  const fetchDataByCity = async (city) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/events/city/${city}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("auth")
            )}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const res = await response.json();
      setEventData(res);
      setIsloading(false);
    } catch (error) {
      console.error("Error fetching data by city:", error.message);
      setIsloading(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/events/", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(
            localStorage.getItem("auth")
          )}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const res = await response.json();
      setEventData(res);
      setIsloading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setIsloading(false);
    }
  };

  const fetchDataByInterest = async (interest) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/events/interest/${interest}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("auth")
            )}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const res = await response.json();
      setEventData(res);
      setIsloading(false);
    } catch (error) {
      console.error("Error fetching data by interest:", error.message);
      setIsloading(false);
    }
  };

  const fetchDataByCityAndInterest = async (cityName, interestName) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/events/search/city/${cityName}/interest/${interestName}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("auth")
            )}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const res = await response.json();
      setEventData(res);
      setIsloading(false);
    } catch (error) {
      console.error(
        "Error fetching data by city and interest:",
        error.message
      );
      setIsloading(false);
    }
  };

  useEffect(() => {
    if (city !== null && interest !== null) {
      fetchDataByCityAndInterest(city, interest);
    } else if (interest !== null) {
      fetchDataByInterest(interest);
    } else if (city !== null) {
      fetchDataByCity(city);
    } else {
      fetchData();
    }
  }, [city, interest]);

  return <AppLayout />;
};

export default Home;
