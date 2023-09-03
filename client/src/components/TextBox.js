import React, { useState } from 'react';

function TextBox({ prompt, onPromptChange, fetchResponse }) {
  const [text, setText] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      prompt = text;
      fetchResponse(prompt);
      setText('');
      onPromptChange(event);
    }
  };


  return (
    <div
      className='flex justify-center w-full '
    >

      <input
        type="text"
        value={text}
        className='w-1/2 text-xl h-9 border-solid border-2 border-black'
        onChange={handleTextChange}
        onKeyDown={handleKeyPress}
        ></input> 
    </div>
  );
}

export default TextBox;
