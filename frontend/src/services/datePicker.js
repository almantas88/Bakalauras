import * as moment from 'moment'

export function getDatePicker() {
  return window.localStorage.getItem("date");
}
export function setDatePicker(date) {
  return window.localStorage.setItem("date", date);
}
