import React, { useState } from 'react';
import { Paper, Typography, Button } from '@mui/material';

const questBoxStyle = {
  padding: '16px',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  borderRadius: '8px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  marginBottom: '16px',
};

const headerStyle = {
  marginBottom: '8px',
  color: '#fff',
};

const textStyle = {
  marginBottom: '4px',
  color: '#fff',
};

export const QuestBox = ({ name, questName, requirements, reward, onQuestAccept }) => {
  const [questDecision, setQuestDecision] = useState(null);

  const handleQuestAccept = () => {
    onQuestAccept();
    setQuestDecision('accepted'); // Pass the second argument as `true` to indicate quest acceptance
  };

  const handleQuestDecline = () => {
    setQuestDecision('declined');
  };

  return (
    <Paper style={questBoxStyle}>
      {questDecision === 'accepted' ? (
        <>
          <Typography variant="h5" style={headerStyle}>
            Mission Accepted!
          </Typography>
          <Typography variant="body1" style={textStyle}>
            You have accepted the mission "{questName}"!
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h5" style={headerStyle}>
            Mission Details
          </Typography>
          <Typography variant="body1" style={textStyle}>
            Name: {name}
          </Typography>
          <Typography variant="body1" style={textStyle}>
            Mission Name: {questName}
          </Typography>
          <Typography variant="body1" style={textStyle}>
            Requirements: {requirements}
          </Typography>
          <Typography variant="body1" style={textStyle}>
            Reward: {reward}
          </Typography>
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" onClick={handleQuestAccept} color="primary">
              Accept
            </Button>
            <Button variant="contained" onClick={handleQuestDecline} color="secondary">
              Decline
            </Button>
          </div>
        </>
      )}
    </Paper>
  );
};
