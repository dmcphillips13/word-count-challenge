const PopUp = ({
  toggle,
  characterCount,
  characterNoSpaceCount,
  wordCount,
  sentenceCount,
  paragraphCount,
  bigrams,
  words,
}) => {
  return (
    <div className="PopUp">
      <h1 className="close" onClick={toggle}>
        X
      </h1>
      <ul>
        <li>Characters: {characterCount}</li>
        <li>Characters Excluding Spaces: {characterNoSpaceCount}</li>
        <li>Words: {wordCount}</li>
        <li>Sentences: {sentenceCount}</li>
        <li>Paragraphs: {paragraphCount}</li>
        <li>Bigrams: {Object.keys(bigrams).length}</li>
        <div className="top">
          {Object.entries(words).length ? (
            <li>
              Most Popular Words:
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
          {Object.entries(bigrams).length ? (
            <li>
              Most Popular Bigrams:
              <ul>
                {Object.entries(bigrams)
                  .sort((a, b) => b[1] - a[1])
                  .filter((entry, idx) => idx < 5)
                  .map(([bigram, count], idx) => {
                    return (
                      <li key={idx}>
                        {bigram}: {count}
                      </li>
                    );
                  })}
              </ul>
            </li>
          ) : null}
        </div>
      </ul>
    </div>
  );
};

export default PopUp;
