export const asyncTimeout = (timeout = 500) =>
  new Promise((r) => setTimeout(r, timeout))
