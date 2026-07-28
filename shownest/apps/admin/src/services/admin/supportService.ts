import {
  bookingIssuesMock,
  complaintsMock,
  gateEventsMock,
  gateHistoryMock,
  paymentFailuresMock,
  refundsPendingMock,
  supportActivitiesMock,
  supportDashboardMetricsMock,
  supportNotesMock,
  supportRequestsMock,
} from '@/mock/supportModules'

export function getSupportDashboardMetrics() {
  return supportDashboardMetricsMock
}

export function getSupportRequests() {
  return supportRequestsMock
}

export function getBookingIssues() {
  return bookingIssuesMock
}

export function getPendingRefunds() {
  return refundsPendingMock
}

export function getPaymentFailures() {
  return paymentFailuresMock
}

export function getComplaints() {
  return complaintsMock
}

export function getSupportActivities() {
  return supportActivitiesMock
}

export function getSupportNotes() {
  return supportNotesMock
}

export function getGateEvents() {
  return gateEventsMock
}

export function getGateHistory() {
  return gateHistoryMock
}
