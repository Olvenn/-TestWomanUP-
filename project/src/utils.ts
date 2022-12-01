import dayjs from 'dayjs';

/**
 * The difference between the end date and the current date in milliseconds.
 * @param { timeEnd } string  Time as a string, for example,  2022-11-30T00:00:00+03:00.
 * @returns { number } Negative, positive number or 0
 */
export const getTimeDifference = (timeEnd: string) => dayjs(timeEnd).diff(dayjs((new Date())));

/**
 * A function that formats a date into a string of the form 'date, month name (abbreviated), year'
 * @param { date } string 
 * @returns { string } A string like '23 Nov 2022'
 */
export const humanizeData = (date: string) => dayjs(date).format('DD MMM YYYY');

/**
 * Auxiliary function for sorting by date
 * @param { string } todoA - The first date for comparison
 * @param { string } todoB  -The second date for comparison
 * @returns { number } - >0, < 0 on 0
 */
export const sortByDay = (todoA: string, todoB: string) => dayjs(todoA).valueOf() - dayjs(todoB).valueOf();
