const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: false }));

// Configurar OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/webhook', async (req, res) => {
  const userMessage = req.body.Body || '';
  console.log('Mensaje recibido:', userMessage);

  // Enviar mensaje a OpenAI
  let gptResponse = 'Lo siento, no pude entenderte.';
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }],
    });

    gptResponse = completion.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error con OpenAI:', error.message);
  }

  // Responder a Twilio (formato XML)
  res.set('Content-Type', 'text/xml');
  res.send(`
    <Response>
      <Message>${gptResponse}</Message>
    </Response>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
