import dayjs from 'dayjs';

export const toHumanDate = (date: Date): string => {
  return dayjs(date).format('ddd D MMM');
};
