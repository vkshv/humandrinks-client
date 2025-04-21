type ItemWithSortWeight = {
  sort_weight?: number | null
  [key: string]: any
}

type ItemWithDate = {
  date?: string | null
  [key: string]: any
}

declare global {
  interface Array<T extends ItemWithSortWeight & ItemWithDate> {
    sortWeight(): T[]
    sortDate(): T[]
  }
}

Array.prototype.sortWeight = function () {
  return [...this].sort((a, b) => {
    if (!Number.isNaN(+a.sort_weight) && !Number.isNaN(+b.sort_weight)) {
      return b.sort_weight - a.sort_weight
    }
    return 0
  })
}

Array.prototype.sortDate = function () {
  return [...this].sort((a, b) => {
    const aTime = a.date ? new Date(a.date).getTime() : Infinity
    const bTime = b.date ? new Date(b.date).getTime() : Infinity
    return aTime - bTime
  })
}
