import { useState, useEffect } from 'react';
import './App.css';
import PopUp from './components/PopUp';
import KeyboardEventHandler from 'react-keyboard-event-handler';

const App = () => {
  const [text, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [characterNoSpaceCount, setCharacterNoSpaceCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [paragraphCount, setParagraphCount] = useState(0);
  const [bigrams, setBigrams] = useState({});
  const [words, setWords] = useState({});
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    let localText = JSON.parse(localStorage.getItem('text'));
    if (localText) setText(localText);
  }, []);

  useEffect(() => {
    localStorage.setItem('text', JSON.stringify(text));

    let splitText = text.split('').filter((char) => char !== '\n');

    setCharacterCount(splitText.length);

    setCharacterNoSpaceCount(splitText.filter((char) => char !== ' ').length);

    let rawWords = text.match(/\b(\w+)'?(\w+)?\b/g);
    if (rawWords) {
      setWordCount(rawWords.length);

      let prev;
      let bigramsHash = {};
      rawWords.forEach((word, idx) => {
        if (idx !== 0) {
          bigramsHash[`${prev.toLowerCase()} ${word.toLowerCase()}`]
            ? (bigramsHash[`${prev.toLowerCase()} ${word.toLowerCase()}`] += 1)
            : (bigramsHash[`${prev.toLowerCase()} ${word.toLowerCase()}`] = 1);
        }
        prev = word;
      });

      setBigrams(bigramsHash);

      let wordHash = {};
      rawWords.forEach((word) =>
        wordHash[word.toLowerCase()]
          ? (wordHash[word.toLowerCase()] += 1)
          : (wordHash[word.toLowerCase()] = 1)
      );

      setWords(wordHash);
    } else {
      setWordCount(0);

      setBigrams({});

      setWords({});
    }

    let rawSentences = text.match(/[^?!.]*[?!.]/g);
    if (rawSentences) {
      setSentenceCount(rawSentences.filter((word) => word !== '').length);
    } else {
      setSentenceCount(0);
    }

    setParagraphCount(text.split('\n').filter((word) => word !== '').length);
  }, [text]);

  const updateText = (ev) => {
    setText(ev.target.value);
  };

  const togglePop = () => {
    setSeen(!seen);
  };

  return (
    <div className="app-container">
      <KeyboardEventHandler
        handleKeys={['ctrl+shift+c']}
        onKeyEvent={() => setSeen(!seen)}
        handleFocusableElements={true}
      />
      <textarea
        value={text}
        placeholder="Start typing here..."
        onChange={updateText}
      ></textarea>
      <div className="button-container">
        For word count, press "ctrl + shift + c" or{' '}
        <button onClick={togglePop}>Click Here</button>
      </div>
      {seen && (
        <PopUp
          toggle={togglePop}
          characterCount={characterCount}
          characterNoSpaceCount={characterNoSpaceCount}
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
