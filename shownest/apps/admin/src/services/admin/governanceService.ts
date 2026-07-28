import { auditLogsMock, featureFlagsMock, reportsMetricsMock, rolesGovernanceMock } from '@/mock/governanceModules'

export function getRoles() {
  return rolesGovernanceMock
}

export function getRoleById(id: string) {
  return rolesGovernanceMock.find((role) => role.id === id)
}

export function getAuditLogs() {
  return auditLogsMock
}

export function getReportsMetrics() {
  return reportsMetricsMock
}

export function getFeatureFlags() {
  return featureFlagsMock
}
