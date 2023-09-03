import React, { useEffect, useState } from 'react';
import CharacterTyping from './CharacterTyping';
import idleGif from "../NPC/idle.gif";
import talkingGif from "../NPC/talking.gif";
import userTalkingGif from "../NPC/user-talking.gif";
import userIdleGif from "../NPC/user-idle.gif";

function ChatField({ chat, characterName }) {
  const [isTyping, setIsTyping] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [text, setText] = useState("...");
  const [ran, setRan] = useState(-1);
  const [originalCharacterName, setOriginalCharacterName] = useState(characterName);
  const [lastSpokenRole, setLastSpokenRole] = useState(null);


  const startTypingAnimation = (role) => {
    setIsTyping(true);
    setCurrentRole(role);

    if (role === 'npc') {
      setOriginalCharacterName(characterName);
    }else if(role === 'user'){
      setOriginalCharacterName("You")
    }
  };

  const endTypingAnimation = () => {
    setIsTyping(false);
    setLastSpokenRole(currentRole);
    setCurrentRole(null);
  };

  useEffect(() => {
    setRan(ran + 1);
    if (ran >= 0) {
      setCurrentRole(chat[ran].role);
      console.log(chat[ran].role);
      setText(chat[ran].content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat]);

 return (
    <div className="flex justify-center">
      <div className="w-1/2 p-4 bg-white border border-gray-500 rounded-lg shadow-lg mt-10 flex">
        {/* The GIF */}
        <div className="w-1/3">
{isTyping && currentRole === 'npc' ? (
    <img src={talkingGif} alt="Talking NPC" className="w-48 h-auto opacity-100" />
) : isTyping && currentRole === 'user' ? (
    <img src={userTalkingGif} alt="Talking User" className="w-48 h-auto opacity-100" />
) : !isTyping && lastSpokenRole === 'npc' ? (
    <img src={idleGif} alt="Idle NPC" className="w-48 h-auto opacity-100" />
) : !isTyping && lastSpokenRole === 'user' ? (
    <img src={userIdleGif} alt="Idle User" className="w-48 h-auto opacity-100" />
) : (
    <img src={idleGif} alt="Idle NPC" className="w-48 h-auto opacity-100" />
)}

      </div>

        {/* The Name & Message Content */}
        <div className="w-2/3 p-4">
          <div
            className={`text-xl font-semibold ${
              currentRole === 'user' ? 'shine-effect' : ''
            }`}
          >
            {currentRole === 'user' ? 'You' : originalCharacterName}
          </div>

          <div className="text-lg mt-2">
            {currentRole === "npc" || currentRole === 'user' ? (
              <CharacterTyping
                text={text}
                onAnimationStart={() => startTypingAnimation(currentRole)}
                onAnimationEnd={endTypingAnimation}
              />
            ) : (
              text
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatField;