export function formatDateTime(datetime: string): string {
  const date = new Date(datetime)

  // Format the date into a human-readable format
  return date.toLocaleString('en-US', {
    weekday: 'long', // 'Monday'
    year: 'numeric', // '2024'
    month: 'long', // 'December'
    day: 'numeric', // '25'
    hour: '2-digit', // '10'
    minute: '2-digit', // '02'
    second: '2-digit', // '46'
    hour12: true, // 12-hour clock with AM/PM
  })
}
