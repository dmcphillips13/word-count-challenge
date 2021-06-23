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
        <div className="close-container">
          <p className="close" onClick={handleClick}>
            X
          </p>
        </div>
        <ul>
          <li>Character Count: {characterCount}</li>
          <li>Word Count: {wordCount}</li>
          <li>Sentence Count: {sentenceCount}</li>
          <li>Paragraph Count: {paragraphCount}</li>
          <li>Bigram Count: {Object.keys(bigrams).length}</li>
          {Object.entries(words).length ? (
            <li>
              Top Words:
              <ul>
                {Object.entries(words)
                  .sort((a, b) => b[1] - a[1])
                  .filter((entry, idx) => idx < 5)
                  .map(([word, count], idx) => {
                    return (
                      <li key={idx}>
                        {word}: {count}
                      </li>
                    );
                  })}
              </ul>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default PopUp;
