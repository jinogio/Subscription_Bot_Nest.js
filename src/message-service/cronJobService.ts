import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectBot } from 'nestjs-telegraf';
import { TimeZoneService } from 'src/time-service/time-zone';
import { Context, Telegraf } from 'telegraf';
import { UsersService } from '../users/user.service';
import { WeatherApiService } from '../weather-provider/weather.api';

@Injectable()
export class CronService {
  constructor(
    private readonly usersService: UsersService,
    private readonly weatherApiService: WeatherApiService,
    private readonly timeZoneService: TimeZoneService,

    @InjectBot() private bot: Telegraf<Context>,
  ) {}

  @Cron('* * * * *')
  async handleCron() {
    const myDate = this.timeZoneService.formatTimeInUtc(new Date());

    const users = await this.usersService.findUsersOnDate(myDate);
    if (!users) {
      return null;
    }
    for (const user of users) {
      const weather = await this.weatherApiService.getWeather(user.location);
      this.bot.telegram.sendMessage(user.chatId, `<i> ${weather}</i>`, {
        parse_mode: 'HTML',
      });
    }
  }
}
