export function generateUniqueId(celebrantName: string): string {
  const namePart = celebrantName.split(' ')[0].toLowerCase();
  return namePart;
}

