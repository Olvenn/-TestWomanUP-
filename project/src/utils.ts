import dayjs from 'dayjs';

export const getTimeDifference = (timeEnd: string) => dayjs(timeEnd).diff(dayjs((new Date())));

export const humanizeData = (date: string) => dayjs(date).format('DD MMM YYYY');

export const sortByDay = (todoA: string, todoB: string) => dayjs(todoA).valueOf() - dayjs(todoB).valueOf();
