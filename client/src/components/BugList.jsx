import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BugList() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBugs = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/bugs');
      setBugs(res.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching bugs:', err.message);
      setError('Failed to load bugs. Please check the backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBugs();

    const refresh = () => fetchBugs();
    window.addEventListener('bugAdded', refresh);
    return () => window.removeEventListener('bugAdded', refresh);
  }, []);

  if (loading) return <p>Loading bugs...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (bugs.length === 0) return <p>No bugs reported yet.</p>;

  return (
    <div>
      <h2>Reported Bugs</h2>
      <ul>
        {bugs.map((bug) => (
          <li key={bug._id}>
            <strong>{bug.title}</strong> - <em>{bug.status}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BugList;
