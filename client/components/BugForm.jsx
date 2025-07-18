import React, { useState } from 'react';
import axios from 'axios';
import Button from './Button';

const BugForm = ({ onBugAdded }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('open');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Bug title is required');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const res = await axios.post('/api/bugs', { title, status });
      onBugAdded(res.data);
      setTitle('');
      setStatus('open');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to report bug');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Bug title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
        style={{ marginRight: '0.5rem' }}
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        disabled={loading}
        style={{ marginRight: '0.5rem' }}
      >
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>
      <Button type="submit" disabled={loading}>
        {loading ? 'Reporting...' : 'Report Bug'}
      </Button>
    </form>
  );
};

export default BugForm;
