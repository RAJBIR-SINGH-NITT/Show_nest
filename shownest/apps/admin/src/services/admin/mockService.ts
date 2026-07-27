import { adminNavigation } from '@/constants/admin/navigation'
import { adminProfileMock, dashboardCardsMock, notificationMock } from '@/mock/admin'

export function getAdminNavigation() {
  return adminNavigation
}

export function getAdminProfile() {
  return adminProfileMock
}

export function getAdminDashboardCards() {
  return dashboardCardsMock
}

export function getAdminNotifications() {
  return notificationMock
}
