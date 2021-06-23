import { useState, useEffect } from 'react';
import PopUp from './components/PopUp';
import './App.css';

const App = () => {
  const [text, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [paragraphCount, setParagraphCount] = useState(0);
  const [bigrams, setBigrams] = useState({});
  const [words, setWords] = useState({});
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    setCharacterCount(text.length);
    setWordCount(text.split(' ').filter((word) => word !== '').length);
    setSentenceCount(text.split('. ').filter((word) => word !== '').length);
    setParagraphCount(text.split('\n').filter((word) => word !== '').length);

    let prev;
    let bigramsHash = {};

    text
      .split(' ')
      .filter((word) => word !== '')
      .forEach((word, idx) => {
        if (idx !== 0) {
          bigramsHash[`${prev.toLowerCase()} ${word.toLowerCase()}`] = true;
        }
        prev = word;
      });

    setBigrams(bigramsHash);

    let wordHash = {};
    text
      .split(' ')
      .filter((word) => word !== '')
      .forEach((word) =>
        wordHash[word.toLowerCase()]
          ? (wordHash[word.toLowerCase()] += 1)
          : (wordHash[word.toLowerCase()] = 1)
      );
    setWords(wordHash);
  }, [text]);

  const updateText = (ev) => {
    setText(ev.target.value);
  };

  const togglePop = () => {
    setSeen(!seen);
  };

  return (
    <div className="app-container">
      <textarea
        value={text}
        placeholder="Input text here"
        onChange={updateText}
      ></textarea>
      <div className="button-container">
        <button onClick={togglePop}>Word Count</button>
      </div>
      {seen && (
        <PopUp
          toggle={togglePop}
          characterCount={characterCount}
          wordCount={wordCount}
          sentenceCount={sentenceCount}
          paragraphCount={paragraphCount}
          bigrams={bigrams}
          words={words}
        />
      )}
    </div>
  );
};

export default App;
