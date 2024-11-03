// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './api/comments.route.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1/comments', routes); // Use the comments router for this route
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));

export default app;