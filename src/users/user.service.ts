import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../DB/user-interface';
import { TimeZoneService } from '../time-service/time-zone';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly timezoneService: TimeZoneService,
  ) {}

  async registerUser(chatId: number, location: object) {
    await this.userModel.updateOne({ chatId }, { location }, { upsert: true });
  }

  async addTime(chatId: number, time: string) {
    const existingUser = await this.userModel.findOne({ chatId });

    if (existingUser) {
      existingUser.time = this.timezoneService.convertTime(
        time,
        existingUser.location.longitude,
        existingUser.location.latitude,
      );

      return await existingUser.save();
    }
  }

  async findUsersOnDate(time: string): Promise<User[]> {
    return await this.userModel.find({ time });
  }
}
