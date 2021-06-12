export function getDaysInMonth(month: number, year: number) {
  var date = new Date(year, month, 1);
  var days: Date[] = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}
