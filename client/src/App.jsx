import React, { useState, useRef, useEffect } from 'react';
import TextBox from './components/TextBox';
import ChatField from './components/ChatField';
import audioFile from './assets/Now-We-Ride.mp3';
import { QuestBox } from './components/QuestBox';
import backgroundGif from './NPC/bg.gif'
import "./styles.css"

function App() {
  const [appStarted, setAppStarted] = useState(false);
  const [chat, setChat] = useState([]);
  const [error, setError] = useState(null);
  const [questGiven, setQuestGiven] = useState(false);
  const [acceptedQuestName, setAcceptedQuestName] = useState('');
  const [acceptedQuest, setAcceptedQuest] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [questRequirements, setQuestRequirements] = useState('');
  const [questReward, setQuestReward] = useState('');
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  
  const startApp = () => {
    setIsPlaying(true);
    setAppStarted(true);
  }

  
  useEffect(() => {
    const audio = audioRef.current;
    
    if (audio) {
        if (isPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }

    return () => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    };

}, [isPlaying]);



  const addMessageToChat = (role, content) => {
    setChat((prevChat) => [...prevChat,{role, content}]);
  };

  const handlePromptChange = (event) => {
    // Handle prompt change logic here if needed
  };

  const formatResponse = (response) => {
    try {
      const matches = response.match(/Name: (.+)\nMission Name: (.+)\nRequirements: (.+)\nReward: (.+)\n([\s\S]+)/);
      if (matches) {
        const name = matches[1];
        setCharacterName(name);

        const questName = matches[2];
        const requirements = matches[3] || 'None';
        const reward = matches[4].trim();
        const dialogue = matches[5].trim();
  
        setQuestRequirements(requirements);
        setQuestReward(reward);

        const lines = [];
        lines.push(`Name: ${name}`);
        lines.push(`Quest Name: ${questName}`);
        lines.push(`Requirements: ${requirements}`);
        lines.push(`Reward: ${reward}`);
  
        setAcceptedQuest(JSON.stringify(response));
        setAcceptedQuestName(matches[2]);
        console.log(acceptedQuest); // Store the accepted quest name
  
        setQuestGiven(true);
        return dialogue;
      } else {
        console.log("Couldn't format");
        return response;
      }
    } catch (error) {
      console.error(error);
      return response;
    }
  };
  

  const handleQuestAccept = () => {
    if (acceptedQuest) {
      const newPrompt = `You just gave the user a mission. Stay in character, the following is the mission.[${JSON.stringify(acceptedQuest)}]`;
      fetchResponse(newPrompt, true);
      console.log(newPrompt);
    }
  };
  
  
  

  const fetchResponse = async (prompt, isQuestAccepted = false) => {
    try {
      let conversations = [];
      let systemPrompt;
      if (isQuestAccepted) {
        // Include a system message indicating quest acceptance and pass the quest information
        systemPrompt = {
          role: 'system',
          content: `You are an NPC in a GTA-like game.
           You just gave the User a Mission. The user has accepted
            it. This is the Mission: ${prompt}. You can now thank them, 
            say goodbye, give a tip, etc. but STAY IN CHARACTER. No more than 1-3 sentences`,
        };
        
      } else {
        // Prepend the system prompt if it's not already present in the conversations
        systemPrompt = {
          role: 'system',
          content: `
            You are a male Gangster NPC in a GTA-like game. Your goal is to give the user a 
            mission.
            Follow this format EXACTLY:
            Name: (You come up with a name)
            Mission Name: (name)
            Requirements: (one-sentence quest description)
            Reward: (Reasonable XP Amount, and occasionally an Item)
            
            then, in the response, answer the user prompt with their name
            , then introduce yourself, explain the problem, 
            and provide the specific task. This game is set in a town, 
            focused entirely on dialogue with no combat. The player 
            cannot leave the town. Quests are specific tasks around town
            like work or talking to someone. Responses should only be a few 
            sentences. You are asking if they will do it, they have not agreed yet.
          `,
        };
        addMessageToChat('user', prompt);
        conversations.push({ role: 'user', content: prompt });
        
      }


      conversations.push(systemPrompt);
  
      const apiResponse = await fetch('http://localhost:3001/createchat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conversations }),
      });
  
      const data = await apiResponse.json();
  
      const formattedResponse = formatResponse(data.response); // Format the AI response
  
      addMessageToChat('npc', formattedResponse); // Add the entire formatted response as a single message
    } catch (error) {
      console.error(error);
      setError(error.toString());
    }
  };
  
  
  
  return (
     <div className="flex flex-col h-screen" style={{ backgroundImage: `url(${backgroundGif})`, backgroundRepeat: 'no-repeat', backgroundSize: '80% 80%', backgroundPosition: 'center' }}>
      {!appStarted ? (
        <div className="flex justify-center items-center flex-1">
          <button
            className="text-3xl bg-white border-8 px-5 py-4 cursor-pointer border-black rounded"
            onClick={startApp}
          >
            Talk?
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col h-full px-4 py-6">
            <button className="mb-4" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? "Pause" : "Play"}
            </button>
  
            {error ? <p className="mb-4">Error: {error}</p> : null}
  
            <div className="flex flex-col flex-1 justify-between">
            <div>
            {questGiven && acceptedQuestName ? (
              <QuestBox
                name={characterName}
                questName={acceptedQuestName}
                requirements={questRequirements}
                reward={questReward}
                onQuestAccept={handleQuestAccept}
                className="mb-4"
              />
            ) : null}
            </div>
              <div> 
              <ChatField chat={chat} characterName={characterName} />
              <TextBox
                onPromptChange={handlePromptChange}
                fetchResponse={fetchResponse}
              />
            </div>
            </div>
          </div>
  
          <audio ref={audioRef} loop>
            <source src={audioFile} type="audio/mpeg" />
          </audio>
        </>
      )}
    </div>
  );
            }

export default App;