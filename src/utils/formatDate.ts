export default function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  }
  const formatter = new Intl.DateTimeFormat("id", options)
  return formatter.format(date)
}
