import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { fetchFinanceEntries } from "./api";
import FinanceEntryList from "./FinanceEntryList";

// Domain logic imports (future: for entry creation/summary/validation)
import { isValidEntry } from "./domain/entry";

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Effect to fetch finance entries on mount
  useEffect(() => {
    async function loadEntries() {
      setLoading(true);
      setApiError(null);
      try {
        const data = await fetchFinanceEntries();
        // If domain validation—filter out any invalid entries from backend
        setEntries(Array.isArray(data) ? data.filter(isValidEntry) : []);
      } catch (err) {
        setApiError(err.message);
        setEntries([]);
      }
      setLoading(false);
    }
    loadEntries();
  }, []);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App">
      <header className="App-header">
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <strong>Finance Tracker</strong>
        </p>
        <p>
          Current theme: <strong>{theme}</strong>
        </p>
        <div style={{width: "100%", maxWidth: 700, margin: "24px auto 0 auto", textAlign: "left"}}>
          {loading && <div>Loading entries...</div>}
          {apiError && <div style={{ color: "#e02d1b" }}>Error loading entries: {apiError}</div>}
          {!loading && !apiError && (
            <FinanceEntryList entries={entries} />
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
