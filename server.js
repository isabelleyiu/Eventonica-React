require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pool = require('./database');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// landing 
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Eventonica!'
  });
});

// display all events
app.get('/events', (req, res) => {
  pool.query('SELECT * FROM events', (err, results) => {
    if(err) {
      // this would return even if your db is not connected
      res.status(400).json({message: 'oops...something went wrong...Please try again!'});
    } else {
      res.status(200).json(results.rows);
    }
  });
});

// display a particular event by Id
app.get('/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  pool.query('SELECT * FROM events WHERE id = $1', [id], (err, results) => {
    if(err) {
      res.status(400).json({message: 'oops...something went wrong...Please check if your event ID is correct.!'});
    } else {
      res.status(200).json(results.rows[0]);
    }
  });
});

// create an event
app.post('/events', (req, res) => {
  const { title, start_time, venue_name, venue_address } = req.body;

  pool.query('INSERT INTO events (title, start_time, venue_name, venue_address) VALUES ($1, $2, $3, $4) RETURNING *', [title, start_time, venue_name, venue_address],
  (err, results) => {
    if(err) {
      res.status(400).json({message: 'oops...something went wrong...Please try again!'});
    } else {
      res.status(201).json(results.rows[0]);
    }
  });
});

// Update an event by Id
app.put('/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, start_time, venue_name, venue_address } = req.body;

  pool.query('UPDATE events SET title = $1, start_time = $2, venue_name = $3, venue_address = $4 WHERE id = $5 RETURNING *', [title, start_time, venue_name, venue_address, id], (err, results) => {
    if(err) {
      res.status(400).json({message: 'oops...something went wrong...Please check if your event ID is correct.'});
    } else {
      res.status(200).json(results.rows[0]);
    }
  });
});

// delete an event
app.delete('/events/:id', (req, res) => {
  const id = parseInt(req.params.id);

  pool.query('DELETE FROM events WHERE id = $1 RETURNING *', [id], (err, results) => {
    if(err) {
      res.status(400).json({message: 'oops...something went wrong...Please check if your event ID is correct.!'});
    } else {
      res.status(200).json(results.rows[0]);
    }
  });
});

app.listen(PORT, () => {
  console.log('Eventonica is up and running...');
});