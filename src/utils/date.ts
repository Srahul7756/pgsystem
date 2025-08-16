import moment from 'moment';

const dateFormat = 'DD MMM YYYY';
const dateTimeFormat = 'DD MMM YYYY hh:mm A';
const timeFormat = 'hh:mm A';

const getDate = (paramDate: any) => {
  return paramDate ? moment(paramDate).format(dateFormat) : '-';
};

const getDateTime = (paramDateTime: any) => {
  return paramDateTime ? moment(paramDateTime).format(dateTimeFormat) : '-';
};

const getTime = (paramTime: any) => {
  return paramTime ? moment(paramTime).format(timeFormat) : '-';
};

function getUpcomingDate(durationStr) {
  const match = durationStr.match(/(\d+)D:(\d+)H:(\d+)M/);
  if (!match)
    throw new Error("Invalid duration format. Use format like '126D:0H:2M'");

  const [, days, hours, minutes] = match.map(Number);

  return moment()
    .add(days, 'days')
    .add(hours, 'hours')
    .add(minutes, 'minutes')
    .toDate(); // returns native Date object
}

export {
  dateFormat,
  dateTimeFormat,
  timeFormat,
  getDate,
  getDateTime,
  getTime,
  getUpcomingDate,
};
