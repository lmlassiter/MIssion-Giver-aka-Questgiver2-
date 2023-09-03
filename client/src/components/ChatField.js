import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import './chatfield.css';
import CharacterTyping from './CharacterTyping';
import idleGif from "../NPC/idle.gif";
import talkingGif from "../NPC/talking.gif";

function ChatField({ chat, characterName }) {
  const [isTyping, setIsTyping] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  let [npcText, setNpcText] = useState("...");
  let [userText, setUserText] = useState("");
  const [ran, setRan] = useState(-1);

  const startTypingAnimation = (role) => {
    setIsTyping(true);
    setCurrentRole(role);
  };

  const endTypingAnimation = () => {
    setIsTyping(false);
    setCurrentRole(null);
  };

  useEffect(() =>{
    setRan(ran+1);
    if(ran>=0){
      setCurrentRole(chat[ran].role);
      console.log(chat[ran].role);
      if(chat[ran].role === "user"){
        setUserText(chat[ran].content);
      } else if(chat[ran].role === "npc"){
        setNpcText(chat[ran].content);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[chat]);

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'row',
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: 'max-content',
          borderColor: "#A0A0A0",
          borderStyle: "solid",
          padding: "20px",
          borderRadius: "15px"
        }}
      >
        {/* The GIF */}
        {isTyping && currentRole !== 'user' ? (
          <img src={talkingGif} alt="Talking NPC" style={{marginTop: "30px", width: '200px', height: 'auto', opacity: "100%" }} />
        ) : (
          <img src={idleGif} alt="Idle NPC" style={{marginTop: "30px", width: '200px', height: 'auto', opacity: "100%" }} />
        )}
  
        {/* The Name & Message Content */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginLeft: '20px',
            flexGrow: 1,
          }}
        >
          <Typography
            variant="h5"
            color="text.primary"
            className={characterName && characterName !== 'Name: Unknown' ? 'shine-effect' : ''}
            sx={{
              fontFamily: "'Cinzel', serif",
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              letterSpacing: '1px',
              fontWeight: 'bold',
              marginBottom: '20px'
            }}
          >
            {characterName || "Name: Unknown"}
          </Typography>
          
          <Typography variant="body1" color="text.primary">
          {currentRole === "npc" ? <CharacterTyping text={npcText} onAnimationStart={() => startTypingAnimation(currentRole, npcText)} onAnimationEnd={endTypingAnimation} /> : npcText}
          </Typography>


        </Box>
      </Box>
<Box
      sx={{
        width: '80%',
        padding: '16px',
        backgroundColor: 'background.paper',
        borderRadius: '8px',
        margin: '0 auto',
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 250px)',
        marginTop: '300px',
      }}
    >
</Box>

<Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
          position: 'absolute',
          bottom: '120px',
          left: '50%',
          transform: 'translateX(-50%)',
        width: '80%',
          height: 'max-content',
          borderColor: "#A0A0A0",
          borderStyle: "solid",
          padding: "20px",
          borderRadius: "15px"
        }}
      >
        <Paper elevation={3} sx={{
          padding: '12px',
          marginBottom: '16px',
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'text.primary',
        }}>
          <Typography variant="body1">
          {currentRole === 'user' ? <CharacterTyping text={userText} onAnimationStart={() => startTypingAnimation(currentRole, userText)} onAnimationEnd={endTypingAnimation} /> : userText}
          </Typography>
        </Paper>
      </Box>
</div>
);
}

export default ChatField;
