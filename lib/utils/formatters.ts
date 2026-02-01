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
