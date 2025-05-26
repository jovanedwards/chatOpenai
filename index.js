const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log('Mensaje recibido:', req.body);
  res.send('Hola desde Railway');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
