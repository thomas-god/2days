import dayjs from 'dayjs';

export const toHumanDate = (date: Date): string => {
  return dayjs(date).format('ddd D MMM');
};

export const toDate = (date: Date): string => {
  return dayjs(date).format('YYYY-MM-DD');
};
