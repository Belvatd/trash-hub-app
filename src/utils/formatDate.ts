type TConfig = {
  withTime?: boolean
}

export default function formatDate(date: Date, config?: TConfig) {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(config?.withTime && {
      hour: "numeric",
      minute: "numeric",
    }),
  }

  try {
    const formatter = new Intl.DateTimeFormat("id", options)

    if (formatter) {
      const text = formatter.format(date)

      if (config?.withTime) {
        return text.replace("pukul", "")
      }

      return text
    }
  } catch (error) {
    return ""
  }
}
