import express from 'express';
import { Question } from '../models/Question.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
  const limit = Math.max(1, Math.min(10, parseInt(req.query.limit || '5', 10)));
  const questions = await Question.find({}).limit(limit).lean();
  const sanitized = questions.map(q => ({
    id: q._id,
    text: q.text,
    options: q.options.map(o => o.text),
    topic: q.topic,
    difficulty: q.difficulty,
  }));
  res.json({ questions: sanitized });
});

export default router;


