import './App.css';
import React from 'react';
import Home from '../Home/Home';
import Form from '../Form/Form';
import { useState, useEffect } from 'react';
import { fetchResy } from '../apiCalls';

function App() {
  const [resy, setResy] = useState([]);
  const [error, setError] = useState('');

    function fetchData() {
      setError('');

      fetchResy()
        .then(data => setResy(data))
        .catch(err => setError(err.message))
    }

    function addResy(newResy) {
      setResy([...resy, newResy])
    }

    useEffect(() => {
      fetchData()
    }, [])

    

  return (
    <div className="App">
      <h1 className="app-title">Turing Cafe Reservations</h1>
      { error && <h2 className="error">{error}</h2> }
      <Form addResy={addResy}/>
      <div className="resy-container">
        { resy && <Home resy={resy}/> }
      </div>
    </div>
  );
}

export default App; 