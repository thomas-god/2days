import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

export const isWithinMonth = (reference: Date, date: Date): boolean => {
  return dayjs(date).isSame(reference, 'month');
};

export const isToday = (reference: Date, date: Date): boolean => {
  return dayjs(date).isSame(reference, 'day');
};
