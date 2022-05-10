import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  chatId: { type: Number, required: true },
  time: { type: String, required: true },
  location: { type: Object, required: true },
});
