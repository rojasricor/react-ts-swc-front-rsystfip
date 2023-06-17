export const getStartMonthDate: Function = (d: Date = new Date()): string =>
  formatTodaysDate(new Date(d.getFullYear(), d.getMonth(), 1));

export const getEndMonthDate: Function = (d: Date = new Date()): string =>
  formatTodaysDate(new Date(d.getFullYear(), d.getMonth() + 1, 0));

export const formatTodaysDate = (d: Date = new Date()): string => {
  const month: number = d.getMonth() + 1;
  const day: number = d.getDate();

  const formattedMonth: string = month < 10 ? `0${month}` : month.toString();
  const formattedDay: string = day < 10 ? `0${day}` : day.toString();

  return `${d.getFullYear()}-${formattedMonth}-${formattedDay}`;
};

export const getTime: Function = (d: Date = new Date()): string => {
  const h: string =
    d.getHours() < 10 ? `0${d.getHours()}` : d.getHours().toString();
  const m: string =
    d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes().toString();
  const s: string =
    d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds().toString();
  return `${h}:${m}:${s}`;
};

export const formatTodaysDateTime: Function = (d: Date): string =>
  formatTodaysDate(d) + " " + getTime(d);
