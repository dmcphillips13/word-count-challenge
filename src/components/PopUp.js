import '../App.css';

const PopUp = ({
  toggle,
  characterCount,
  wordCount,
  sentenceCount,
  paragraphCount,
  bigrams,
  words,
}) => {
  const handleClick = () => {
    toggle();
  };
  return (
    <div className="PopUp">
      <div className="modal-content">
        <span className="close" onClick={handleClick}>
          &times;{' '}
        </span>
        <ul>
          <li>Character Count: {characterCount}</li>
          <li>Word Count: {wordCount}</li>
          <li>Sentence Count: {sentenceCount}</li>
          <li>Paragraph Count: {paragraphCount}</li>
          <li>Bigram Count: {Object.keys(bigrams).length}</li>
          <li>
            Top Words
            <ul>
              {words
                ? Object.entries(words)
                    .sort((a, b) => b[1] - a[1])
                    .filter((entry, idx) => idx < 5)
                    .map(([word, count], idx) => {
                      return (
                        <li key={idx}>
                          {word}: {count}
                        </li>
                      );
                    })
                : null}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PopUp;
