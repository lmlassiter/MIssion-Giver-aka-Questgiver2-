require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(express.json()); // For parsing application/json

const configuration = new Configuration({
  organization: process.env.OPEN_AI_ID,
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/createchat', async (req, res) => {
  try {
    const conversations = req.body.conversations.map((conversation) => {
      return {
        role: conversation.role,
        content: conversation.content,
      };
    });
    
    
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: conversations,
    });

    console.log('OpenAI response:', response); // Add this line for debugging

    const replyMessage = response.data.choices[0].message;
    const replyContent = replyMessage.content;
    
    res.json({ response: replyContent });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'OpenAI cannot connect' });
  }
});




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
