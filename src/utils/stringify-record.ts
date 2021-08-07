export function stringifyRecord(record: object): Record<string, string> {
  const entries = Object.entries(record).map(([key, value]) => [key, `${value}`])
  return Object.fromEntries(entries)
}
