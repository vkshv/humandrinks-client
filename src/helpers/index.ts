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

export const formatPastDate = function(dateString: string | undefined) {
  if (!dateString) return ''

  const inputDate = new Date(dateString)
  const today = new Date()

  inputDate.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  const diffDays = Math.floor((+today - +inputDate) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return 'сегодня'
  } else if (diffDays >= 1 && diffDays <= 3) {
    return `${diffDays} ${pluralize(diffDays, 'день', 'дня', 'дней')} назад`
  } else {
    return formatLocalDate(inputDate)
  }
}

function pluralize(n: number, one: string, few: string, many: string) {
  if (n % 10 === 1 && n % 100 !== 11) return one
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return few
  return many
}

function formatLocalDate(date: Date) {
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
  return `${date.getDate()} ${months[date.getMonth()]}`
}

export const parseQueryString = function(queryString = '') {
  const params = new URLSearchParams(queryString)
  const result: Record<string, string> = {}
  for (const [key, value] of params.entries()) {
    result[key] = value
  }
  return result
}
