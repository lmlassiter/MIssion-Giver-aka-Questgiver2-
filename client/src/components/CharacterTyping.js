import React, { useEffect, useState } from 'react';

const CharacterTyping = ({ text, onAnimationStart, onAnimationEnd }) => {
  const [currentText, setCurrentText] = useState([]);
  const [charactersTyped, setCharactersTyped] = useState(0);

  useEffect(() => {
    onAnimationStart(); // Start talking animation
    const nextChar = text[charactersTyped]; // Next character to type
    if (nextChar) {
      const updateTimeout = setTimeout(() => {
        if (nextChar === '\n') {
          setCurrentText((prevText) => [...prevText, <br key={charactersTyped} />]);
        } else {
          setCurrentText((prevText) => [...prevText, nextChar]);
        }

        setCharactersTyped(charactersTyped + 1);
      }, 20);

      return () => clearTimeout(updateTimeout);
    } else {
      if(currentText.length === text.length){
        onAnimationEnd(); // End talking animation
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charactersTyped, text, onAnimationStart, onAnimationEnd]);

  return <>{currentText}</>;
};

export default CharacterTyping;
