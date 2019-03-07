require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();;
const eventRoutes = require('./routes/events');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// landing 
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Eventonica!'
  });
});

app.use('/api/events', eventRoutes);

app.listen(PORT, () => {
  console.log('Eventonica is up and running...');
});