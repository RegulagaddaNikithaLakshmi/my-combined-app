import React, { useState } from 'react';

// A comprehensive list of languages for the selector
const languages = [
  { code: 'en', name: 'English' },
  { code: 'te', name: 'Telugu' },
  { code: 'ta', name: 'Tamil' },
  { code: 'hi', name: 'Hindi' },
  { code: 'fr', name: 'French' },
  { code: 'es', name: 'Spanish' },
  { code: 'de', name: 'German' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese (Simplified)' },
  { code: 'ru', name: 'Russian' },
  { code: 'ar', name: 'Arabic' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'it', name: 'Italian' },
  { code: 'nl', name: 'Dutch' },
  { code: 'el', name: 'Greek' },
  { code: 'tr', name: 'Turkish' },
  { code: 'sv', name: 'Swedish' },
  { code: 'pl', name: 'Polish' },
  { code: 'th', name: 'Thai' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'bn', name: 'Bengali' },
  { code: 'ur', name: 'Urdu' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'kn', name: 'Kannada' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'mr', name: 'Marathi' },
  { code: 'fa', name: 'Persian' },
  { code: 'iw', name: 'Hebrew' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ms', name: 'Malay' },
  { code: 'fil', name: 'Filipino' },
  { code: 'no', name: 'Norwegian' },
  { code: 'fi', name: 'Finnish' },
  { code: 'da', name: 'Danish' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'cs', name: 'Czech' },
];

/**
 * Handles the API call for text translation.
 * @param {string} text - The text to translate.
 * @param {string} targetLang - The target language code.
 * @returns {Promise<string>} The translated text or an error message.
 */
const translateText = async (text, targetLang) => {
  const url = "https://deep-translate1.p.rapidapi.com/language/translate/v2";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "e843ea22bdmsh70d85a8cf545ce9p1f4ee1jsn61dceb2d05fa",
      "X-RapidAPI-Host": "deep-translate1.p.rapidapi.com",
    },
    body: JSON.stringify({
      q: text,
      source: "en",
      target: targetLang,
    }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    if (result && result.data && result.data.translations) {
      return result.data.translations.translatedText;
    } else {
      console.error("Translation Error: Unexpected API response structure", result);
      return "Error: Unexpected API response.";
    }
  } catch (error) {
    console.error("Translation Error:", error);
    return "Error occurred during translation. Check console for details.";
  }
};

/**
 * A shared style for interactive elements with hover and focus effects.
 */
const interactiveStyle = {
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  borderRadius: '8px',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
};

/**
 * The main Navbar component for navigation.
 * Uses an onClick handler to change the page state in the parent App component.
 */
const Navbar = ({ setPage }) => (
  <nav style={{
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    // Updated to a violet gradient
    background: 'linear-gradient(to right, #6a0dad, #9c27b0)',
    padding: '1rem',
    borderRadius: '16px 16px 0 0',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
  }}>
    <div
      style={{ ...interactiveStyle, color: 'white', padding: '10px 20px', fontSize: '1.2rem' }}
      onClick={() => setPage('home')}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      Home
    </div>
    <div
      style={{ ...interactiveStyle, color: 'white', padding: '10px 20px', fontSize: '1.2rem' }}
      onClick={() => setPage('translator')}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      Translator
    </div>
    <div
      style={{ ...interactiveStyle, color: 'white', padding: '10px 20px', fontSize: '1.2rem' }}
      onClick={() => setPage('random')}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      Random String
    </div>
  </nav>
);

/**
 * The Home page component.
 */
const Home = () => (
  <div style={{
    padding: '2rem',
    textAlign: 'center',
    color: '#4a148c',
    backgroundColor: '#f0f8ff', // New light blue-gray color
    borderRadius: '0 0 16px 16px',
  }}>
    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>Welcome!</h1>
    <p style={{ fontSize: '1.2rem', color: '#6a1b9a' }}> {/* Updated text color */}
      Navigate using the menu above to try the Translator or Random String Generator.
    </p>
  </div>
);

/**
 * The Translator page component.
 */
const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [selectedLang, setSelectedLang] = useState('en');
  const [outputText, setOutputText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setOutputText("Please enter text to translate.");
      return;
    }
    setIsTranslating(true);
    const result = await translateText(inputText, selectedLang);
    setOutputText(result);
    setIsTranslating(false);
  };

  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      backgroundColor: '#f0f8ff', // New light blue-gray color
      borderRadius: '0 0 16px 16px',
    }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#4a148c' }}>🌍 Text Translator</h2> {/* Updated text color */}
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter English Sentence"
        style={{
          ...interactiveStyle,
          width: '100%',
          maxWidth: '400px',
          height: '120px',
          padding: '1rem',
          backgroundColor: '#f3e5f5', // Kept light violet for contrast
          color: '#333',
          border: '1px solid #d1c4e9', // Updated to violet border
          marginBottom: '1rem',
          resize: 'none',
          fontSize: '1rem',
        }}
      />
      <select
        value={selectedLang}
        onChange={(e) => setSelectedLang(e.target.value)}
        style={{
          ...interactiveStyle,
          width: '100%',
          maxWidth: '200px',
          padding: '10px',
          backgroundColor: '#f3e5f5', // Kept light violet for contrast
          color: '#333',
          border: '1px solid #d1c4e9', // Updated to violet border
          marginBottom: '1rem',
          fontSize: '1rem',
        }}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      <div
        style={{
          ...interactiveStyle,
          minHeight: '120px',
          padding: '1rem',
          backgroundColor: '#f3e5f5', // Kept light violet for contrast
          border: '1px solid #d1c4e9', // Updated to light violet border
          marginTop: '2rem',
          color: '#333',
          fontSize: '1.2rem',
        }}
      >
        {isTranslating ? "Translating..." : outputText}
      </div>
      <button
        onClick={handleTranslate}
        style={{
          ...interactiveStyle,
          // Updated to a violet gradient
          background: 'linear-gradient(to right, #6a0dad, #9c27b0)',
          color: 'white',
          fontWeight: 'bold',
          padding: '1rem 3rem',
          border: 'none',
          fontSize: '1.2rem',
          marginTop: '1rem', /* Added margin for spacing */
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        }}
      >
        Translate
      </button>
    </div>
  );
};

/**
 * The Random String Generator page component.
 */
const RandomString = () => {
  const [length, setLength] = useState(10);
  const [characters, setCharacters] = useState("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [copyMessage, setCopyMessage] = useState("");

  const generateRandomString = () => {
    let output = "";
    for (let i = 0; i < length; i++) {
      output += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setResult(output);
    // Add the new string to the beginning of the history array
    setHistory([output, ...history.slice(0, 4)]);
  };

  const handleCopy = () => {
    // Create a temporary textarea element to hold the text to be copied
    const el = document.createElement('textarea');
    el.value = result;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopyMessage("Copied!");
    setTimeout(() => setCopyMessage(""), 2000);
  };

  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      backgroundColor: '#f0f8ff', // New light blue-gray color
      borderRadius: '0 0 16px 16px',
    }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#4a148c' }}>✨🎲 Random String Generator✨</h2> {/* Updated text color */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="length-input" style={{ marginRight: '1rem', color: '#6a1b9a' }}>String Length:</label> {/* Updated text color */}
        <input
          id="length-input"
          type="number"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value) || 0)}
          min="1"
          style={{
            ...interactiveStyle,
            width: '80px',
            padding: '10px',
            textAlign: 'center',
            backgroundColor: '#f3e5f5', // Kept light violet for contrast
            color: '#333',
            border: '1px solid #d1c4e9', // Updated to violet border
            fontSize: '1rem',
          }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="characters-input" style={{ marginRight: '1rem', color: '#6a1b9a' }}>Characters to use:</label> {/* Updated text color */}
        <input
          id="characters-input"
          type="text"
          value={characters}
          onChange={(e) => setCharacters(e.target.value)}
          style={{
            ...interactiveStyle,
            width: '100%',
            maxWidth: '400px',
            padding: '10px',
            backgroundColor: '#f3e5f5', // Kept light violet for contrast
            color: '#333',
            border: '1px solid #d1c4e9', // Updated to violet border
            fontSize: '1rem',
          }}
        />
      </div>
      <div
        style={{
          ...interactiveStyle,
          minHeight: '40px',
          padding: '1rem',
          backgroundColor: '#f3e5f5', // Kept light violet for contrast
          border: '1px solid #d1c4e9', // Updated to light violet border
          marginBottom: '1rem',
          color: '#333',
          fontSize: '1.2rem',
        }}
      >
        {result}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button
          onClick={generateRandomString}
          style={{
            ...interactiveStyle,
            // Updated to a violet gradient
            background: 'linear-gradient(to right, #6a0dad, #9c27b0)',
            color: 'white',
            fontWeight: 'bold',
            padding: '1rem 3rem',
            border: 'none',
            fontSize: '1.2rem',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
          }}
        >
          Generate
        </button>
        <button
          onClick={handleCopy}
          style={{
            ...interactiveStyle,
            // Updated to a complementary pink/violet gradient
            background: 'linear-gradient(to right, #d81b60, #a8174e)',
            color: 'white',
            fontWeight: 'bold',
            padding: '1rem 3rem',
            border: 'none',
            fontSize: '1.2rem',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
          }}
        >
          Copy
        </button>
      </div>
      {copyMessage && <div style={{ marginTop: '1rem', color: '#20bf55', fontWeight: 'bold' }}>{copyMessage}</div>}
      {history.length > 0 && (
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          border: '1px solid #d1c4e9', // Updated to light violet border
          borderRadius: '8px',
          backgroundColor: '#f3e5f5', // Kept light violet for contrast
          color: '#4a148c', // Updated text color
          textAlign: 'left',
        }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#4a148c' }}>Recent Searches:</h4> {/* Updated text color */}
          {history.map((item, index) => (
            <div key={index} style={{ marginBottom: '0.2rem' }}>{item}</div>
          ))}
        </div>
      )}
    </div>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'translator':
        return <Translator />;
      case 'random':
        return <RandomString />;
      default:
        return <Home />;
    }
  };

  return (
    <div style={{
      // Changed to a beautiful light gray color
      background: '#e6f0f5', 
      minHeight: '100vh',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Inter, sans-serif',
      color: '#4a148c', // Text color updated to a dark blue for contrast
    }}>
      <div style={{
        // Updated to a new light gray/violet color, content specific
        backgroundColor: '#f0f8ff',
        borderRadius: '16px',
        padding: '0rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '600px',
        border: '2px solid #d1c4e9', // Updated to a light violet border
      }}>
        <Navbar setPage={setCurrentPage} />
        {renderPage()}
      </div>
    </div>
  );
}

export default App;


