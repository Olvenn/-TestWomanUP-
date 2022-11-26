import dayjs from 'dayjs';

export const getTimeDifference = (timeEnd: string) => dayjs(timeEnd).diff(dayjs((new Date())));

export const humanizeData = (date: string) => dayjs(date).format('DD MMM YYYY');
