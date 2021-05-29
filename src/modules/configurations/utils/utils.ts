interface ISombriteDate {
  open: Date;
  close: Date;
}

interface ISombriteString{
  open: string;
  close: string;
}

export function automaticConfigSombrite(open: string, close: string): ISombriteDate {
  const dateOpenSombrite: string[] = open.split(':')
  const openDate = new Date()
  const dateCloseSombrite: string[] = close.split(':')
  const closeDate = new Date()

  openDate.setHours(Number(dateOpenSombrite && dateOpenSombrite[0]))
  openDate.setMinutes(Number(dateOpenSombrite && dateOpenSombrite[1]))
  closeDate.setHours(Number(dateCloseSombrite && dateCloseSombrite[0]))
  closeDate.setMinutes(Number(dateCloseSombrite && dateCloseSombrite[1]))

  return {open: openDate, close: closeDate}
}

export function extractDateSombrite(open: Date, close: Date): ISombriteString {
  const openString = `${open.getHours()}:${open.getMinutes()}`
  const closeString = `${close.getHours()}:${close.getMinutes()}`

  return {open: openString, close: closeString}
}
