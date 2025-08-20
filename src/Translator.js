import './index.css';
import './App.css';
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

const translateText = async (text, targetLang) => {
  const url = 'https://deep-translate1.p.rapidapi.com/language/translate/v2';

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'e843ea22bdmsh70d85a8cf545ce9p1f4ee1jsn61dceb2d05fa',
      'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
    },
    body: JSON.stringify({
      q: text,
      source: 'en',
      target: targetLang
    })
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.data.translations.translatedText;
  } catch (error) {
    console.error('Translation Error:', error);
    return "Error occurred!";
  }
};

const Header = () => {
  return (
    <div style={{ background: 'linear-gradient(to right, #1c1e4ec0, #19181aec)', padding: '20px', display: 'flex', justifyContent: 'center', alignContent: 'center', color: '#fff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h1 className="text-3xl font-bold text-center">Text Translator </h1>
    </div>
  );
};

const SearchBar = ({ value, onChange }) => (
  <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
    
    <textarea
      value={value}
      onChange={onChange}
      placeholder="Enter English Sentence"
      style={{ padding: '15px', width: '400px', height: '100px', marginTop: '50px', border: '2px solid #1c1e4ec0', borderRadius: '12px', resize: 'none', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', backgroundColor: '#f0f0f0' }}
    />
  </div>
);

const Button = ({ onClick }) => (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
  
    <button
      onClick={onClick}
      style={{ width: '500px', height: '60px', backgroundColor: '#1c1e4ec0', color: 'white', fontWeight: 'bold', fontSize: '1.25rem', padding: '1rem 4rem', borderRadius: '12px', cursor: 'pointer', border: 'none', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
    >
      Translate
    </button>
  </div>
);

const Output = ({ text }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '50px'
    }}
  >
    <div
      style={{
        width: '400px',
        height: '100px',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        border: '2px solid #1c1e4ec0',
        borderRadius: '12px',
        fontSize: '1.2rem',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(40, 28, 76, 0.1)'
      }}
    >
      {text}
    </div>
  </div>
);

const LanguageSelector = ({ value, onChange }) => (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <select value={value} onChange={onChange} style={{ padding: '10px', width: '200px', borderRadius: '8px', border: '1px solid #1c1e4ec0' }}>
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  </div>
);

function App() {
  const [inputText, setInputText] = useState('');
  const [selectedLang, setSelectedLang] = useState('en');
  const [outputText, setOutputText] = useState('');

  const handleTranslate = async () => {
    const result = await translateText(inputText, selectedLang);
    setOutputText(result);
  };

  return (
    
    <div style={{ backgroundColor: '#e0e0e0', minHeight: '100vh', padding: '1rem' }} className="min-h-screen text-gray-800">
      <div className="text-2xl font-bold text-blue-500">
        <Header />
        <SearchBar
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <Output text={outputText} />
        <LanguageSelector
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
        />
        <Button onClick={handleTranslate} />
      </div>
    </div>
  );
}

export default App;