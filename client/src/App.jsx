import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BugForm from './components/BugForm';
import BugList from './components/BugList';

const App = () => {
  const [bugs, setBugs] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all bugs on mount
  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const res = await axios.get('/api/bugs');
        setBugs(res.data);
      } catch (err) {
        setError('Failed to load bugs');
      }
    };
    fetchBugs();
  }, []);

  const addBug = (newBug) => {
    setBugs(prev => [newBug, ...prev]);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: '1rem' }}>
      <h1>Bug Tracker</h1>
      <BugForm onBugAdded={addBug} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <BugList bugs={bugs} setBugs={setBugs} />
    </div>
  );
};

export default App;
