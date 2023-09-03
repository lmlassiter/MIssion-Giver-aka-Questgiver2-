import React, { useState } from 'react';
import { TextField } from '@mui/material';

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
      style={{
        position: 'fixed',
        bottom: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
      }}
    >
      <p style={{ color: 'grey' }}>{prompt}</p>
      <TextField
        sx={{
          width: '100%',
          '& .MuiOutlinedInput-root': {
            background: 'black',
            '& fieldset': {
              borderColor: 'grey',
            },
            '&:hover fieldset': {
              borderColor: 'grey',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'grey',
            },
            '& input': {
              color: 'grey',
            },
          },
          '& .MuiFormLabel-root': {
            color: 'grey',
          },
        }}
        label="Enter Text"
        variant="outlined"
        value={text}
        onChange={handleTextChange}
        onKeyPress={handleKeyPress}
        InputProps={{
          sx: {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'grey',
            },
          },
        }}></TextField> 
    </div>
  );
}

export default TextBox;
