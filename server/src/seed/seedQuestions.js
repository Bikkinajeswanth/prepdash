import 'dotenv/config';
import { connectToDatabase } from '../config/db.js';
import { Question } from '../models/Question.js';

export async function seedQuestionsIfNeeded() {
  const count = await Question.countDocuments();
  if (count > 0) return;
  const sample = [
    {
      text: 'What is the time complexity of binary search on a sorted array?',
      options: [{ text: 'O(n)' }, { text: 'O(log n)' }, { text: 'O(n log n)' }, { text: 'O(1)' }],
      correctIndex: 1,
      topic: 'DSA',
      difficulty: 'Easy',
    },
    {
      text: 'Which HTTP method is idempotent?',
      options: [{ text: 'POST' }, { text: 'PATCH' }, { text: 'PUT' }, { text: 'CONNECT' }],
      correctIndex: 2,
      topic: 'Web',
      difficulty: 'Easy',
    },
    {
      text: 'In MongoDB, which of the following creates an index?',
      options: [{ text: 'db.users.update()' }, { text: 'db.users.createIndex()' }, { text: 'db.users.aggregate()' }, { text: 'db.users.find()' }],
      correctIndex: 1,
      topic: 'Databases',
      difficulty: 'Medium',
    },
    {
      text: 'React hooks must be called...',
      options: [
        { text: 'Inside loops' },
        { text: 'At the top level of React function components' },
        { text: 'Inside conditions' },
        { text: 'In any JavaScript function' }
      ],
      correctIndex: 1,
      topic: 'React',
      difficulty: 'Easy',
    },
    {
      text: 'Node.js uses which concurrency model?',
      options: [
        { text: 'Multi-threaded blocking I/O' },
        { text: 'Single-threaded event loop with non-blocking I/O' },
        { text: 'Process per request' },
        { text: 'Fiber-based scheduling' }
      ],
      correctIndex: 1,
      topic: 'Node',
      difficulty: 'Easy',
    }
  ];
  await Question.insertMany(sample);
}

// Allow running as a script
if (process.argv[1] && process.argv[1].endsWith('seedQuestions.js')) {
  (async () => {
    try {
      await connectToDatabase();
      await seedQuestionsIfNeeded();
      // eslint-disable-next-line no-console
      console.log('Seeding complete');
      process.exit(0);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      process.exit(1);
    }
  })();
}


