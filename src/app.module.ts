import { Module } from '@nestjs/common';
import { BotService } from './bot/bot.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './DB/user.schema';
import { UsersService } from './users/user.service';

import { WeatherApiService } from './weather-provider/weather.api';
import { TimeZoneService } from './time-service/time-zone';
import { ScheduleModule } from '@nestjs/schedule';

import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule } from '@nestjs/config';
import { CronService } from './message-service/cronJobService';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRoot({
      token: process.env.TOKEN,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ScheduleModule.forRoot(),
  ],

  providers: [
    BotService,
    UsersService,
    WeatherApiService,
    CronService,
    TimeZoneService,
  ],
})
export class AppModule {}
