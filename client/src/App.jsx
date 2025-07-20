import React from 'react';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>Bug Tracker</h1>
        <BugForm />
        <hr />
        <BugList />
      </div>
    </ErrorBoundary>
  );
}

export default App;
