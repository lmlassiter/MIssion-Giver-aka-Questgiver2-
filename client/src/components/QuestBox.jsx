import React, { useState } from 'react';

export const QuestBox = ({ name, questName, requirements, reward, onQuestAccept }) => {
  const [questDecision, setQuestDecision] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  const handleQuestAccept = () => {
    onQuestAccept();
    setQuestDecision('accepted');
    setTimeout(() => {
    setIsVisible(false);
  },1500) 
  };

  const handleQuestDecline = () => {
    setQuestDecision('declined');
  };

  if(!isVisible) return null;

  return (
    <div className="w-2/3 mx-auto bg-black bg-opacity-80 p-4 rounded-lg shadow-md mb-4">
      {questDecision === 'accepted' ? (
        <>
          <div className="text-white text-lg mb-2 font-bold">
            Mission Accepted!
          </div>
          <div className="text-white text-base">
            You have accepted the mission "{questName}"!
          </div>
        </>
      ) : (
        <>
          <div className="text-white text-lg mb-2 font-bold">
            Mission Details
          </div>
          <div className="text-white text-base mb-2">
            Name: {name}
          </div>
          <div className="text-white text-base mb-2">
            Mission Name: {questName}
          </div>
          <div className="text-white text-base mb-2">
            Requirements: {requirements}
          </div>
          <div className="text-white text-base mb-4">
            Reward: {reward}
          </div>
          <div className="mt-4 flex justify-between">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={handleQuestAccept}>
              Accept
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" onClick={handleQuestDecline}>
              Decline
            </button>
          </div>
        </>
      )}
    </div>
  );
};
