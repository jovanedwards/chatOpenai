const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));

app.post('/webhook', (req, res) => {
  console.log('Mensaje recibido:', req.body);

  const userMessage = req.body.Body || 'No hay mensaje';

  res.set('Content-Type', 'text/xml');
  res.send(`
    <Response>
      <Message>Usted escribió: ${userMessage}</Message>
    </Response>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
