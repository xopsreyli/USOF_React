const formatSingleDigit = (number) => {
  return number.toString().padStart(2, '0')
}

const formatDate = (strDate) => {
  const date = new Date(strDate)

  return formatSingleDigit(date.getDate()) +
    '.' +
    formatSingleDigit(date.getMonth() + 1) +
    '.' +
    date.getFullYear()
}

export default formatDate