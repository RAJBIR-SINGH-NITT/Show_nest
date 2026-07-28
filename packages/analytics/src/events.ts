export enum AnalyticsEvent {
  PAGE_VIEW = 'page_view',
  SEARCH = 'search',
  SEAT_SELECTED = 'seat_selected',
  BOOKING_INITIATED = 'booking_initiated',
  BOOKING_COMPLETED = 'booking_completed',
  PAYMENT_STARTED = 'payment_started',
  PAYMENT_COMPLETED = 'payment_completed',
}

export interface AnalyticsEventProperties {
  [key: string]: string | number | boolean | null | undefined
}
