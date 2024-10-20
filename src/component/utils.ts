export function generateUniqueId(celebrantName: string): string {
  const namePart = celebrantName.toLowerCase().replace(/\s+/g, '').substr(0, 6);
  const randomPart = Math.random().toString(36).substr(2, 4);
  return `${namePart}-${randomPart}`;
}
