import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateQuiz() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', answers: [{ answerText: '', isCorrect: false }] }]);
  const history = useNavigate();

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', answers: [{ answerText: '', isCorrect: false }] }]);
  };

  const handleAddAnswer = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.push({ answerText: '', isCorrect: false });
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (questionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].questionText = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex].answerText = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, answerIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.forEach((answer, index) => {
      answer.isCorrect = index === answerIndex;
    });
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/quizzes', 
        { title, description, questions },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      history.push('/');
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Quiz Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Quiz Description" />
      
      {questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <input 
            type="text" 
            value={question.questionText} 
            onChange={(e) => handleQuestionChange(questionIndex, e.target.value)} 
            placeholder="Question" 
            required 
          />
          {question.answers.map((answer, answerIndex) => (
            <div key={answerIndex}>
              <input 
                type="text" 
                value={answer.answerText} 
                onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e.target.value)} 
                placeholder="Answer" 
                required 
              />
              <input 
                type="radio" 
                checked={answer.isCorrect} 
                onChange={() => handleCorrectAnswerChange(questionIndex, answerIndex)} 
              /> Correct Answer
            </div>
          ))}
          <button type="button" onClick={() => handleAddAnswer(questionIndex)}>Add Answer</button>
        </div>
      ))}
      <button type="button" onClick={handleAddQuestion}>Add Question</button>
      <button type="submit">Create Quiz</button>
    </form>
  );
}

export default CreateQuiz;