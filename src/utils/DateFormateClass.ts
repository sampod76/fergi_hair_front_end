import dayjs from 'dayjs';
import moment from 'moment';
export type IDateFormatType =
  | 'dd/mm/yyyy' // Example: 07/01/2025
  | 'mm/dd/yyyy' // Example: 01/07/2025
  | 'yyyy/mm/dd' // Example: 2025/01/07
  | 'dd-mm-yyyy' // Example: 07-01-2025
  | 'mm-dd-yyyy' // Example: 01-07-2025
  | 'yyyy-mm-dd' // Example: 2025-01-07
  | 'dddd, MMMM D, YYYY' // Full day and date (Example: Tuesday, January 7, 2025)
  | 'MMM D, YYYY' // Short month and date (Example: Jan 7, 2025)
  | 'D MMM YYYY' // Day before month (Example: 7 Jan 2025)
  | 'hh:mm A' // Time in 12-hour format (Example: 02:30 PM)
  | 'HH:mm' // Time in 24-hour format (Example: 14:30)
  | 'YYYY-MM-DDTHH:mm:ssZ' // ISO 8601 with time (Example: 2025-01-07T14:30:00Z)
  | 'unix'; // Unix timestamp (Example: 1736246400)

export class DateFormatterDayjs {
  public date: string | Date;

  constructor(date: string | Date) {
    this.date = date;
  }

  format(format: IDateFormatType): string {
    const parsedDate = dayjs(this.date);

    if (!parsedDate.isValid()) {
      throw new Error('Invalid date format');
    }

    switch (format) {
      case 'dd/mm/yyyy':
        return parsedDate.format('DD/MM/YYYY');
      case 'mm/dd/yyyy':
        return parsedDate.format('MM/DD/YYYY');
      case 'yyyy/mm/dd':
        return parsedDate.format('YYYY/MM/DD');
      case 'dd-mm-yyyy':
        return parsedDate.format('DD-MM-YYYY');
      case 'mm-dd-yyyy':
        return parsedDate.format('MM-DD-YYYY');
      case 'yyyy-mm-dd':
        return parsedDate.format('YYYY-MM-DD');
      case 'dddd, MMMM D, YYYY':
        return parsedDate.format('dddd, MMMM D, YYYY');
      case 'MMM D, YYYY':
        return parsedDate.format('MMM D, YYYY');
      case 'D MMM YYYY':
        return parsedDate.format('D MMM YYYY');
      case 'hh:mm A':
        return parsedDate.format('hh:mm A');
      case 'HH:mm':
        return parsedDate.format('HH:mm');
      case 'YYYY-MM-DDTHH:mm:ssZ':
        return parsedDate.format('YYYY-MM-DDTHH:mm:ssZ');
      case 'unix':
        return parsedDate.unix().toString();
      default:
        throw new Error('Unsupported date format');
    }
  }
}

export class DateFormatterMomentJs {
  public date: string | Date;

  constructor(date: string | Date) {
    this.date = date;
  }

  format(format: IDateFormatType): string {
    const parsedDate = moment(this.date);

    if (!parsedDate.isValid()) {
      throw new Error('Invalid date format');
    }

    switch (format) {
      case 'dd/mm/yyyy':
        return parsedDate.format('DD/MM/YYYY');
      case 'mm/dd/yyyy':
        return parsedDate.format('MM/DD/YYYY');
      case 'yyyy/mm/dd':
        return parsedDate.format('YYYY/MM/DD');
      case 'dd-mm-yyyy':
        return parsedDate.format('DD-MM-YYYY');
      case 'mm-dd-yyyy':
        return parsedDate.format('MM-DD-YYYY');
      case 'yyyy-mm-dd':
        return parsedDate.format('YYYY-MM-DD');
      case 'dddd, MMMM D, YYYY':
        return parsedDate.format('dddd, MMMM D, YYYY');
      case 'MMM D, YYYY':
        return parsedDate.format('MMM D, YYYY');
      case 'D MMM YYYY':
        return parsedDate.format('D MMM YYYY');
      case 'hh:mm A':
        return parsedDate.format('hh:mm A');
      case 'HH:mm':
        return parsedDate.format('HH:mm');
      case 'YYYY-MM-DDTHH:mm:ssZ':
        return parsedDate.toISOString(); // ISO 8601 format
      case 'unix':
        return parsedDate.unix().toString(); // Unix timestamp
      default:
        throw new Error('Unsupported date format');
    }
  }
}
