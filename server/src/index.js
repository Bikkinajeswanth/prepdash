import 'dotenv/config';
console.log("MONGODB_URI from .env →", process.env.MONGODB_URI);

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectToDatabase } from './config/db.js';
import authRoutes from './routes/auth.js';
import questionRoutes from './routes/questions.js';
import submitRoutes from './routes/submit.js';
import { seedQuestionsIfNeeded } from './seed/seedQuestions.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/submit', submitRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
  await connectToDatabase();
  await seedQuestionsIfNeeded();
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${PORT}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server', err);
  process.exit(1);
});


