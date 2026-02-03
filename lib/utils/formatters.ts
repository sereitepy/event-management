export function formatEventDate(dateString: string): string {
  const date = new Date(dateString)
  return date
    .toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
    .toUpperCase()
}

export function formatPrice(cents: number, currency: string = 'USD'): string {
  const amount = cents / 100
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatEventDateDetails(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatEventTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString('km-KH', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}