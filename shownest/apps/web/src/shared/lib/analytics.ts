export const analytics = {
  track: (event: string, properties?: Record<string, unknown>) => {
    console.log('Analytics:', event, properties)
  },
}
