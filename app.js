const express = require('express');
const app = express();
const PORT = 3000;

const petsRoutes = require('./Backend/routes/pets');

app.use(express.json());
app.use(express.static('public'));
app.use('/pets', petsRoutes);

app.get('/', (req, res) => {
  res.send('Приложение для ухода за животными работает!');
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
