import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
  chatId: number;
  time: string;
  location: {
    longitude: number;
    latitude: number;
  };
}
