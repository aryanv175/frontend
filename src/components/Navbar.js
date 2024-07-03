import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {isLoggedIn ? (
          <>
            <li><Link to="/create-quiz">Create Quiz</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;