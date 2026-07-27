import {
  dashboardActivitiesMock,
  dashboardHealthMock,
  dashboardMetricsMock,
  dashboardNotificationsMock,
  dashboardQuickActionsMock,
  dashboardUpcomingEventsMock,
} from '@/mock/dashboard'

export function getDashboardMetrics() {
  return dashboardMetricsMock
}

export function getDashboardActivities() {
  return dashboardActivitiesMock
}

export function getDashboardNotifications() {
  return dashboardNotificationsMock
}

export function getUpcomingEvents() {
  return dashboardUpcomingEventsMock
}

export function getServiceHealth() {
  return dashboardHealthMock
}

export function getQuickActions() {
  return dashboardQuickActionsMock
}
