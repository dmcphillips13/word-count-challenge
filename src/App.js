import { useState, useEffect } from 'react';
import PopUp from './components/PopUp';
import './App.css';
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
    setCharacterCount(text.split('').filter((char) => char !== '\n').length);

    setCharacterNoSpaceCount(
      text.split('').filter((char) => char !== ' ' && char !== '\n').length
    );

    if (text.match(/\b(\w+)'?(\w+)?\b/g)) {
      let rawWords = text.match(/\b(\w+)'?(\w+)?\b/g);
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

    if (text.match(/[^?!.]*[?!.]/g)) {
      setSentenceCount(
        text.match(/[^?!.]*[?!.]/g).filter((word) => word !== '').length
      );
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
