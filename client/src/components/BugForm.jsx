import React, { useState } from 'react';
import axios from 'axios';

function BugForm() {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);

  const submitBug = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Bug title cannot be empty');
      return;
    }

    try {
      await axios.post('/api/bugs', { title });
      setTitle('');
      setError(null);
      window.dispatchEvent(new Event('bugAdded')); // simple event to notify BugList
    } catch (err) {
      setError('Failed to submit bug');
    }
  };

  return (
    <form onSubmit={submitBug}>
      <input
        type="text"
        placeholder="Enter bug title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Submit Bug</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default BugForm;
