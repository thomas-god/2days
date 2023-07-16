import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

export const createDateRange = (start: Date, end: Date): Date[] => {
  if (start.getTime() > end.getTime()) return [];
  const _start = dayjs(start).startOf('day');
  const _end = dayjs(end).startOf('day');

  const dates = [];
  let date = _start;
  while (date.isBefore(_end)) {
    dates.push(date.toDate());
    date = date.add(1, 'day');
  }
  dates.push(_end.toDate());
  return dates;
};

export const createMonthDates = (date: Date): Date[] => {
  const _date = dayjs(date);
  const start = _date.startOf('month').startOf('isoWeek');
  const end = _date.endOf('month');
  return createDateRange(start.toDate(), end.toDate());
};
