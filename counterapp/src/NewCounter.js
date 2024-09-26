import React, { useEffect, useState } from 'react';
import ListCounter from './ListCounter';


function CounterManager() {
  const [counters, setCounters] = useState([]);

  useEffect(() => {
    // Fetch all counters from the backend and set them in the state
    fetch('http://localhost:8000/api/counters')
      .then((response) => response.json())
      .then((data) => setCounters(data))
      .catch((error) => console.error('Error fetching counters:', error));
  }, []);

  const handleAddCounter = () => {
    // Create a new counter on the backend and add it to the state
    fetch('http://localhost:8000/api/counters', { method: 'POST' })
      .then((response) => response.json())
      .then((data) => {
        setCounters([...counters, data]);
      })
      .catch((error) => console.error('Error creating counter:', error));
  };

  const handleRemoveCounter = (id) => {
    // Delete a counter on the backend and remove it from the state
    fetch(`http://localhost:8000/api/counters/${id}`, { method: 'DELETE' })
      .then(() => {
        const updatedCounters = counters.filter((counter) => counter._id !== id);
        setCounters(updatedCounters);
      })
      .catch((error) => console.error('Error deleting counter:', error));
  };

  const handleUpdateCounter = (id, updatedCount) => {
    // Update a counter on the backend with the new count value
    fetch(`http://localhost:8000/api/counters/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ count: updatedCount }),
    })
      .then(() => {
        const updatedCounters = counters.map((counter) =>
          counter._id === id ? { ...counter, count: updatedCount } : counter
        );
        setCounters(updatedCounters);
      })
      .catch((error) => console.error('Error updating counter:', error));
  };

  return (
    <div>
        <div className='top-container'>
      <h1>Counter App</h1>
      <br/>
      <button className="button" onClick={handleAddCounter}>Add Counter</button>
      </div>
      <div className='container'>
      
      <table>
        <thead>
          <tr>
            
            <th>Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {counters.map((counter) => (
            <ListCounter
              key={counter._id}
              counter={counter}
              onUpdate={handleUpdateCounter}
              onDelete={handleRemoveCounter}
            />
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default CounterManager;
