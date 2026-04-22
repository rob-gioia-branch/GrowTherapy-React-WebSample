import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';

export const loadBranch = async () => {
  const branchKey = 'key_test_fvrqkmFnmA3SegRGTmJ6slpcsBnluHTD';

  if (!branchKey) {
    console.log('Branch key is not defined. Skipping Branch initialization.');
    return;
  }

  // Dynamically import Branch SDK so it is loaded on the client only
  const { default: branch } = await import('branch-sdk');

  // Set the protected API URL for Advanced Compliance
  branch.setAPIUrl('https://protected-api.branch.io');

  // Initialize Branch SDK with options
  const initOptions = {};
  initOptions['no_journeys'] = true;

  branch.init(branchKey, initOptions, function (initError, _) {
    if (initError) {
      console.log('Branch initialization error', { errorReason: initError });
    } else {
      console.log('Branch initialized successfully');
    }
    branch.track('pageview');
  });
};

function App() {

  useEffect(() => {
    loadBranch();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
