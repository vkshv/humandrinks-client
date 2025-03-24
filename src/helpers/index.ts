export const formatDate = function(dateString: string | undefined) {
  if (!dateString) return ''

  const months = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]
  const weekdays = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"]

  const date = new Date(dateString)
  const day = date.getDate()
  const month = months[date.getMonth()]
  const weekday = weekdays[date.getDay()]

  return `${day} ${month}, ${weekday}`
}
