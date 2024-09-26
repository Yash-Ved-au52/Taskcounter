import React, { useState } from 'react';
import "./App.css";

function Counter({ counter, onUpdate, onDelete }) {
  const [count, setCount] = useState(counter.count);

  const handleIncrement = () => {
    const updatedCount = count + 1;
    setCount(updatedCount);
    onUpdate(counter._id, updatedCount);
  };

  const handleDecrement = () => {
    const updatedCount = count - 1;
    setCount(updatedCount);
    onUpdate(counter._id, updatedCount);
  };

  const handleRemove = () => {
    onDelete(counter._id);
  };
  const cellstyle={
    padding:'30px'
  }
  return (
    <tr>
      
      <td style={cellstyle}>{count}</td>
      <td>
        <button onClick={handleIncrement} className='button'>Increment</button>
        <button onClick={handleDecrement} className='button'>Decrement</button>
        <button onClick={handleRemove} className='button'>Remove</button>
      </td>
    </tr>
  );
}

export default Counter;
