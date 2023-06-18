export const getStartMonthDate: (d?: Date) => string = (
  d: Date = new Date()
): string => {
  const year: number = d.getFullYear();
  const month: number = d.getMonth();
  const day: number = 1;

  return formatTodaysDate(new Date(year, month, day));
};

export const getEndMonthDate: (d?: Date) => string = (
  d: Date = new Date()
): string => {
  const year: number = d.getFullYear();
  const month: number = d.getMonth() + 1;
  const day: number = 0;

  return formatTodaysDate(new Date(year, month, day));
};

export const getTime: (d?: Date) => string = (d: Date = new Date()): string => {
  const h: string =
    d.getHours() < 10 ? `0${d.getHours()}` : d.getHours().toString();
  const m: string =
    d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes().toString();
  const s: string =
    d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds().toString();

  return `${h}:${m}:${s}`;
};

export const formatTodaysDate: (d?: Date) => string = (
  d: Date = new Date()
): string => {
  const year: number = d.getFullYear();
  const month: number = d.getMonth() + 1;
  const day: number = d.getDate();

  const formattedMonth: string = month < 10 ? `0${month}` : month.toString();
  const formattedDay: string = day < 10 ? `0${day}` : day.toString();

  return `${year}-${formattedMonth}-${formattedDay}`;
};

export const formatTodaysDateTime: (d?: Date) => string = (
  d: Date = new Date()
): string => formatTodaysDate(d) + " " + getTime(d);
