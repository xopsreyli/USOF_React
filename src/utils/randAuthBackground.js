const randAuthBackground = () => {
  const num = Math.floor(Math.random() * 3) + 1

  return `/images/backgrounds/auth/${num}.jpg`
}

export default randAuthBackground
