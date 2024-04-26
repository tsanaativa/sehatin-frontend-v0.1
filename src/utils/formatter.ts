export function formatTime(timestamp: string) {
  const date = new Date(timestamp);
  return `${date.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' })}`;
}

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return `${date.toLocaleString('default', { day: 'numeric', month: 'short' })}`;
}
