import { ASSURANCE_FETCHED, DATE_FETCHED, FAILED, INFO_FETCHED, ISSUE_ID_FETCHED, LOADING } from './constants';

const initialState = {
  isLoading: {
    d: true,
    i: true,
    s: false,
  },
  address: '',
  date: [],
  issue: '',
  issueId: '',
  message: '',
  product: '',
};

export default function reducer(state = initialState, action = {}) {
  const { type, address, isLoading, date, message, issue, issueId, product, key } = action;

  switch (type) {
    case ASSURANCE_FETCHED:
      return {
        ...state,
        address,
        date: setAssuranceDate(date),
        issue,
        isLoading: { ...state.isLoading, d: false },
      };
    case DATE_FETCHED:
      return {
        ...state,
        date: setDate(date),
        isLoading: { ...state.isLoading, d: false },
      };
    case FAILED:
      return {
        ...state,
        message,
        isLoading: { ...state.isLoading, [key.charAt(0)]: false },
      };
    case INFO_FETCHED:
      return {
        ...state,
        address,
        isLoading: { ...state.isLoading, i: false },
        product,
      };
    case ISSUE_ID_FETCHED:
      return {
        ...state,
        isLoading: { ...state.isLoading, s: false },
        issueId,
        message: '',
      };
    case LOADING:
      return {
        ...state,
        isLoading: { ...state.isLoading, [key.charAt(0)]: isLoading },
      };
    default:
      return state;
  }
}

export function setAssuranceDate(date) {
  const initial = { dates: [], data: [], };
  return date.reduce((acc, i) => {
    const { dates, data } = acc;
    const clean = i.date.split('-').reverse().join('-');
    const idx = dates.indexOf(clean);

    const newArrival = {
      name: i.slotId,
      availability: i.availability,
      slot: i.timeSlot.slot,
      time: i.timeSlot.time,
      data: i,
    };
    const names = ['early-morning', 'morning', 'noon', 'evening'];
    const idxName = names.indexOf(newArrival.name);

    if (idx === -1) {
      const arrival = ['', '', '', ''];
      arrival[idxName] = newArrival;
      dates.push(clean);
      data.push({ date: clean, arrival });
    } else {
      data[idx].arrival[idxName] = newArrival;
    }

    return { dates, data };
  }, initial).data;
}

export function setDate(date) {
  const count = val => (
    parseFloat(val.split(':')[0]) + (parseFloat(val.split(':')[1])/100)
  );

  const pushNewDate = (acc, newArrival, i) => {
    const { dates, data } = acc;
    const arrival = newArrival.name === 'Morning' ? [newArrival, ''] : ['' ,newArrival];
    const newData = { date: i.date, arrival, };
    dates.push(i.date);
    data.push(newData);
    return { dates, data };
  };

  const pushMorning = (arrival, newArrival) => {
    const isNew = arrival[0] ? count(newArrival.time) < count(arrival[0].time) : true;
    return isNew ? [newArrival, arrival[1]] : arrival;
  };

  const pushAfternoon = (arrival, newArrival) => {
    const isNew = arrival[1] ? count(newArrival.time) < count(arrival[1].time) : true;
    return isNew ? [arrival[0], newArrival] : arrival;
  };

  const initial = { dates: [], data: [], };
  return date.reduce((acc, i) => {
    const { dates, data } = acc;
    const idx = dates.indexOf(i.date);
    const newArrival = {
      name: i.data.partsOfDay,
      availability: i.data.availability,
      slot: i.data.timeSlot.slot,
      time: i.data.timeSlot.time,
      data: i.data,
    };

    if (idx === -1) {
      return pushNewDate(acc, newArrival, i);
    }

    const { arrival } = data[idx];
    const newData = { date: i.date };
    newData.arrival = newArrival.name === 'Morning' ? pushMorning(arrival, newArrival) : pushAfternoon(arrival, newArrival);
    data[idx] = newData;
    return { dates, data };
  }, initial).data;
}
