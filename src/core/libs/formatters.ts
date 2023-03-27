// 2021-09-23T12:00:00.000Z => Sep 21 2021
export const ddMMyyyyToLocaleDateFormatter = (value: string): string => {
  if (!value) {
    return '';
  }
  return new Date(value).toDateString().replace(/^\S+\s/, '');
};

export const dateToDDmmYYYYhhMMssFormatter2 = (dateParam: Date): string => {
  if (dateParam) {
    let year: string | number = dateParam.getFullYear().toString().slice(-2);
    let month: string | number = dateParam.getMonth() + 1;
    let date: string | number = dateParam.getDate();
    let hours: string | number = dateParam.getHours();
    let minutes: string | number = dateParam.getMinutes();
    if (month < 10) {
      month = '0' + month;
    }

    if (date < 10) {
      date = '0' + date;
    }

    if (hours < 10) {
      hours = '0' + hours;
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    return `${month}/${date}/${year}  ${hours}:${minutes}`;
  }

  return '';
};

// 2021-09-23T12:00:00.000Z => 23/09/2021
export const dateToDDmmYYYYFormatter = (dateParam: Date): string => {
  const fullYear: string | number = dateParam.getFullYear();
  let month: string | number = dateParam.getMonth() + 1;
  let date: string | number = dateParam.getDate();

  if (month < 10) {
    month = '0' + month;
  }

  if (date < 10) {
    date = '0' + date;
  }

  return `${date}/${month}/${fullYear}`;
};

// 2021-09-23T12:00:00.000Z => 2021-09-23
export const dateToYYYYmmDDFormatter = (dateParam: Date): string => {
  const fullYear: string | number = dateParam.getFullYear();
  let month: string | number = dateParam.getMonth() + 1;
  let date: string | number = dateParam.getDate();

  if (month < 10) {
    month = '0' + month;
  }

  if (date < 10) {
    date = '0' + date;
  }

  return `${fullYear}-${month}-${date}`;
};