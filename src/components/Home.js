import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/quizzes');
        setQuizzes(res.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div>
      <h1>Available Quizzes</h1>
      {quizzes.map(quiz => (
        <div key={quiz._id}>
          <h2>{quiz.title}</h2>
          <p>{quiz.description}</p>
          <Link to={`/quiz/${quiz._id}`}>Take Quiz</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;