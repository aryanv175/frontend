import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userRes = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(userRes.data);

        const quizzesRes = await axios.get('http://localhost:5000/api/users/quizzes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setQuizzes(quizzesRes.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <h2>Your Quizzes</h2>
      {quizzes.map(quiz => (
        <div key={quiz._id}>
          <h3>{quiz.title}</h3>
          <p>{quiz.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Profile;