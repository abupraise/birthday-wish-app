export function generateUniqueId(): string {
    return 'wish_' + Math.random().toString(36).substr(2, 3)
  }