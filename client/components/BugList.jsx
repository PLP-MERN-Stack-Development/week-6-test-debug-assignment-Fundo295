import React from 'react';
import axios from 'axios';
import Button from './Button';

const BugList = ({ bugs, setBugs }) => {
  const updateStatus = async (id, newStatus) => {
    try {
      const res = await axios.patch(`/api/bugs/${id}`, { status: newStatus });
      setBugs(bugs.map(bug => (bug._id === id ? res.data : bug)));
    } catch (error) {
      alert('Failed to update bug status');
    }
  };

  const deleteBug = async (id) => {
    try {
      await axios.delete(`/api/bugs/${id}`);
      setBugs(bugs.filter(bug => bug._id !== id));
    } catch (error) {
      alert('Failed to delete bug');
    }
  };

  if (!bugs.length) return <p>No bugs reported yet.</p>;

  return (
    <ul>
      {bugs.map((bug) => (
        <li key={bug._id} style={{ marginBottom: '1rem' }}>
          <strong>{bug.title}</strong> - <em>{bug.status}</em>
          <div style={{ marginTop: '0.5rem' }}>
            <select
              value={bug.status}
              onChange={(e) => updateStatus(bug._id, e.target.value)}
              style={{ marginRight: '0.5rem' }}
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <Button variant="danger" size="sm" onClick={() => deleteBug(bug._id)}>
              Delete
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BugList;
