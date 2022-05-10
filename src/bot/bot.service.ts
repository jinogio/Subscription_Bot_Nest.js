import { UsersService } from '../users/user.service';
import { Update, Start, Help, On, Hears } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { ReplyEnum } from './enum';

const regEx = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;
const button = {
  reply_markup: {
    keyboard: [
      [
        { text: '/start', request_location: false },
        '/description',
        { text: 'location', request_location: true },
      ],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
    force_reply: true,
  },
};

@Update()
export class BotService {
  constructor(private readonly usersService: UsersService) {}

  @Start()
  async start(ctx: Context) {
    await ctx.reply(ReplyEnum.START, button);
  }
  @Hears('/description')
  async description(ctx: Context) {
    await ctx.reply(ReplyEnum.Description, button);
  }

  @On('location')
  async onLocation(ctx: Context) {
    const {
      chat: { id },
    } = ctx;
    const location = ctx.update['message']['location'];
    await this.usersService.registerUser(id, location);
    await ctx.reply(ReplyEnum.REQUEST_LOCATION);
  }
  @Hears(regEx)
  async onTime(ctx: Context) {
    const {
      chat: { id },
    } = ctx;

    const time = ctx.update['message']['text'];
    await this.usersService.addTime(id, time);
    await ctx.reply(ReplyEnum.REQUEST_TIME);
  }
}
