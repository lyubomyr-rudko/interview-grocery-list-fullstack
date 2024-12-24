export const cleanObject = <T extends object>(obj: T): { [K in keyof T]: T[K] } => {
  return (
    Object.entries(obj)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_key, value]) => value !== null && value !== undefined && value !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as { [K in keyof T]: T[K] })
  )
}
