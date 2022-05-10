import { Injectable } from '@nestjs/common';
import { find as findTimezone } from 'geo-tz';
import * as moment from 'moment-timezone';

@Injectable()
export class TimeZoneService {
  convertTime(time: string, lon: number, lat: number): string {
    const [locTimeZone] = findTimezone(lon, lat);

    return moment.tz(time, 'HH:mm', locTimeZone).utc().format('HH:mm');
  }

  formatTimeInUtc(time: Date) {
    return moment(time, 'HH:mm').utc().format('HH:mm');
  }
}
