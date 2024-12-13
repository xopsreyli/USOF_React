export const set = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
   return null
  }
}

export const get = (key) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : undefined
  } catch (e) {
    return null
  }
}

export const remove = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    return null
  }
}
