import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    options: { type: [optionSchema], required: true, validate: v => Array.isArray(v) && v.length >= 2 },
    correctIndex: { type: Number, required: true, min: 0 },
    topic: { type: String, default: 'General' },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
  },
  { timestamps: true }
);

export const Question = mongoose.model('Question', questionSchema);


