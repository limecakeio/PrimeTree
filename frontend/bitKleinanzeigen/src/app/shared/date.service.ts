import { Injectable } from '@angular/core';

/**DateService provides functions to format an unix time stamp into a better redeable formatted string. */
@Injectable()
export class DateService {

  constructor() {  }

  /**Converts an unix time stamp in a formatted time string. Format: date.month.year */
  public dateFromUnixTime(unixTime : number) : string {
    let date : Date = new Date(unixTime);
    return this.prefix(date.getDate()) + '.' + this.prefix(date.getMonth()) + '.' + this.prefix(date.getFullYear());
  }

  /**Prefixes a numeric integer value if the value is less than ten. */
  private prefix(value : number) : string {
    return (value < 10) ? '0' + value : '' + value;
  }

  /**Converts an unix time stamp in formatted time string. Format: hours:minutes:seconds */
  /**Seconds are omitted if they are zero. */
  public timeFromUnixTime(unixTime : number) : string {
    let date : Date = new Date(unixTime);
    let time : string;
    time = this.prefix(date.getHours()) + ':' + this.prefix(date.getMinutes());
    let seconds : number = date.getSeconds();
    if (seconds > 0) {
      time += ':' + this.prefix(seconds);
    }
    return time;
  }

  /**Converts an unix time stamp into a properly formatted time string. It may be separated with an optional separator.*/
  /**Format without an separator: day.month.year hours:minutes:seconds (seconds are ommitted if they are less than ten seconds).*/
  /**@param unixTime time in milliseconds*/
  /**@param separator an string defining the separator*/
  public fullDateFromUnixTime(unixTime : number, separator : string = ' ') : string {
    let date : string = this.dateFromUnixTime(unixTime);
    if (separator) {
      date += separator;
    }
    date += this.timeFromUnixTime(unixTime);
    return date;
  }

}
