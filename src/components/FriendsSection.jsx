import { useState, useEffect } from 'react';
import axios from 'axios';

import '../components/FriendsSection.css'; 

const FriendsSection = () => {
  const [userFriends, setUserFriends] = useState([]);
  const userId = JSON.parse(localStorage.getItem('user')).userId;

  useEffect(() => {
    fetchUserFriends();
  }, []);

  const fetchUserFriends = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/user/getUserFriendsName/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))}`,
        },
      });
      console.log(response.data.friends);
      setUserFriends(response.data.friends || []);
    } catch (error) {
      console.error('Error fetching user friends:', error);
    }
  };

  return (
    <div className="friends-section">
      <div className="header">
        <h1>My Friends : </h1>
      </div>

      <div className="friends-container">
        {userFriends && userFriends.length > 0 ? (
          <>
            {userFriends.map((friend,indx) => (
              <div key={indx} className="friend-item">
                <div className="friend-details">
                  <span>{friend}</span>
                </div>
              </div>
            ))}
          </>
        ) : (
          <h1>No Friends Added Yet</h1>
        )}
      </div>
    </div>
  );
};

export default FriendsSection;
