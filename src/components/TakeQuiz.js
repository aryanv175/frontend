import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TakeQuiz() {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
        setQuiz(res.data);
        const initialAnswers = {};
        res.data.questions.forEach((question, index) => {
          initialAnswers[index] = null;
        });
        setAnswers(initialAnswers);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };
    fetchQuiz();
}, [id]);

const handleAnswerSelect = (questionIndex, answerIndex) => {
  setAnswers({ ...answers, [questionIndex]: answerIndex });
};

const handleSubmit = () => {
  let correctAnswers = 0;
  quiz.questions.forEach((question, index) => {
    if (answers[index] !== null && question.answers[answers[index]].isCorrect) {
      correctAnswers++;
    }
  });
  const calculatedScore = (correctAnswers / quiz.questions.length) * 100;
  setScore(calculatedScore);
};

if (!quiz) {
  return <div>Loading...</div>;
}

return (
  <div>
    <h1>{quiz.title}</h1>
    <p>{quiz.description}</p>
    {quiz.questions.map((question, questionIndex) => (
      <div key={questionIndex}>
        <h3>{question.questionText}</h3>
        {question.answers.map((answer, answerIndex) => (
          <div key={answerIndex}>
            <input
              type="radio"
              id={`q${questionIndex}a${answerIndex}`}
              name={`question${questionIndex}`}
              checked={answers[questionIndex] === answerIndex}
              onChange={() => handleAnswerSelect(questionIndex, answerIndex)}
            />
            <label htmlFor={`q${questionIndex}a${answerIndex}`}>{answer.answerText}</label>
          </div>
        ))}
      </div>
    ))}
    <button onClick={handleSubmit}>Submit Quiz</button>
    {score !== null && (
      <div>
        <h2>Your Score: {score.toFixed(2)}%</h2>
      </div>
    )}
  </div>
);
}

export default TakeQuiz;