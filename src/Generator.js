import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './index.css';

// Random String Generator Component - (Our previous task)
const RandomStringGenerator = () => {
  // We're using the useState hook to store the random string, its length, and the characters to be used in the state.
  const [randomString, setRandomString] = useState('');
  const [stringLength, setStringLength] = useState(10);
  const [characters, setCharacters] = useState('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');

  // We're using the useCallback hook to create a function to generate the random string.
  const generateString = useCallback(() => {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < stringLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setRandomString(result);
  }, [stringLength, characters]);

  // We're using the useEffect hook to automatically generate the string when the component loads and when the string length or characters change.
  useEffect(() => {
    generateString();
  }, [generateString]);

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Random String Generator</h1>
      
      <div className="mb-6">
        <label htmlFor="length" className="block text-gray-700 text-xl font-semibold mb-2">
          String Length:
        </label>
        <input
          id="length"
          type="number"
          value={stringLength}
          onChange={(e) => setStringLength(e.target.value)}
          className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          min="1"
        />
      </div>

      <div className="mb-8">
        <label htmlFor="characters" className="block text-gray-700 text-xl font-semibold mb-2">
          Characters to use:
        </label>
        <input
          id="characters"
          type="text"
          value={characters}
          onChange={(e) => setCharacters(e.target.value)}
          className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        onClick={generateString}
        className="w-full bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg shadow-md text-xl hover:bg-indigo-700 transition duration-300"
      >
        Generate
      </button>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Generated String:</h2>
        <div className="bg-green-200 p-6 rounded-lg font-mono text-gray-900 break-words text-xl">
          {randomString}
        </div>
      </div>
    </div>
  );
};

// Home Component
const Home = () => (
  <div className="text-center">
    <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to our Application!</h1>
    <p className="text-lg text-gray-600">Please use the navigation above to explore.</p>
  </div>
);

// Translator Placeholder Component - (We will place the code here in the future)
const TranslatorApp = () => (
  <div className="text-center bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
    <h1 className="text-4xl font-bold text-gray-800 mb-4">Translator Application</h1>
    <p className="text-lg text-gray-600">We will build this application next using RapidAPI.</p>
  </div>
);

// Main App Component with Routing
const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col items-center min-h-screen bg-indigo-100 p-4">
        <nav className="w-full max-w-4xl p-4 bg-gray-800 rounded-xl shadow-lg mb-8">
          <ul className="flex justify-center space-x-8">
            <li>
              <Link to="/" className="text-white text-lg font-semibold hover:text-indigo-400 transition duration-300">Home</Link>
            </li>
            <li>
              <Link to="/random-string" className="text-white text-lg font-semibold hover:text-indigo-400 transition duration-300">Random String</Link>
            </li>
            <li>
              <Link to="/translator" className="text-white text-lg font-semibold hover:text-indigo-400 transition duration-300">Translator</Link>
            </li>
          </ul>
        </nav>
        
        <main className="flex-grow flex items-center justify-center w-full">
          <Routes>
            <Route path="/" element={<RandomStringGenerator />} />
            <Route path="/home" element={<Home />} />
            <Route path="/translator" element={<TranslatorApp />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;