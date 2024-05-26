import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { PORT, mongoDBURL } from './config.js';
import booksRoute from './routes/booksRoute.js';

const app = express();

// Middleware for passing request body
app.use(express.json());

// Middleware for handling CORS policy
// Option 1:Allow all origins with default of cors(*)
app.use(cors());

// Options 2:Custom origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('Welcome to MERN Stack');
});

app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
