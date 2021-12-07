import express, { Response, Request, NextFunction } from 'express';
import cors from 'cors';
import { posts } from './routes/posts';
import { AppError } from './typings/AppError';

// CORS header configuration
const corsOptions = {
  methods: 'GET',
  allowedHeaders: 'Content-Type,Authorization',
};

export const app = express();
const fetch = require("node-fetch"); // Need node-fetch version 2 in order to use require

// Routes
app.use('/posts', cors(corsOptions), posts);
app.use(express.urlencoded({ extended: false }));

async function getRepos(req, res) {
  try {
    const response = await fetch("https://api.github.com/users/silverorange/repos", {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
      });
    const json = await response.json();
    res.json(json)
  }
  catch(err) {
    console.log(err)
  }
  
}

app.get("/repos", getRepos)

// error handling middleware should be loaded after the loading the routes
app.use(
  '/',
  (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;

    const formattedError: { status: number; message: string } = {
      status,
      message: err.message,
    };

    res.status(status);
    res.send(JSON.stringify(formattedError));
  }
);
