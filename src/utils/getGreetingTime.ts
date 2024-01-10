const getGreetingTime = (currentTime = new Date()) => {
  const currentHour = currentTime.getHours()
  const splitAfternoon = 12
  const splitEvening = 17

  if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
    return "Selamat Siang"
  } else if (currentHour >= splitEvening) {
    return "Selamat Malam"
  }
  return "Selamat Pagi"
}

export default getGreetingTime
