import express from 'express';
import { Question } from '../models/Question.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', requireAuth, async (req, res) => {
  const { answers } = req.body; // { questionId: selectedIndex }
  if (!answers || typeof answers !== 'object') {
    return res.status(400).json({ message: 'Invalid answers' });
  }
  const questionIds = Object.keys(answers);
  const questions = await Question.find({ _id: { $in: questionIds } }).lean();
  let correct = 0;
  for (const q of questions) {
    const selected = Number(answers[q._id]);
    if (Number.isInteger(selected) && selected === q.correctIndex) correct += 1;
  }
  const total = questions.length;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  res.json({ correct, total, percentage });
});

export default router;


